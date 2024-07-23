import { useState } from "react";
//내부파일
import * as S from "../styles/index.style";

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <S.sidenav.SNav $isOpen={isOpen}>
        <div>
          <S.sidenav.SToggleButton onClick={toggleNav}>
            {isOpen ? "<" : ">"}
          </S.sidenav.SToggleButton>
          <S.sidenav.STitle>Project Title</S.sidenav.STitle>

          <S.sidenav.SSubtitle>Widgets</S.sidenav.SSubtitle>
          <S.sidenav.SParagraph>Dashboard</S.sidenav.SParagraph>
          <S.sidenav.SParagraph>Timeline</S.sidenav.SParagraph>
          <S.sidenav.SParagraph>Calendar</S.sidenav.SParagraph>
          <S.sidenav.SParagraph>Kanban Board</S.sidenav.SParagraph>
          <S.sidenav.SSubtitle>Git</S.sidenav.SSubtitle>
          <S.sidenav.SParagraph>Code</S.sidenav.SParagraph>
          <S.sidenav.SParagraph>Issue</S.sidenav.SParagraph>
          <S.sidenav.SParagraph>?</S.sidenav.SParagraph>
        </div>
      </S.sidenav.SNav>
    </>
  );
};

export default Sidenav;
