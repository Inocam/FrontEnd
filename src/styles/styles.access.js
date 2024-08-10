import styled from "styled-components";

export const AccessContainer = styled.div`
    margin-top: 40px;
    margin-left: 80px;
    margin-right: 80px;
`;

export const AccessTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;
`;

export const UserAddButton = styled.button`
    background-color: #0278AE;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 12px;
    cursor: pointer;
`;

// 모달
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
    background-color: #F1F1F1;
    color: #000000;
    border: none;
    border-radius: 3px;
    padding: 8px 15px ;
    cursor: pointer;
`;

export const ModalAddButton = styled.button`
    background-color: #0278AE;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 8px 15px ;
    cursor: pointer;
    margin-left: 10px;
    margin-top: 10px;
`;

// 역할 
export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const SearchInput = styled.input`
    padding: 12px 100px 12px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
`;

export const DropdownContainer = styled.div`
    position: relative;
    width: 200px;
`;

export const DropdownButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: left;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ArrowIcon = styled.span`
    transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.3s ease;
`;

export const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: white;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
`;

export const DropdownItem = styled.div`
    padding: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
        background-color: #f0f0f0;
    }
`;

export const Checkbox = styled.input`
    margin-right: 10px;
`;

// 테이블
export const TableContainer = styled.div`
    margin-top: 35px;
    width: 100%;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const Th = styled.th`
    text-align: left;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    color: #666;
`;

export const Td = styled.td`
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

export const UserIcon = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    margin-right: 20px;
`;


export const NameCell = styled.div`
    display: flex;
    align-items: center;
`;

export const RoleSelect = styled.select`
    padding: 6px;
    border-radius: 4px;
`;

export const ActionButton = styled.button`
    background: none;
    border: none;
    color: #0278AE;
    cursor: pointer;
`;