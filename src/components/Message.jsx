import ReactDOM from "react-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

import * as S from "../styles/index.style";
import * as L from "../assets/icons/index.Logo";



const Message = () => {
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const {  reset } = useForm();

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");

    const openMessageModal = () => setIsMessageModalOpen(true);
    const closeMessageModal = () => {
    setIsMessageModalOpen(false);
    reset();
    };



    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() !== "") {
            setMessages([...messages, inputMessage]);
            setInputMessage("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };


    return (
    <>
        <button onClick={openMessageModal}>Message</button>

        {isMessageModalOpen &&
        ReactDOM.createPortal(
            <S.message.MessageOverlay onClick={closeMessageModal}>
            <S.message.MessageOutline onClick={(e) => e.stopPropagation()}>
                <S.message.MessageContent> 

                    <S.message.ConversationList> 

                    <S.message.ConversationHeader>conversations</S.message.ConversationHeader>
                    <S.message.ConversationBox>
                        <h5>Name</h5> <br/>supporting line text.. 
                    </S.message.ConversationBox>
                    <S.message.ConversationBox>
                        <h5>Name</h5> <br/>supporting line text.. 
                    </S.message.ConversationBox>
                    <S.message.ConversationBox>
                        <h5>Name</h5> <br/>supporting line text.. 
                    </S.message.ConversationBox>
                    <S.message.ConversationBox>
                        <h5>Name</h5> <br/>supporting line text.. 
                    </S.message.ConversationBox>
                    <S.message.ConversationBox>
                        <h5>Name</h5> <br/>supporting line text.. 
                    </S.message.ConversationBox>
                    <S.message.ConversationBox>
                        <h5>Name</h5> <br/>supporting line text.. 
                    </S.message.ConversationBox>
                    </S.message.ConversationList>

                <S.message.TalkingBox>                   
                    <S.message.TalkingBoxHeader> 
                        <S.message.HeaderLeft>
                        <L.MessageUserIcon/>
                        <a>Name</a>
                        </S.message.HeaderLeft>
                        <S.message.HeaderRight>
                        <L.MessageBellIcon/>
                        <L.MessageSettingIcon/>
                        </S.message.HeaderRight>
                    </S.message.TalkingBoxHeader>

                    <S.message.TalkingRoom>
                    {messages.map((msg, index) => (
                                            <S.message.MessageBubble key={index}>{msg}</S.message.MessageBubble>
                                        ))}

                    </S.message.TalkingRoom>

                    <S.message.TalkingBar>                       
                    <S.message.TalkingBarLeft>
                        <L.MessagePlusIcon/>
                        <L.MessageEmoIcon/>
                    </S.message.TalkingBarLeft>

                    <S.message.TalkingBarRight>
                    <S.message.MessageInput 
                    type="text"
                    value={inputMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}/>
                    <S.message.MessageSendButton onClick={handleSendMessage}>
                    <L.MessageSendIcon/>
                    </S.message.MessageSendButton>
                    </S.message.TalkingBarRight>            
                    </S.message.TalkingBar>
                    
                </S.message.TalkingBox>

                </S.message.MessageContent>
            </S.message.MessageOutline>
            </S.message.MessageOverlay>
            ,document.body
        )}
    </>
    );
};

export default Message;
