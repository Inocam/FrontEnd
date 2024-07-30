import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
//내부파일
import LogoIcon from "../assets/icons/logo.svg?react";
import BellIcon from "../assets/icons/bell.svg?react";
import UserIcon from "../assets/icons/user.svg?react";
import ArrowIcon from "../assets/icons/arrow.svg?react";
import * as S from "../styles/index.style";

const Header = () => {
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const projectDropdownRef = useRef(null);
  const teamDropdownRef = useRef(null);

  const toggleProjectDropdown = () => {
    setIsProjectDropdownOpen((prevState) => !prevState);
    setIsTeamDropdownOpen(false);
  };

  const toggleTeamDropdown = () => {
    setIsTeamDropdownOpen((prevState) => !prevState);
    setIsProjectDropdownOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isProjectDropdownOpen && projectDropdownRef.current && !projectDropdownRef.current.contains(event.target)) {
        setIsProjectDropdownOpen(false);
      }
      if (isTeamDropdownOpen && teamDropdownRef.current && !teamDropdownRef.current.contains(event.target)) {
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
          <S.header.NavItem onClick={toggleProjectDropdown}>
            프로젝트 <ArrowIcon />
          </S.header.NavItem>
          <S.header.NavItem onClick={toggleTeamDropdown}>
            팀 <ArrowIcon />
          </S.header.NavItem>
        </S.header.NavItems>
      </S.header.LeftSection>

      <S.header.RightSection>
        <S.header.IconWrapper>
          <BellIcon />
        </S.header.IconWrapper>
        <S.header.IconWrapper>
          <UserIcon />
        </S.header.IconWrapper>
        <S.header.LogoutButton>Logout</S.header.LogoutButton>
      </S.header.RightSection>

      {isProjectDropdownOpen &&
        ReactDOM.createPortal(
          <S.header.ProjectDropdown ref={projectDropdownRef}>
            <S.header.DropdownItem>
              <p>최근</p>
            </S.header.DropdownItem>
            <S.header.DropdownItem>
              <p>모든 프로젝트 보기</p>
            </S.header.DropdownItem>
            <S.header.DropdownItem>
              <p>프로젝트 만들기</p>
            </S.header.DropdownItem>
          </S.header.ProjectDropdown>,
          document.body
        )}

      {isTeamDropdownOpen &&
        ReactDOM.createPortal(
          <S.header.TeamDropdown ref={teamDropdownRef}>
            <S.header.DropdownItem>
              <p>+ Foot에 사용자 초대</p>
            </S.header.DropdownItem>
            <S.header.DropdownItem>
              <p>팀 만들기</p>
            </S.header.DropdownItem>
          </S.header.TeamDropdown>,
          document.body
        )}
    </S.header.HeaderWrapper>
  );
};

export default Header;