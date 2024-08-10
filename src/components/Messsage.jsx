import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRef } from "react";
import MessageUserIcon from "../assets/icons/messageuser.svg?react";
import MessagePlusIcon from "../assets/icons/messageplus.svg?react";
import MessageSendIcon from "../assets/icons/messagesend.svg?react";
import * as S from "../styles/index.style.js";
import {
  massagecloseHandler,
  massageopenHandler,
} from "../store/module/Dashboard.js";
import { useGetMessage, useGetTeam } from "../api/message/useMessage.js";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components";
import { setMessageId } from "../store/module/Message.js";
const SMessageButton = styled.button`
  position: sticky;
  bottom: 10px;
  right: 10px;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  border: none;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1000000;
`;
const Message = () => {
  const Queryclient = useQueryClient();
  const [messages, setMessages] = useState([]);
  const inputMessage = useRef("");
  const dispatch = useDispatch();
  const isMessageOpen = useSelector((state) => state.nav.ismassageOpen);
  const isTeam = useSelector((state) => state.user.TeamId);
  const { data: teamData, isLoading } = useGetTeam();
  // const { data: messageData, isMessageLoading } = useGetMessage();

  useEffect(() => {
    Queryclient.invalidateQueries(["getMessage"]);
  }, [Queryclient, isTeam]);

  const handleSendMessage = () => {
    if (inputMessage.current.value.trim() !== "") {
      setMessages((state) => [...state, inputMessage]);
      inputMessage.current.value = "";
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <>
      <SMessageButton
        onClick={() => {
          Queryclient.invalidateQueries(["getMuser"]);
          dispatch(massageopenHandler());
        }}
      >
        Message
      </SMessageButton>
      {isMessageOpen && (
        <S.message.MessageOverlay
          onClick={() => dispatch(massagecloseHandler())}
        >
          <S.message.MessageOutline onClick={(e) => e.stopPropagation()}>
            <S.message.MessageContent>
              <S.message.ConversationList>
                <S.message.Flexdiv>
                  <S.message.ConversationHeader>
                    conversations
                  </S.message.ConversationHeader>
                  <MessagePlusIcon onClick={() => console.log("클릭")} />
                </S.message.Flexdiv>
                <div>
                  {teamData.length != 0 ? (
                    teamData.map((state) => {
                      return (
                        <S.message.ConversationBox
                          onClick={() => {
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

                <S.message.TalkingRoom>
                  {/* {!isMessageLoading &&
                    messageData?.map((msg) => (
                      <S.message.MessageBubble key={msg.sendDate}>
                        {msg.message}
                      </S.message.MessageBubble>
                    ))} */}
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
                  </S.message.TalkingBarRight>
                </S.message.TalkingBar>
              </S.message.TalkingBox>
            </S.message.MessageContent>
          </S.message.MessageOutline>
        </S.message.MessageOverlay>
      )}
    </>
  );
};

export default Message;

//무한스크롤링
//s3 이미지처리
