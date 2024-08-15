import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Section = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  margin-bottom: 1rem;
  border-radius: 4px;
`;

export const SectionItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Label = styled.label`
  font-weight: bold;
  width: 120px;
  margin-right: 1rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  flex: 1;
  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

export const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 100%;
  height: 100px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

export const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 1rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  background-color: ${(props) => (props.selected ? "#007bff" : "#fff")};
  color: ${(props) => (props.selected ? "#fff" : "#007bff")};
  border: 1px solid #007bff;

  &:hover {
    opacity: 0.8;
  }
`;
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(199, 214, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;
