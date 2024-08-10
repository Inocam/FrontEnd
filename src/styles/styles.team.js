import styled from "styled-components";

export const Container = styled.div`
  min-width: 800px;
  width: 80%;
  margin: auto;
  margin-top: 20px;
  padding: 20px;
`;

// 팀 생성

export const CreateContainer = styled.div``;

export const CreateBox = styled.div`
  background-color: #f1f1f1;
  border-radius: 6px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`;

export const LeftIcon = styled.div`
  margin-left: auto;
  svg {
    width: 160px;
    height: 160px;
  }
`;

export const AddButton = styled.div`
  color: #626161;
  font-size: 14px;
  margin-top: 15px;
  margin-left: 34px;
  margin-right: 34px;
  cursor: pointer;
`;

export const RightBox = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const TeamNameBox = styled.div`
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const TeamNameInput = styled.input`
  border-radius: 10px;
  border-color: #eaeaea;
  width: 538px;
  padding: 10px 0 10px 10px;
  border: 1px solid #b4b4b4;
`;

export const ExplainBox = styled.div``;

export const ExplainInput = styled.input`
  border-radius: 10px;
  width: 538px;
  padding: 25px 0 25px 10px;
  border: 1px solid #b4b4b4;
`;

export const ButtonSet = styled.div`
  margin-top: 20px;
  margin-left: 405px;
`;

export const ResetButton = styled.button`
  border: none;
  border-radius: 4px;
  padding: 7px 15px;
  background-color: #51dacf;
  color: white;
  cursor: pointer;
`;

export const ConfirmButton = styled.button`
  margin-left: 15px;
  border: none;
  border-radius: 4px;
  padding: 7px 15px;
  background-color: #0278ae;
  color: white;
  cursor: pointer;
`;

// 팀 목록

export const ListContainer = styled.div`
  margin-top: 20px;
`;

export const ListBox = styled.div`
  background-color: #f1f1f1;
  border-radius: 6px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`;

export const FindInputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export const FindInput = styled.input`
  width: 100%;
  padding: 10px 60px 10px 60px;
  border-radius: 10px;
  border: none;
`;

export const IconLeft = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

export const IconRight = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

export const TeamExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  margin-top: 20px;
  overflow-y: scroll;
  height: 300px;
`;

export const ExampleBox = styled.div`
  position: relative;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #b4b4b4;
  padding: 15px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

export const ExampleIcon = styled.div`
  margin-left: 25px;
  img {
    width: 70px;
    height: 70px;
  }
`;

export const TeamInfo = styled.div`
  margin-left: 40px;
`;

export const TeamName = styled.div`
  font-size: 16px;
`;

export const TeamExplain = styled.div`
  font-size: 13px;
  color: #828181;
  margin-top: 10px;
  width: 100%;
  max-width: 700px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TeamLeader = styled.div`
  font-size: 13px;
  color: #828181;
  margin-top: 5px;
`;
