
import LoginIcon from "../assets/icons/loginlogo.svg?react";
import * as S from "../styles/index.style";
import { useState } from "react";
import Signup from "../components/Signup";
import MainLogin from "../components/Mainlogin";

const Login = () => {
  const [isSign, setisSign] = useState(false);
  return (
    <S.login.MainContainer>
      <S.login.LogoContainer>
        <LoginIcon />
      </S.login.LogoContainer>
      {!isSign ? (
        <MainLogin
          signHandler={() => setisSign((prevState) => !prevState)}
        ></MainLogin>
      ) : (
        <Signup
          signHandler={() => setisSign((prevState) => !prevState)}
        ></Signup>
      )}
    </S.login.MainContainer>
  );
};

export default Login;