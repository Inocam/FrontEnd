import { useForm } from 'react-hook-form';

import LoginIcon from '../assets/icons/loginlogo.svg?react';
import GoogleIcon from '../assets/icons/google.svg?react';
import KakaoIcon from '../assets/icons/kakao.svg?react';
import GithubIcon from '../assets/icons/github.svg?react';
import * as S from "../styles/index.style";


const Logincom = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
    console.log(data);
    };

    return (
        
    <S.login.LoginContainer>
        <LoginIcon/>
        <S.login.Title>LOGIN</S.login.Title>

        <form onSubmit={handleSubmit(onSubmit)}>
        <S.login.InputGroup>
            <S.login.Label htmlFor="email">Email address</S.login.Label>
            <S.login.Input
            type="email"
            id="email"
            {...register('email', { required: true })}
            />
        </S.login.InputGroup>

        <S.login.InputGroup>
            <S.login.Label htmlFor="password">Password</S.login.Label>
            <S.login.Input
            type="password"
            id="password"
            {...register('password', { required: true })}
            />
        </S.login.InputGroup>

        <S.login.ForgotPassword>
            <a href="#">Forgot Password?</a>
        </S.login.ForgotPassword>

        <S.login.LoginButton type="submit">LOGIN</S.login.LoginButton>
        <S.login.SocialIcon>
        <GoogleIcon/> <KakaoIcon/> <GithubIcon/>
        </S.login.SocialIcon>
        </form>

        <S.login.SignUpLink>  
        <a href="#">SIGN UP</a>
        </S.login.SignUpLink>
    </S.login.LoginContainer>

    );
};

export default Logincom;



