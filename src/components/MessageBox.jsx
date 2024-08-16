import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Cookies from "js-cookie";
// 내부 import
import MessageUserIcon from "../assets/icons/messageuser.svg?react";
import MessagePlusIcon from "../assets/icons/messageplus.svg?react";
import MessageSendIcon from "../assets/icons/messagesend.svg?react";
import * as S from "../styles/index.style.js";
import { useGetMessage, useGetTeam } from "../api/message/useMessage.js";
import { setMessageId } from "../store/module/Message.js";
import SelectUser from "./SelectUser.jsx";
import { useCreateChatRoom } from "../api/message/useRoom.js";

const MessageBox = () => {
  const queryClient = useQueryClient();
  const [isUserAddModalOpen, setIsUserAddModalOpen] = useState(false);
  const inputMessage = useRef("");
  const talkingRoomRef = useRef("");
  const dispatch = useDispatch();
  const isTeam = useSelector((state) => state.team.MessageId);
  const userId = useSelector((state) => state.user.Id);
  const { data: teamData, isLoading } = useGetTeam();
  const { data: messageData, isLoading: isMessageLoading } = useGetMessage();
  const { mutate } = useCreateChatRoom();
  const stompClient = useRef(null);
  const subscriptions = useRef({});
  const Actoken = Cookies.get("AccessToken");
  useEffect(() => {
    if (talkingRoomRef.current) {
      talkingRoomRef.current.scrollTop = talkingRoomRef.current.scrollHeight;
    }
  }, [messageData]);
  useEffect(() => {
    if (!stompClient.current) {
      stompClient.current = new Client({
        brokerURL: "wss://footapi.o-r.kr/foot/chat",
        connectHeaders: {
          Authorization: `Bearer ${Actoken}`,
        },
        debug: function (str) {
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      stompClient.current.onConnect = () => {
        // 현재 대화방 구독
        subscriptions.current.room = stompClient.current.subscribe(
          `/topic/room/${userId}`,
          (message) => {
            const receivedMessage = JSON.parse(message.body);
            queryClient.setQueryData(["getMmuser"], (oldData) => {
              if (!oldData) return oldData;
              if (receivedMessage.type === "create") {
                return {
                  ...oldData,
                  content: [
                    ...oldData.content,
                    { ...receivedMessage, lastMessage: {} },
                  ],
                };
              }
              if (receivedMessage.type === "newChat") {
                const updatedContent = oldData.content.map((room) =>
                  room.roomId === receivedMessage.roomId
                    ? { ...room, lastMessage: receivedMessage }
                    : room
                );
                updatedContent.sort((a, b) => {
                  const dateA = a.lastMessage?.sendDate || a.sendDate || "";
                  const dateB = b.lastMessage?.sendDate || b.sendDate || "";
                  return new Date(dateB) - new Date(dateA);
                });
                return {
                  ...oldData,
                  content: updatedContent,
                };
              }
              return oldData;
            });
          }
        );

        subscriptions.current.team = stompClient.current.subscribe(
          `/topic/chat/${isTeam}`,
          (message) => {
            const receivedMessage = JSON.parse(message.body);
            queryClient.setQueryData(["getMessage", isTeam], (oldData) => {
              return {
                ...oldData,
                content: [...oldData.content, receivedMessage],
              };
            });
          }
        );
      };

      stompClient.current.onStompError = (frame) => {
        console.error("STOMP error: ", frame.headers.message);
      };

      stompClient.current.activate();
    }

    return () => {
      Object.values(subscriptions.current).forEach((subscription) => {
        if (subscription) {
          subscription.unsubscribe();
        }
      });
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, [Actoken, userId]);

  useEffect(() => {
    if (stompClient.current && stompClient.current.connected) {
      if (subscriptions.current.team) {
        subscriptions.current.team.unsubscribe();
      }
      subscriptions.current.team = stompClient.current.subscribe(
        `/topic/chat/${isTeam}`,
        (message) => {
          const receivedMessage = JSON.parse(message.body);
          queryClient.setQueryData(["getMessage", isTeam], (oldData) => {
            return {
              ...oldData,
              content: [...(oldData?.content || []), receivedMessage],
            };
          });
        }
      );
    }
  }, [isTeam, queryClient]);
  useEffect(() => {
    queryClient.invalidateQueries(["getMessage"]);
  }, [queryClient, isTeam]);

  const handleSendMessage = () => {
    const newMessage = inputMessage.current.value;
    if (inputMessage.current.value.trim() !== "") {
      const message = {
        message: newMessage,
        userId: userId, // 여기에 실제 사용자 이름이나 ID를 넣으세요
        roomId: isTeam,
      };
      // 메시지를 STOMP 서버로 전송
      stompClient.current.publish({
        destination: `/foot/chat/rooms/sendMessage`,
        body: JSON.stringify(message),
      });

      inputMessage.current.value = "";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  const openUserAddModal = () => {
    setIsUserAddModalOpen(true);
  };
  const closeUserAddModal = () => setIsUserAddModalOpen(false);

  if (isLoading) {
    return <p>loading</p>;
  }
  const submitHandler = (e, selectedUser) => {
    e.preventDefault();
    mutate({ userId: selectedUser.id });
    closeUserAddModal();
  };
  return (
    <>
      <S.message.MessageOutline onClick={(e) => e.stopPropagation()}>
        <S.message.MessageContent>
          <S.message.ConversationList>
            <S.message.Flexdiv>
              <S.message.ConversationHeader>
                Conversations
              </S.message.ConversationHeader>
              <MessagePlusIcon onClick={() => openUserAddModal()} />
            </S.message.Flexdiv>
            <div style={{ overflowY: "auto" }}>
              {teamData.length != 0 ? (
                teamData.content?.map((state) => {
                  return (
                    <S.message.ConversationBox
                      onClick={() => {
                        dispatch(setMessageId({ TeamId: state.roomId }));
                      }}
                      key={state.roomId}
                    >
                      <h5>{state.targetUserName}</h5> <br />
                      {state["lastMessage"]["message"] || "대화가 아직없습니다"}
                    </S.message.ConversationBox>
                  );
                })
              ) : (
                <S.message.ConversationBox>
                  <p>방이 없습니다 생성해주세요 !</p>
                </S.message.ConversationBox>
              )}
            </div>
          </S.message.ConversationList>
          <S.message.TalkingBox>
            <S.message.TalkingBoxHeader>
              <MessageUserIcon />
              <a>{""}</a>
            </S.message.TalkingBoxHeader>
            <S.message.TalkingRoom>
              {!isMessageLoading &&
                messageData.content &&
                messageData.content?.map((msg) => (
                  <S.message.MessageBubble
                    $myChat={msg.userId == userId}
                    key={msg.sendDate}
                  >
                    {msg.message}
                  </S.message.MessageBubble>
                ))}
            </S.message.TalkingRoom>
            <S.message.TalkingBar>
              <S.message.MessageInput
                type="text"
                ref={inputMessage}
                onKeyPress={handleKeyPress}
              />
              <S.message.MessageSendButton onClick={handleSendMessage}>
                <MessageSendIcon />
              </S.message.MessageSendButton>
            </S.message.TalkingBar>
          </S.message.TalkingBox>
        </S.message.MessageContent>
      </S.message.MessageOutline>
      {isUserAddModalOpen && (
        <SelectUser
          closeUserAddModal={closeUserAddModal}
          submitHandler={submitHandler}
        />
      )}
      ;
    </>
  );
};

export default MessageBox;
