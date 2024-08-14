import styled from "styled-components";

export const TodoModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(199, 214, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TodoModalContent = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  width: 1000px;
  max-width: 95%;
  height: 700px;
  position: relative;
  display: flex;
  flex-direction: column;
  // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const TodoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  height: 70px;
  padding: 0;
  width: 100%;
`;

export const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  border-bottom: 1px solid #ced4da;
`;

export const Title = styled.h1`
  font-size: 35px;
  margin-left: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  line-height: 40px;
  color: #333;
  &:hover {
    color: #0278ae;
  }
`;

export const TitleInput = styled.input`
  font-size: 27px;
  padding: 5px 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: calc(100% - 150px);
  height: 40px;
  &:focus {
    outline: none;
    border-color: #025e8a;
    box-shadow: 0 0 0 1px #025e8a;
  }
`;

export const ButtonGroup = styled.div`
  display: inline-flex;
  margin-left: 10px;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 8px 15px;
  margin-left: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s;
`;

export const SaveButton = styled(Button)`
  background-color: #0278ae;
  color: white;
  &:hover {
    background-color: #025e8a;
  }
`;

export const CancelButton = styled(Button)`
  background-color: #6c757d;
  color: white;
  &:hover {
    background-color: #5a6268;
  }
`;

export const WarningText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: -8px;
  margin-left: 10px;
`;

//
export const TodoContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  flex: 1;
  overflow: hidden;
  width: 100%;
`;

// 왼쪽
export const LeftSection = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const TodoExplainSection = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
`;

export const ExplainTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
  color: #495057;
`;

export const ExplainContent = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #495057;
  cursor: pointer;
  padding: 15px;
  border: 1px solid transparent;
  border-radius: 4px;
  min-height: 150px;
  flex: 1;
  overflow-y: auto;
  &:hover {
    background-color: #f8f9fa;
    border-color: #ced4da;
  }
`;

export const ExplainTextarea = styled.textarea`
  width: 100%;
  height: 280px;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  resize: vertical;
  margin-bottom: 10px;
  &:focus {
    outline: none;
    border-color: #025e8a;
    box-shadow: 0 0 0 1px #025e8a;
  }
`;

// 오른쪽

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const DetailbarItem = styled.div`
  margin-bottom: 45px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

export const DetailbarTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 10px 0;
  color: #495057;
`;

export const DetailInput = styled.input`
  font-size: 16px;
  border: 1px solid #ced4da;
  padding: 8px 12px;
  border-radius: 4px;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #025e8a;
    box-shadow: 0 0 0 1px #025e8a;
  }
`;

export const DetailSelect = styled.select`
  font-size: 16px;
  border: 1px solid #ced4da;
  padding: 8px 12px;
  border-radius: 4px;
  width: 100%;
  background-color: white;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #025e8a;
    box-shadow: 0 0 0 1px #025e8a;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownButton = styled.div`
  font-size: 16px;
  border: 1px solid #ced4da;
  padding: 8px 12px;
  border-radius: 4px;
  width: 100%;
  background-color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ArrowIcon = styled.span`
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ced4da;
  border-top: none;
  border-radius: 0 0 4px 4px;
  z-index: 1;
`;

export const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f8f9fa;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  padding: 10px;
  // border-top: 1px solid #ced4da;
  margin-bottom: 10px;
  gap: 15px;
`;

export const EditButton = styled(Button)`
  padding: 10px 20px;
  background-color: #0278ae;
  color: white;
  &:hover {
    background-color: #025e8a;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #ef5350;
  margin-bottom: 12px;
  margin-left: 15px;
  color: white;
  &:hover {
    background-color: #d32f2f;
  }
`;

export const BackButton = styled(Button)`
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  &:hover {
    background-color: #5a6268;
  }
`;
