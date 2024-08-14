import * as S from "../styles/index.style";

import { useGetinvite, useGetMTeamList } from "../api/Team/useTeam";
import styled from "styled-components";

const TeamInviteList = ({
  acceptHandler,
  selectIdHandler,
  selectTeamIdHandler,
  selectTeamName,
}) => {
  console.log(selectTeamName);
  const { data: TeamList = [], isLoading } = useGetMTeamList();
  const { data: inviteList = [] } = useGetinvite();
  return (
    <S.team.TeamExampleContainer>
      {inviteList
        .filter((a) => a.name.includes(selectTeamName))
        ?.map((data) => {
          return (
            <S.team.ExampleBox key={data.teamId}>
              <S.team.ExampleIcon>
                <img src={data.imageUrl} />
              </S.team.ExampleIcon>
              <S.team.TeamInfo>
                <S.team.TeamName>{data.name}</S.team.TeamName>
                <S.team.TeamExplain>{data.description}</S.team.TeamExplain>
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
      {TeamList.filter((a) => a.name.includes(selectTeamName))?.map((data) => {
        return (
          <S.team.ExampleBox key={data.teamId}>
            <S.team.ExampleIcon>
              <img src={data.imageUrl} />
            </S.team.ExampleIcon>
            <S.team.TeamInfo>
              <S.team.TeamName>{data.name}</S.team.TeamName>
              <S.team.TeamExplain>{data.description}</S.team.TeamExplain>
              <S.team.TeamLeader>{data.creatorId}</S.team.TeamLeader>
            </S.team.TeamInfo>
            <Stdiv>
              <S.team.ResetButton
                onClick={() => selectIdHandler(data.teamId, data.creationDate)}
              >
                요약
              </S.team.ResetButton>
              <S.team.ConfirmButton
                onClick={() =>
                  selectTeamIdHandler(data.teamId, data.creatorId, data.name)
                }
              >
                들어가기
              </S.team.ConfirmButton>
            </Stdiv>
          </S.team.ExampleBox>
        );
      })}
    </S.team.TeamExampleContainer>
  );
};

export default TeamInviteList;
const Stdiv = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
