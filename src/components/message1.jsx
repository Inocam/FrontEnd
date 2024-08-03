import ReactDOM from "react-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRef } from "react";
import MessageUserIcon from "../assets/icons/messageuser.svg?react";
import MessagePlusIcon from "../assets/icons/messageplus.svg?react";
import MessageSendIcon from "../assets/icons/messagesend.svg?react";
import * as S from "../styles/index.style";
import {
  massagecloseHandler,
  massageopenHandler,
} from "../store/module/Dashboard";
import { useGetMessage } from "../api/message/useMessage";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const inputMessage = useRef("");
  const dispatch = useDispatch();
  const isMessageOpen = useSelector((state) => state.nav.ismassageOpen);
  const { data: messageData, isLoading } = useGetMessage();
  console.log(messageData);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, inputMessage]);
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
      <button onClick={() => dispatch(massageopenHandler())}>Message</button>
      {isMessageOpen &&
        ReactDOM.createPortal(
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
                    <MessagePlusIcon />
                  </S.message.Flexdiv>
                  <div>
                    {messageData.length != 0 ? (
                      messageData.map(() => {
                        <S.message.ConversationBox>
                          <h5>Name</h5> <br />
                          supporting line text..
                        </S.message.ConversationBox>;
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
                    {messages.map((msg, index) => (
                      <S.message.MessageBubble key={index}>
                        {msg}
                      </S.message.MessageBubble>
                    ))}
                  </S.message.TalkingRoom>

                  <S.message.TalkingBar>
                    {/* <S.message.TalkingBarLeft>
                      <MessageEmoIcon />
                    </S.message.TalkingBarLeft> */}

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
          </S.message.MessageOverlay>,
          document.body
        )}
    </>
  );
};

export default Message;
