import { useForm } from 'react-hook-form';
import * as S from "../styles/index.style";
import LoginIcon from '../assets/icons/loginlogo.svg?react';
import SignUpArrowIcon from '../assets/icons/signuparrow.svg?react';


const Signup = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <S.signup.SignUpContainer>
            <LoginIcon />
            <S.signup.Title>SIGN UP</S.signup.Title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <S.signup.InputGroup>
                    <S.signup.Label htmlFor="email">Email address</S.signup.Label>
                    <S.signup.Input
                        type="email"
                        id="email"
                        {...register('email', { required: true })}
                    />
                </S.signup.InputGroup>

                <S.signup.InputGroup>
                    <S.signup.Label htmlFor="username">User Name</S.signup.Label>
                    <S.signup.Input
                        type="text"
                        id="username"
                        {...register('username', { required: true })}
                    />
                </S.signup.InputGroup>

                <S.signup.InputGroup>
                    <S.signup.Label htmlFor="password">Password</S.signup.Label>
                    <S.signup.Input
                        type="password"
                        id="password"
                        {...register('password', { required: true })}
                    />
                </S.signup.InputGroup>

                <S.signup.SignUpButton type="submit"><SignUpArrowIcon /></S.signup.SignUpButton>
            </form>
        </S.signup.SignUpContainer>

    );
};

export default Signup;

