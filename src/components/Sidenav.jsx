import { useSelector } from "react-redux";
//내부파일
import * as S from "../styles/index.style";
import { useDispatch } from "react-redux";
import { navopenHandler } from "../store/module/Dashboard";

const Sidenav = ({ children}) => {
  const isNavOpen = useSelector((state) => state.nav.isNavOpen);
  const dispatch = useDispatch();
  const toggleNav = () => {
    dispatch(navopenHandler());
  };

  return (
    <>
      <S.sidenav.SNav $isOpen={isNavOpen}>
        <div>
          <S.sidenav.SToggleButton onClick={toggleNav}>
            {isNavOpen ? "<" : ">"}
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
      <S.sidenav.Sbody $isOpen={isNavOpen}>{children}</S.sidenav.Sbody>
    </>
  );
};

export default Sidenav;
