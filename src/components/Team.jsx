import * as S from "../styles/index.style";
import * as L from "../assets/icons/index.Logo";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import MDashboard from "./useless/ModalChart";
import { useCreateTeam } from "../api/Team/createTeam";
import {
  useAcceptTeam,
  useGetinvite,
  useGetMTeamList,
} from "../api/Team/useTeam";
import { startTransition } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setTeamId } from "../store/module/User";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Team = () => {
  const navigate = useNavigate();
  const creatorId = useSelector((state) => state.user.Id);
  const { mutate } = useCreateTeam();
  const dispatch = useDispatch();
  const { data: TeamList = [], isLoading } = useGetMTeamList();
  const { data: inviteList = [] } = useGetinvite();
  const { mutate: Accpet } = useAcceptTeam();
  // console.log(TeamList);
  const [selectId, setselectId] = useState("");
  // console.log(creatorId);
  const selectIdHandler = (Id) => {
    startTransition(() => {
      setselectId(Id);
    });
  };
  useEffect(() => {
    dispatch(setTeamId({ TeamId: "", TeamLeader: "" }));
  });
  const selectTeamIdHandler = (Id, Leader) => {
    console.log(Id, Leader);
    dispatch(setTeamId({ TeamId: Id, TeamLeader: Leader }));
    navigate("/calender");
  };
  const acceptHandler = (Id, bool) => {
    Accpet({
      invitationId: Id,
      Accept: bool,
    });
  };
  const name = useRef();
  const description = useRef();
  const sendHandler = () => {
    if (
      name.current.value.trim() == "" &&
      description.current.value.trim() == ""
    ) {
      alert("빈값은 넣을수없습니다");
      return;
    }
    mutate({
      team: {
        name: name.current.value,
        description: description.current.value,
        creatorId,
      },
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <S.team.Container>
        <S.team.CreateContainer>
          <h3>팀 생성하기</h3>
          <S.team.CreateBox>
            <S.team.LeftIcon>
              <L.TeamIcon />
              <S.team.AddButton>프로필 사진 추가</S.team.AddButton>
            </S.team.LeftIcon>
            <S.team.RightBox>
              <S.team.TeamNameBox>
                <S.team.Label>팀 이름</S.team.Label>
                <S.team.TeamNameInput
                  ref={name}
                  placeholder={"팀 이름을 입력해 주세요"}
                  required
                />
              </S.team.TeamNameBox>
              <S.team.ExplainBox>
                <S.team.Label>설명</S.team.Label>
                <S.team.ExplainInput
                  ref={description}
                  placeholder={"설명을 입력해 주세요"}
                  required
                />
              </S.team.ExplainBox>
              <S.team.ButtonSet>
                <S.team.ResetButton>초기화</S.team.ResetButton>
                <S.team.ConfirmButton onClick={() => sendHandler()}>
                  확인
                </S.team.ConfirmButton>
              </S.team.ButtonSet>
            </S.team.RightBox>
          </S.team.CreateBox>
        </S.team.CreateContainer>
        <S.team.ListContainer>
          <h3>팀 목록</h3>
          <S.team.ListBox>
            <S.team.FindInputContainer>
              <S.team.IconLeft>
                <L.TeamBarIcon />
              </S.team.IconLeft>
              <S.team.FindInput placeholder={"원하는 팀 찾기"} />
              <S.team.IconRight>
                <L.TeamLensIcon />
              </S.team.IconRight>
            </S.team.FindInputContainer>
            <S.team.TeamExampleContainer>
              {inviteList?.map((data) => {
                return (
                  <S.team.ExampleBox key={data.teamId}>
                    <S.team.ExampleIcon>
                      <img src={data.imageUrl} />
                    </S.team.ExampleIcon>
                    <S.team.TeamInfo>
                      <S.team.TeamName>{data.name}</S.team.TeamName>
                      <S.team.TeamExplain>
                        {data.description}
                      </S.team.TeamExplain>
                      <S.team.TeamLeader>{data.creatorId}</S.team.TeamLeader>
                    </S.team.TeamInfo>
                    <Stdiv>
                      <S.team.ResetButton
                        onClick={() => acceptHandler(data.invitationId, true)}
                      >
                        초대받기
                      </S.team.ResetButton>
                      <S.team.ConfirmButton
                        onClick={() => acceptHandler(data.invitationId, false)}
                      >
                        거절
                      </S.team.ConfirmButton>
                    </Stdiv>
                  </S.team.ExampleBox>
                );
              })}
              {TeamList?.map((data) => {
                return (
                  <S.team.ExampleBox key={data.teamId}>
                    <S.team.ExampleIcon>
                      <img src={data.imageUrl} />
                    </S.team.ExampleIcon>
                    <S.team.TeamInfo>
                      <S.team.TeamName>{data.name}</S.team.TeamName>
                      <S.team.TeamExplain>
                        {data.description}
                      </S.team.TeamExplain>
                      <S.team.TeamLeader>{data.creatorId}</S.team.TeamLeader>
                    </S.team.TeamInfo>
                    <Stdiv>
                      <S.team.ResetButton
                        onClick={() => selectIdHandler(data.teamId)}
                      >
                        요약
                      </S.team.ResetButton>
                      <S.team.ConfirmButton
                        onClick={() =>
                          selectTeamIdHandler(data.teamId, data.creatorId)
                        }
                      >
                        들어가기
                      </S.team.ConfirmButton>
                    </Stdiv>
                  </S.team.ExampleBox>
                );
              })}
            </S.team.TeamExampleContainer>
          </S.team.ListBox>
        </S.team.ListContainer>
      </S.team.Container>
      {selectId != "" && (
        <MDashboard
          TeamId={selectId}
          setItemHandler={() => {
            selectIdHandler("");
          }}
        ></MDashboard>
      )}
    </div>
  );
};

export default Team;

const Stdiv = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
