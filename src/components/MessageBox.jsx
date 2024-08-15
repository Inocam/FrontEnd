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
  const [messages, setMessages] = useState([]);
  const [userNAme, setuserNAme] = useState([]);
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
  const Actoken = Cookies.get("AccessToken");
  const subscriptions = useRef({});
  useEffect(() => {
    if (talkingRoomRef.current) {
      talkingRoomRef.current.scrollTop = talkingRoomRef.current.scrollHeight;
    }
  }, [messages, messageData]);
  useEffect(() => {
    if (!stompClient.current) {
      stompClient.current = new Client({
        brokerURL: "wss://footapi.o-r.kr/foot/chat",
        connectHeaders: {
          Authorization: `Bearer ${Actoken}`,
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      stompClient.current.onConnect = () => {
        console.log("Connected to WebSocket");

        // 현재 대화방 구독
        subscriptions.current.room = stompClient.current.subscribe(
          `/topic/room/${userId}`,
          (message) => {
            const receivedMessage = JSON.parse(message.body);
            console.log("Room message:", receivedMessage);
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
            console.log("Team message:", receivedMessage);
            console.log(messageData);
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
          console.log("Team message:", receivedMessage);
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
    console.log(selectedUser);
    mutate({ userId: selectedUser.id });
    closeUserAddModal();
  };
  return (
    <>
      <MessageOutline onClick={(e) => e.stopPropagation()}>
        <MessageContent>
          <ConversationList>
            <Flexdiv>
              <ConversationHeader>Conversations</ConversationHeader>
              <MessagePlusIcon onClick={() => openUserAddModal()} />
            </Flexdiv>
            <div style={{ overflowY: "auto" }}>
              {teamData.length != 0 ? (
                teamData.content?.map((state) => {
                  return (
                    <S.message.ConversationBox
                      onClick={() => {
                        setuserNAme(state.targetUserName);
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
          </ConversationList>
          <TalkingBox>
            <TalkingBoxHeader>
              <MessageUserIcon />
              <a>{""}</a>
            </TalkingBoxHeader>
            <TalkingRoom>
              {!isMessageLoading &&
                messageData.content &&
                messageData.content?.map((msg) => (
                  <MessageBubble
                    $myChat={msg.userId == userId}
                    key={msg.sendDate}
                  >
                    {msg.message}
                  </MessageBubble>
                ))}
            </TalkingRoom>
            <TalkingBar>
              <MessageInput
                type="text"
                ref={inputMessage}
                onKeyPress={handleKeyPress}
              />
              <MessageSendButton onClick={handleSendMessage}>
                <MessageSendIcon />
              </MessageSendButton>
            </TalkingBar>
          </TalkingBox>
        </MessageContent>
      </MessageOutline>
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
import styled from "styled-components";

export const MessageOutline = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 70%;
  max-width: 1000px;
  height: 60vh;
  display: flex;
  overflow: hidden;
`;

export const MessageContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const ConversationList = styled.div`
  width: 30%;
  background-color: #f8f9fa;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
`;

export const ConversationHeader = styled.h3`
  padding: 20px;
  margin: 0;
  font-size: 20px;
  color: #495057;
  border-bottom: 1px solid #e9ecef;
`;

export const Flexdiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  svg {
    width: 24px;
    height: 24px;
    cursor: pointer;
    color: #6c757d;
    transition: color 0.2s ease;

    &:hover {
      color: #495057;
    }
  }
`;

export const ConversationBox = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #e9ecef;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e9ecef;
  }

  h5 {
    margin: 0 0 5px 0;
    font-size: 16px;
    color: #495057;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #6c757d;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const TalkingBox = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

export const TalkingBoxHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;

  svg {
    width: 30px;
    height: 30px;
    margin-right: 15px;
    color: #6c757d;
  }

  a {
    font-size: 20px;
    color: #495057;
    font-weight: 500;
  }
`;

export const TalkingRoom = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const MessageBubble = styled.div`
  background-color: ${(props) => (props.$myChat ? "#e9ecef" : "#0278ae")};
  align-self: ${(props) => (props.$myChat ? "flex-end" : "flex-start")};
  color: ${(props) => (props.$myChat ? "#495057" : "#e9ecef")};
  border-radius: 18px;
  padding: 10px 15px;
  margin-bottom: 10px;
  max-width: 70%;
  word-wrap: break-word;
  font-size: 14px;
`;

export const TalkingBar = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-top: 1px solid #e9ecef;
`;

export const MessageInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 15px;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #6c757d;
  }
`;

export const MessageSendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  padding: 0;

  svg {
    width: 24px;
    height: 24px;
    color: #6c757d;
    transition: color 0.2s ease;

    &:hover {
      color: #495057;
    }
  }
`;
{
  /* <MessageOverlay>
  <MessageOutline>
    <MessageContent>
      <ConversationList>
        <ConversationHeader>Conversations</ConversationHeader>
        <Flexdiv>
          <MessagePlusIcon onClick={() => openUserAddModal()} />
        </Flexdiv>
        <div style={{ overflowY: "auto" }}>
          {teamData.length != 0 ? (
            teamData.content?.map((state) => {
              return (
                <S.message.ConversationBox
                  onClick={() => {
                    setuserNAme(state.targetUserName);
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
      </ConversationList>
      <TalkingBox>
        <TalkingBoxHeader>
          <MessageUserIcon />
          <a>{userName}</a>
        </TalkingBoxHeader>
        <TalkingRoom>
          {" "}
          {!isMessageLoading &&
            messageData.content &&
            messageData.content?.map((msg) => (
              <S.message.MessageBubble key={msg.sendDate}>
                {msg.message}
              </S.message.MessageBubble>
            ))}
        </TalkingRoom>
        <TalkingBar>
          <MessageInput
            type="text"
            ref={inputMessage}
            onKeyPress={handleKeyPress}
          />
          <MessageSendButton onClick={handleSendMessage}>
            <MessageSendIcon />
          </MessageSendButton>
        </TalkingBar>
      </TalkingBox>
    </MessageContent>
  </MessageOutline>
  {isUserAddModalOpen && (
    <SelectUser
      closeUserAddModal={closeUserAddModal}
      submitHandler={submitHandler}
    />
  )}
</MessageOverlay>; */
}
