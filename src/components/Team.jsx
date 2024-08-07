import * as S from "../styles/index.style";
import * as L from "../assets/icons/index.Logo";
import { useCreateTeam } from "../api/Team/createTeam";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useGetMessage } from "../api/Team/TeamList";
import { useState } from "react";
import MDashboard from "./ModalChart";

const Team = () => {
  const { mutate } = useCreateTeam();
  const { data: TeamList, isLoading } = useGetMessage();
  console.log(TeamList);
  const creatorId = useSelector((state) => state.user.Id);
  const [selectId, setselectId] = useState("");
  console.log(creatorId);
  const selectIdHandler = (Id) => {
    setselectId(Id);
  };

  const name = useRef();
  const description = useRef();
  const sendHandler = () => {
    mutate({
      name: name.current.value,
      description: description.current.value,
      creatorId,
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
                />
              </S.team.TeamNameBox>
              <S.team.ExplainBox>
                <S.team.Label>설명</S.team.Label>
                <S.team.ExplainInput
                  ref={description}
                  placeholder={"설명을 입력해 주세요"}
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
              {TeamList?.map((data,index) => {
                return (
                  <S.team.ExampleBox
                    key={index}
                    onClick={() => selectIdHandler(data.team_id)}
                  >
                    <S.team.ExampleIcon>
                      <L.TeamIcon />
                    </S.team.ExampleIcon>
                    <S.team.TeamInfo>
                      <S.team.TeamName>{data.name}</S.team.TeamName>
                      <S.team.TeamExplain>
                        {data.description}
                      </S.team.TeamExplain>
                      <S.team.TeamLeader>{data.creatorId}</S.team.TeamLeader>
                    </S.team.TeamInfo>
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
