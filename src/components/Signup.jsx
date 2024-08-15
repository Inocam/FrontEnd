import { useForm } from "react-hook-form";
import * as S from "../styles/index.style";
import LoginIcon from "../assets/icons/loginlogo.svg?react";
import RArrowIcon from "../assets/icons/rarrow.svg?react";
import { usePostSignUpData } from "../api/Login/signup";

const Signup = ({ signHandler }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { mutate, error, isError, isSuccess } = usePostSignUpData();
  const onSubmit = async (data) => {
    await mutate({
      username: data.username,
      password: data.password,
      email: data.email,
    });
    if (isSuccess && !isError) {
      signHandler();
    }
  };

  return (
    <S.login.Container>
      <LoginIcon />
      <S.login.Title>SIGN UP</S.login.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.login.InputGroup>
          <S.login.Label htmlFor="email">Email address</S.login.Label>
          <S.login.Input
            type="email"
            id="email"
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email?.type === "required" && (
            <S.login.Error role="alert">이메일은 필수입니다.</S.login.Error>
          )}
        </S.login.InputGroup>
        <S.login.InputGroup>
          <S.login.Label htmlFor="username">User Name</S.login.Label>
          <S.login.Input
            type="text"
            id="username"
            {...register("username", { required: true })}
            aria-invalid={errors.mail ? "true" : "false"}
          />
          {errors.username?.type === "required" && (
            <S.login.Error role="alert">유저이름은 필수입니다.</S.login.Error>
          )}
        </S.login.InputGroup>

        <S.login.InputGroup>
          <S.login.Label htmlFor="password">Password</S.login.Label>
          <S.login.Input
            type="password"
            id="password"
            {...register("password", {
              required: "패스워드는 필수입니다.",
              minLength: {
                value: 8,
                message: "8글자이상 비밀번호가 필요합니다",
              },
              pattern: {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
                message: "숫자와 특수문자 하나이상 포함해야합니다 !",
              },
            })}
          />
          {errors.password && (
            <S.login.Error>{errors.password.message}</S.login.Error>
          )}
        </S.login.InputGroup>
        <S.login.Div>
          <S.login.SignUpButton onClick={() => signHandler()} type="button">
            <RArrowIcon />
          </S.login.SignUpButton>
          <S.login.SignUpButton type="submit">SIGN UP</S.login.SignUpButton>
        </S.login.Div>
        {isError && (
          <S.login.Error role="alert">
            {error?.message || "An error occurred during login"}
          </S.login.Error>
        )}
      </form>
    </S.login.Container>
  );
};

export default Signup;
