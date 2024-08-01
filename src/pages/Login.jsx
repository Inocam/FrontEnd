import { useState } from 'react';
import LoginIcon from '../assets/icons/loginlogo.svg?react';
import * as S from "../styles/index.style";
import Logincom from '../components/Logincom';
import Signup from '../components/Signup';

const Login = () => {
    const [isSign, setisSign] = useState(true)
    return (
        <S.login.MainContainer>
            <S.login.LogoContainer>
                <LoginIcon />
            </S.login.LogoContainer>
            {isSign ? <Logincom oc={() => setisSign(prevstate => !prevstate)}></Logincom> :
                <Signup oc={() => setisSign(prevstate => !prevstate)}></Signup>}
        </S.login.MainContainer>
    );
};

export default Login;



