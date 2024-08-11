import styled from "styled-components";

export const AccessContainer = styled.div`
  min-width: 800px; /* Increased width */
  width: 80%;
  padding: 2rem;
`;

export const AccessTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

export const Button = styled.button`
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #003d82;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  min-width: 150px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: left;
  font-weight: bold;
  color: #333;
`;

export const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
`;

export const UserIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
`;

export const NameCell = styled.div`
  display: flex;
  align-items: center;
`;

export const ActionButton = styled(Button)`
  background-color: #dc3545;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;

  &:hover {
    background-color: #bd2130;
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

export const ModalContent = styled.div`
  background-color: white;
  margin: 20px;
  padding: 30px 40px;
  border-radius: 4px;
`;

export const ModalSection = styled.div``;

export const ModalLabel = styled.div`
  display: block;
  margin-top: 30px;
  color: #666;
`;

export const ModalSelect = styled.select`
  padding: 7px 220px 7px 10px;
  margin-top: 10px;
`;

export const ModalInput = styled.input`
  padding: 8px 100px 8px 10px;
  margin-top: 10px;
`;

export const ModalButtonSet = styled.div`
  margin-top: 35px;
  margin-left: 170px;
`;

export const ModalCancelButton = styled.button`
  background-color: #f1f1f1;
  color: #000000;
  border: none;
  border-radius: 3px;
  padding: 8px 15px;
  cursor: pointer;
`;

export const ModalAddButton = styled.button`
  background-color: #0278ae;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 8px 15px;
  cursor: pointer;
  margin-left: 10px;
  margin-top: 10px;
`;
export const nameSpace = styled.div`
  padding: 20px;
`;
