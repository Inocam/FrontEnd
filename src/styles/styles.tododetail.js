import styled from "styled-components";

export const TodoModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TodoModalContent = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    width: 800px;
    max-width: 90%;
    height: 420px;
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const TodoHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    height: 60px;
    padding: 0 10px;
`;

export const TitleContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;

export const Title = styled.h1`
    font-size: 28px;
    margin: 0;
    cursor: pointer;
    line-height: 40px;
    color: #333;
    &:hover {
        color: #0278AE;
    }
`;

export const TitleInput = styled.input`
    font-size: 28px;
    padding: 5px 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    width: calc(100% - 180px);
    height: 40px;
    &:focus {
        outline: none;
        border-color: #025E8A;
        box-shadow: 0 0 0 1px #025E8A;
    }
`;

export const ButtonGroup = styled.div`
    display: inline-flex;
    margin-left: 10px;
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
    background-color: #0278AE;
    color: white;
    &:hover {
        background-color: #025E8A;
    }
`;

export const CancelButton = styled(Button)`
    background-color: #EAEAEA;
    color: #333;
    &:hover {
        background-color: #D1D1D1;
    }
`;

export const CloseButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 5px;
    svg {
        width: 24px;
        height: 24px;
    }
    &:hover svg {
        color: #5a6268;
    }
`;

export const WarningText = styled.p`
    color: #dc3545;
    font-size: 14px;
    margin-top: 5px;
`;

export const TodoContentWrapper = styled.div`
    display: flex;
    gap: 30px;
    flex: 1;
    overflow: hidden;
`;

export const LeftSection = styled.div`
    flex: 1;
    overflow-y: auto;
`;

export const RightSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const TodoExplainSection = styled.div`
    margin-top: 0;
`;

export const ExplainTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 15px;
    color: #495057;
`;

export const ExplainContent = styled.p`
    font-size: 16px;
    line-height: 1.5;
    color: #495057;
    cursor: pointer;
    padding: 10px;
    border: 1px solid transparent;
    border-radius: 4px;
    min-height: 100px;
    &:hover {
        background-color: #f8f9fa;
        border-color: #ced4da;
    }
`;

export const ExplainTextarea = styled.textarea`
    width: 100%;
    height: 150px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    resize: vertical;
    margin-bottom: 10px;
    &:focus {
        outline: none;
        border-color: #025E8A;
        box-shadow: 0 0 0 1px #025E8A;
    }
`;

export const DetailbarItem = styled.div`
    margin-bottom: 30px; 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const DetailbarTitle = styled.h3`
    font-size: 16px;
    margin: 0 0 8px 0;
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
        border-color: #025E8A;
        box-shadow: 0 0 0 1px #025E8A;
    }
`;
