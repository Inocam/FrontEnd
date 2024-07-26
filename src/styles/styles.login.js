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

export const LoginContainer = styled.div`
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
    margin-bottom: 40px;
`;

export const InputGroup = styled.div`
    margin-bottom: 15px;
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
    margin-bottom: 5px;
`;

export const ForgotPassword = styled.div`
    text-align: right;
    margin-bottom: 20px;
    
    a {
    color: #666;
    font-size: 14px;
    text-decoration: none;

    }
`;

export const LoginButton = styled.button`
    width: 100%;
    margin-top: 8px;
    padding: 12px;
    background-color: #0278AE;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
`;

export const SignUpLink = styled.div`
    text-align: right;
    margin-top: 25px;  
    a {
    color: #0278AE;
    text-decoration: none;
    font-weight: bold;
    }
`;

export const SocialIcon = styled.div`
    text-align: center;
    display: block;
    min-width: 240px;
    svg {
        cursor: pointer;
        width: 50px;
        height: 50px;
        background-color: white;
        margin-top: 40px;
        margin-left : 20px;
        padding: 5px;
    }
`