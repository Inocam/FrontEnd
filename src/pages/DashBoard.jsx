import { useSelector } from "react-redux";
import styled from "styled-components";
import DonutChart from "../components/chart/Chart";
import Lastweek from "../components/chart/LastChat";
import BarChart from "../components/chart/StickChart";
import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import LogoIcon from "../assets/icons/logo.svg?react";
import BellIcon from "../assets/icons/bell.svg?react";
import UserIcon from "../assets/icons/user.svg?react";
import ArrowIcon from "../assets/icons/arrow.svg?react";
const DashBoard = () => {
  const isNavOpen = useSelector((state) => state.nav.isNavOpen);
  return (
    <div>
      <Header />
      <Sidenav />
      <Sbody $isOpen={isNavOpen}>
        <SGreeting>박광열 님, 안녕하세요 </SGreeting>
        <SProjectDetails> 프로젝트 세부 정보 </SProjectDetails>
        <Sdiv>
          <Ssdiv>
            <SLogo>
              <LogoIcon />
            </SLogo>
            <div>
              <p>[ ] 최근 7일 이내에</p>
              <p>[]개 완료</p>
            </div>
          </Ssdiv>
          <Ssdiv>
            <SLogo>
              <BellIcon />
            </SLogo>
            <div>
              <p>[ ] 최근 7일 이내에</p>
              <p>[]개 업데이트</p>
            </div>
          </Ssdiv>
          <Ssdiv>
            <SLogo>
              <UserIcon />
            </SLogo>
            <div>
              <p>[ ] 최근 7일 이내에</p>
              <p>[]개 기한완료</p>
            </div>
          </Ssdiv>
          <Ssdiv>
            <SLogo>
              <ArrowIcon />
            </SLogo>
            <div>
              <p>[ ] 최근 7일 이내에</p>
              <p>[]개 만듦</p>
            </div>
          </Ssdiv>
        </Sdiv>
        <div
          style={{
            display: "flex",
            gap: "30px",
            width: "1300px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <FlexDiv>
            <p>상태 개요</p>
            <p>Task의 상태 </p>
            <DonutChart></DonutChart>
          </FlexDiv>
          <FlexDiv>
            <p>최근활동</p>
            <Sscroll>
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
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
              <p>프로젝트 전반에서 일어나는 일 확인 !</p>
            </Sscroll>
          </FlexDiv>
          <FlexDiv>
            <p>최근활동</p>
            <p>프로젝트 전반에서 일어나는 일 확인 !</p>
            <Lastweek></Lastweek>
          </FlexDiv>
          <FlexDiv>
            <p>우선순위 분석</p>
            <p>프로젝트 전반에서 일어나는 일 확인 !</p>
            <BarChart></BarChart>
          </FlexDiv>
        </div>
      </Sbody>
    </div>
  );
};

export default DashBoard;

const Sbody = styled.div`
  padding-left: ${({ $isOpen }) => ($isOpen ? "400px" : "0")};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Ssdiv = styled.div`
  width: 200px;
  background-color: #e8ffb1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
  border-radius: 5px;
`;
const Sdiv = styled.div`
  display: flex;
  gap: 100px;
`;
const SGreeting = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 20px;
`;
const SProjectDetails = styled.p`
  font-size: 12px;
  margin-bottom: 20px;
`;
const Sscroll = styled.div`
  font-size: 12px;
  margin-bottom: 20px;
  overflow: scroll;
  height: 250px;
  width: 80%;
  text-align: center;
  p {
    font-size: 20px;
  }
`;
const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
  width: 550px;
  height: auto;
`;
const SLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    background-color: #2370b3;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    margin-right: 10px;
  }
`;
