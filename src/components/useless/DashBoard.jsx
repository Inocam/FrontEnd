//내부 데이터
import Header from "../Header";
import Sidenav from "../Sidenav";
import * as S from "../../styles/index.style";
import * as C from "../chart/index.chart";
import Topsummary from "../components/Topsummary";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const DashBoard = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user);
  if(user.TeamLeader && user.TeamId ){
    navigate("/team")
  }
  return (
    <div>
      <Header />
      <Sidenav>
        <S.dashboard.SGreeting>박광열 님, 안녕하세요 </S.dashboard.SGreeting>
        <S.dashboard.SProjectDetails>
          프로젝트 세부 정보
        </S.dashboard.SProjectDetails>
        <Topsummary />
        <S.dashboard.SMaindiv>
          <S.dashboard.FlexDiv>
            <p>상태 개요</p>
            <p>Task의 상태 </p>
            <C.DonutChart></C.DonutChart>
          </S.dashboard.FlexDiv>
          <S.dashboard.FlexDiv>
            <p>최근활동</p>
            <S.dashboard.Sscroll>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
            </S.dashboard.Sscroll>
          </S.dashboard.FlexDiv>
          <S.dashboard.FlexDiv>
            <p>최근활동</p>
            <p>프로젝트 전반에서 일어나는 일 확인 !</p>
            <C.Lastweek></C.Lastweek>
          </S.dashboard.FlexDiv>
          <S.dashboard.FlexDiv>
            <p>우선순위 분석</p>
            <p>프로젝트 전반에서 일어나는 일 확인 !</p>
            <C.BarChart></C.BarChart>
          </S.dashboard.FlexDiv>
        </S.dashboard.SMaindiv>
      </Sidenav>
    </div>
  );
};

export default DashBoard;
