import * as S from "../styles/index.style";

import { useGetinvite, useGetMTeamList } from "../api/Team/useTeam";
import styled from "styled-components";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
const TeamInviteList = ({
  acceptHandler,
  selectIdHandler,
  selectTeamIdHandler,
  selectTeamName,
}) => {
  const { data: TeamList = [] } = useGetMTeamList();
  const { data: inviteList = [] } = useGetinvite();
  const queryClient = useQueryClient();
  const stompClient = useRef(null);
  const subscriptions = useRef({});
  const Actoken = Cookies.get("AccessToken");
  const userId = useSelector((state) => state.user.Id);
  useEffect(() => {
    if (!stompClient.current) {
      stompClient.current = new Client({
        brokerURL: "wss://footapi.o-r.kr/foot/chat",
        connectHeaders: {
          Authorization: `Bearer ${Actoken}`,
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      stompClient.current.onConnect = () => {

        // 현재 대화방 구독
        subscriptions.current.room = stompClient.current.subscribe(
          `/topic/invite/${userId}`,
          (message) => {
            const receivedMessage = JSON.parse(message.body);
            console.log("Room message:", receivedMessage);
            queryClient.setQueryData(["getinvite"], (oldData) => [
              ...oldData,
              receivedMessage,
            ]);
          }
        );
      };

      stompClient.current.onStompError = (frame) => {
        console.error("STOMP error: ", frame.headers.message);
      };

      stompClient.current.activate();
    }

    return () => {
      Object.values(subscriptions.current).forEach((subscription) => {
        if (subscription) {
          subscription.unsubscribe();
        }
      });
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, [Actoken, userId]);
  return (
    <S.team.TeamExampleContainer>
      {inviteList
        ?.filter((a) => a.name.includes(selectTeamName))
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
                <S.team.RefuseButton
                  onClick={() => acceptHandler(data.invitationId, false)}
                >
                  거절
                </S.team.RefuseButton>
                <S.team.ConfirmButton
                  onClick={() => acceptHandler(data.invitationId, true)}
                >
                  초대받기
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
