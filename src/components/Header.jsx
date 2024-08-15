import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
//내부파일
import LogoIcon from "../assets/icons/logo.svg?react";
import BellIcon from "../assets/icons/bell.svg?react";
import UserIcon from "../assets/icons/user.svg?react";
import ArrowIcon from "../assets/icons/arrow.svg?react";
import * as S from "../styles/index.style";
import AddSchedule from "./AddSchedule";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../store/module/User";
import Cookies from "js-cookie";

const Header = () => {
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const projectDropdownRef = useRef(null);
  const teamDropdownRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const LogoutHandler = () => {
    dispatch(Logout());
    Cookies.remove("AccessToken");
    alert("성공적으로 로그아웃되었습니다");
    navigate("/");
  };

  const toggleTeamDropdown = () => {
    setIsTeamDropdownOpen((prevState) => !prevState);
    setIsProjectDropdownOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isProjectDropdownOpen &&
        projectDropdownRef.current &&
        !projectDropdownRef.current.contains(event.target)
      ) {
        setIsProjectDropdownOpen(false);
      }
      if (
        isTeamDropdownOpen &&
        teamDropdownRef.current &&
        !teamDropdownRef.current.contains(event.target)
      ) {
        setIsTeamDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isProjectDropdownOpen, isTeamDropdownOpen]);

  return (
    <S.header.HeaderWrapper>
      <S.header.Icon>
        <LogoIcon />
      </S.header.Icon>

      <S.header.LeftSection>
        <S.header.NavItems>
          {user.Id && user.TeamLeader && (
            <S.header.NavItem onClick={() => navigate("/team")}>
              TEAM <ArrowIcon />
            </S.header.NavItem>
          )}
          {user.Id && user.TeamLeader && (
            <S.header.NavItem onClick={() => navigate("/access")}>
              Acess
            </S.header.NavItem>
          )}
          {user.TeamLeader && user.TeamId && (
            <S.header.NavItem onClick={toggleTeamDropdown}>
              Task추가
            </S.header.NavItem>
          )}
        </S.header.NavItems>
      </S.header.LeftSection>

      <S.header.RightSection>
        <S.header.IconWrapper>
          <BellIcon />
        </S.header.IconWrapper>
        <S.header.IconWrapper>
          <UserIcon />
        </S.header.IconWrapper>
        <S.header.LogoutButton onClick={() => LogoutHandler()}>
          Logout
        </S.header.LogoutButton>
      </S.header.RightSection>

      {isTeamDropdownOpen &&
        ReactDOM.createPortal(
          <div ref={teamDropdownRef}>
            <AddSchedule onClickHandler={toggleTeamDropdown} />
          </div>,
          document.body
        )}
    </S.header.HeaderWrapper>
  );
};

export default Header;
