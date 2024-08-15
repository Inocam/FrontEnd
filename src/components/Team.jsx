import * as S from "../styles/index.style";
import * as L from "../assets/icons/index.Logo";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import MDashboard from "./ModalChart";
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
import TeamInviteList from "./teamInviteList";
import { Suspense } from "react";

const Team = () => {
  const navigate = useNavigate();
  const creatorId = useSelector((state) => state.user.Id);
  const { mutate } = useCreateTeam();
  const dispatch = useDispatch();
  const { mutate: Accpet } = useAcceptTeam();
  // console.log(TeamList);
  const [selectId, setselectId] = useState("");
  const [selectDate, setselectDate] = useState("");
  const [selectTeamName, setselectTeamName] = useState("");
  // console.log(creatorId);
  const selectIdHandler = (Id, Date) => {
    startTransition(() => {
      setselectId(Id);
      setselectDate(Date);
    });
  };
  useEffect(() => {
    dispatch(setTeamId({ TeamId: "", TeamLeader: "" ,name: "" }));
  });
  const selectTeamIdHandler = (Id, Leader, name) => {
    console.log(Id, Leader, name)
    dispatch(setTeamId({ TeamId: Id, TeamLeader: Leader, name: name }));
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
              <S.team.FindInput
                onChange={(e) => setselectTeamName(e.target.value)}
                value={selectTeamName}
                placeholder={"원하는 팀 찾기"}
              />
              <S.team.IconRight>
                <L.TeamLensIcon />
              </S.team.IconRight>
            </S.team.FindInputContainer>
            <Suspense>
              <TeamInviteList
                selectTeamName={selectTeamName}
                acceptHandler={acceptHandler}
                selectIdHandler={selectIdHandler}
                selectTeamIdHandler={selectTeamIdHandler}
              ></TeamInviteList>
            </Suspense>
          </S.team.ListBox>
        </S.team.ListContainer>
      </S.team.Container>
      {selectId != "" && (
        <MDashboard
          TeamId={selectId}
          createDate={selectDate}
          setItemHandler={() => {
            selectIdHandler("");
          }}
        ></MDashboard>
      )}
    </div>
  );
};

export default Team;
