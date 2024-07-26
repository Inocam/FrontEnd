import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const LogoContainer = styled.div`
        svg {
        margin: auto;
        border-radius: 8px 0 0 8px;
        width: 600px;
        height: 600px;
        background-color: #0278AE;
    }
`;

export const SignUpContainer = styled.div`
    width: 450px;
    height: 600px;
    padding: 50px;
    background-color: white;
    border-radius: 0 8px 8px 0;
    border: 1px solid;
    border-color: #0278AE;

    
`;

export const Title = styled.h1`
    text-align: left;
    margin-bottom: 55px;

`;

export const InputGroup = styled.div`
    margin-bottom: 25px;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const SignUpButton = styled.button`

    width: 30%;
    margin-top: 50px;
    margin-left: 240px;
    padding: 12px;
    background-color: #0278AE;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    svg{

    }
`;
