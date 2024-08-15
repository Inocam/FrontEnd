// import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LoginIcon from "../assets/icons/loginlogo.svg?react";
import KakaoIcon from "../assets/icons/kakao.svg?react";
import * as S from "../styles/index.style";
import { usePostSignInData } from "../api/Login/Login";
const MainLogin = ({ signHandler }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { mutate, isSuccess, isError, error } = usePostSignInData();

  const onSubmit = (data) => {
    mutate({ email: data.email, password: data.password });
  };

  return (
    <S.login.Container>
      <LoginIcon />
      <S.login.Title>LOGIN</S.login.Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <S.login.InputGroup>
          <S.login.Label htmlFor="email">Email</S.login.Label>
          <S.login.Input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <S.login.Error role="alert">{errors.email.message}</S.login.Error>
          )}
        </S.login.InputGroup>

        <S.login.InputGroup>
          <S.login.Label htmlFor="password">Password</S.login.Label>
          <S.login.Input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <S.login.Error role="alert">
              {errors.password.message}
            </S.login.Error>
          )}
        </S.login.InputGroup>
        <S.login.ForgotPassword>
          <a href="#">Forgot Password?</a>
        </S.login.ForgotPassword>

        <S.login.LoginButton type="submit">LOGIN</S.login.LoginButton>
        {isError && (
          <S.login.Error role="alert">
            {error?.message || "An error occurred during login"}
          </S.login.Error>
        )}
        <S.login.SocialIcon>
          <KakaoIcon />
        </S.login.SocialIcon>
      </form>

      <S.login.SignUpLink onClick={signHandler}>
        <a href="#">SIGN UP</a>
      </S.login.SignUpLink>
    </S.login.Container>
  );
};

export default MainLogin;
