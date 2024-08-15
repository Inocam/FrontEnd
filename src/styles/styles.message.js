import styled from "styled-components";

export const MessageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MessageOutline = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 1000px;
  height: 80vh;
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
  font-size: 1.2rem;
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
    font-size: 1rem;
    color: #495057;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
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
    font-size: 1.2rem;
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
  font-size: 0.9rem;
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
