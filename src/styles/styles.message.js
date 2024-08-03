import styled from "styled-components";

export const MessageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(0.2rem);
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const MessageOutline = styled.div`
  position: relative;
  background-color: #f1f1f1;
  margin-right: 50px;
  margin-top: 50px;
  padding: 200px 500px 400px 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 30px;
`;

export const MessageContent = styled.div`
  position: absolute;
  background-color: #c7dde7;
  border-radius: 20px;
  margin: 10px 20px 20px 10px;
  padding: 190px 490px 390px 390px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  top: 0;
  left: 0;

  width: 600px;
  height: 400px;
  overflow: hidden;
`;

export const ConversationList = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  margin: -140px 0px 0px -380px;
  padding: 10px;
`;

export const ConversationHeader = styled.h3`
  display: flex;
  padding: 10px;
`;

export const Flexdiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ConversationBox = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const TalkingBox = styled.div`
  display: flex;
  position: absolute;
  top: 90px;
  left: 340px;
  background-color: white;
  margin: 0px 0px 0px -20px;
  padding: 310px 200px 180px 350px;
  justify-content: flex-start;
  border-radius: 5px 5px 0px 0px;

  width: 500px;
  height: 400px;
  overflow: hidden;
`;

export const TalkingBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -320px;
  margin-left: -330px;
  margin-bottom: 250px;
  gap: 310px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  display: absolute;
  align-items: center;
  gap: 15px;
  svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  a {
    font-size: 25px;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  display: absolute;
  align-items: center;
  gap: 20px;
  svg {
    width: 29px;
    height: 29px;
    cursor: pointer;
  }
`;

export const TalkingRoom = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 300px;
  padding: 10px;
  margin-top: -240px;
  margin-left: -380px;
  margin-right: 50px;
  width: 450px;
`;

export const MessageBubble = styled.div`
  background-color: #e6e6e6;
  border-radius: 10px;
  padding: 8px 12px;
  margin-bottom: 8px;
  max-width: 70%;
  align-self: flex-end;
  word-wrap: break-word;
`;

export const TalkingBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 140px;
  margin-left: -470px;
  margin-bottom: 20px;
  margin-right: -150px;
  gap: 30px;
`;

export const TalkingBarLeft = styled.div`
  display: flex;
  display: absolute;
  align-items: center;
  gap: 15px;
  svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
`;

export const TalkingBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const MessageInput = styled.input`
  flex: 1;
  height: 36px;
  padding: 0 70px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 18px;
  font-size: 14px;
  outline: none;
`;

export const MessageSendButton = styled.div`
  cursor: pointer;
  svg {
    width: 25px;
    height: 25px;
  }
`;
