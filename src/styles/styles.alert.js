import styled, {keyframes} from "styled-components";

export const slideDown = keyframes`
    from {
    transform: translateY(-100%);
    opacity: 0;
    }
    to {
    transform: translateY(0);
    opacity: 1;
    }
`;

export const AlertOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #EAEAEA;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 20px;
    
`;

export const AlertContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    animation: ${slideDown} 0.5s ease-out;
    max-width: 400px;
    width: 100%;
    border-radius: 10px;
`;


export const AlertIconBox = styled.div`
    display: flex;
    justify-content: center;
    svg{
        color: #FF6868;
        width: 50px;
        height: 50px;
    }
`;

export const AlertTitle = styled.h2`
    margin-top: 20px;
    color: black;
    font-weight: 800;
    display: flex;
    justify-content: center;
`;

export const AlertMessage = styled.p`
    margin-top: 15px;
    display: flex;
    justify-content: center;
    color: #5a6268;
`;

export const AlertButtonSet = styled.div`
    justify-content: center;
    display: flex;
`;

export const Button = styled.button`
    padding: 8px 15px;
    margin-left: 10px;
    margin-top: 30px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    transition: background-color 0.3s;
`;


export const AlertDeleteButton = styled(Button)`
        background-color:#EF5350;
    margin-bottom: 12px;
    margin-left: 15px;
    color: white;
    &:hover {
        background-color: #D32F2F;
    } 
`

export const AlertCancelButton = styled(Button)`
        background-color: #6c757d;
        margin-bottom: 12px;
        margin-left: 15px;
    color: white;
    &:hover {
        background-color: #5a6268;
    }
`

// 버전 22