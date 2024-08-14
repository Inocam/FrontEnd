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
  const [isUserAddModalOpen, setIsUserAddModalOpen] = useState(false);
  const inputMessage = useRef("");
  const talkingRoomRef = useRef("");
  const dispatch = useDispatch();
  const isTeam = useSelector((state) => state.team.MessageId);
  const { data: teamData, isLoading } = useGetTeam();
  const { data: messageData, isLoading: isMessageLoading } = useGetMessage();
  const { mutate } = useCreateChatRoom();
  const stompClient = useRef(null);
  const currentSubscription = useRef(null);
  const Actoken = Cookies.get("AccessToken");

  useEffect(() => {
    // 대화방이 렌더링되거나 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
    if (talkingRoomRef.current) {
      talkingRoomRef.current.scrollTop = talkingRoomRef.current.scrollHeight;
    }
  }, [messages, messageData]);
  useEffect(() => {
    // STOMP 클라이언트 설정
    if (!stompClient.current) {
      stompClient.current = new Client({
        brokerURL: "wss://footapi.o-r.kr/foot/chat", // 여기서 wss:// 스킴을 사용합니다.
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
    }
    stompClient.current.onConnect = () => {
      console.log("Connected to WebSocket");

      // 현재 대화방 구독
      currentSubscription.current = stompClient.current.subscribe(
        `/topic/room/${isTeam}`,
        (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log(receivedMessage);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
      );
    };

    stompClient.current.onStompError = (frame) => {
      console.error("STOMP error: ", frame.headers.message);
    };
    stompClient.current.activate();

    return () => {
      if (currentSubscription.current) {
        currentSubscription.current.unsubscribe();
      }
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, [Actoken, isTeam]);

  useEffect(() => {
    queryClient.invalidateQueries(["getMessage"]);
  }, [queryClient, isTeam]);

  const handleSendMessage = () => {
    const newMessage = inputMessage.current.value;
    if (inputMessage.current.value.trim() !== "") {
      const message = {
        message: newMessage,
        userId: 2, // 여기에 실제 사용자 이름이나 ID를 넣으세요
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
      <S.message.MessageOutline onClick={(e) => e.stopPropagation()}>
        <S.message.MessageContent>
          <S.message.ConversationList>
            <S.message.Flexdiv>
              <S.message.ConversationHeader>
                conversations
              </S.message.ConversationHeader>
              <MessagePlusIcon onClick={() => openUserAddModal()} />
            </S.message.Flexdiv>
            <div>
              {teamData.length != 0 ? (
                teamData.content?.map((state) => {
                  return (
                    <S.message.ConversationBox
                      onClick={() => {
                        setMessages([]);
                        dispatch(setMessageId({ TeamId: state.roomId }));
                      }}
                      key={state.roomId}
                    >
                      <h5>{state.roomName}</h5> <br />
                      {state.createdDate.split("T")[0]}
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
              <S.message.HeaderLeft>
                <MessageUserIcon />
                <a>Name</a>
              </S.message.HeaderLeft>
              <S.message.HeaderRight>
                {/* <MessageBellIcon />
                      <MessageSettingIcon /> */}
              </S.message.HeaderRight>
            </S.message.TalkingBoxHeader>

            <S.message.TalkingRoom ref={talkingRoomRef}>
              {!isMessageLoading &&
                messageData.content &&
                messageData.content?.map((msg) => (
                  <S.message.MessageBubble key={msg.sendDate}>
                    {msg.message}
                  </S.message.MessageBubble>
                ))}
              {messages?.map((msg) => (
                <S.message.MessageBubble key={Date.now()}>
                  {msg.message}
                </S.message.MessageBubble>
              ))}
            </S.message.TalkingRoom>

            <S.message.TalkingBar>
              <S.message.TalkingBarRight>
                <S.message.MessageInput
                  type="text"
                  ref={inputMessage}
                  onKeyPress={handleKeyPress}
                />
                <S.message.MessageSendButton onClick={handleSendMessage}>
                  <MessageSendIcon />
                </S.message.MessageSendButton>
                {isUserAddModalOpen && (
                  <SelectUser
                    closeUserAddModal={closeUserAddModal}
                    submitHandler={submitHandler}
                  />
                )}
              </S.message.TalkingBarRight>
            </S.message.TalkingBar>
          </S.message.TalkingBox>
        </S.message.MessageContent>
      </S.message.MessageOutline>
    </>
  );
};

export default MessageBox;
