//내부 컴포넌트
import * as S from "../styles/index.style";
import Calendarcom from "../components/Calender";
import {
  useGetTask,
  useGetTaskcount,
  useGetTaskstatuscount,
} from "../api/task/useTask";
import ScheduleDetailCard from "../api/ui/taskcard";
import { useRef } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Client } from "@stomp/stompjs";
import { useEffect } from "react";
const Calenderboard = () => {
  const { TaskData, addTask, configTask, delTask } = useGetTask();
  const {
    TaskStatuscount: statusCount,
    AddTTask,
    conFigMTask,
    conFigPTask,
  } = useGetTaskstatuscount();
  const { Taskcount = {}, addDate, configDate, DelDate } = useGetTaskcount();
  const stompClient = useRef(null);
  const subscriptions = useRef({});
  const Actoken = Cookies.get("AccessToken");
  const date = useSelector((state) => state.Date.date);
  const isTeam = useSelector((state) => state.user.TeamId);
  const dateRef = useRef(date);

  useEffect(() => {
    dateRef.current = date;
  }, [date]);
  const values = Object.values(statusCount).reduce((a, b) => {
    return a + b;
  }, 0);
  const projectProgress = [
    {
      name: "진행전",
      progress: !isNaN(statusCount["todo"] / values)
        ? ((statusCount["todo"] / values) * 100).toFixed(0)
        : 0,
    },
    {
      name: "진행중",
      progress: !isNaN(statusCount["ongoing"] / values)
        ? ((statusCount["ongoing"] / values) * 100).toFixed(0)
        : 0,
    },
    {
      name: "완료",
      progress: !isNaN(statusCount["done"] / values)
        ? ((statusCount["done"] / values) * 100).toFixed(0)
        : 0,
    },
    {
      name: "중단",
      progress: !isNaN(statusCount["delay"] / values)
        ? ((statusCount["delay"] / values) * 100).toFixed(0)
        : 0,
    },
  ];
  useEffect(() => {
    if (!stompClient.current) {
      stompClient.current = new Client({
        brokerURL: "wss://footapi.o-r.kr/foot/chat",
        connectHeaders: {
          Authorization: `Bearer ${Actoken}`,
        },
        debug: function () {},
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      stompClient.current.onConnect = () => {
        // 현재 대화방 구독
        subscriptions.current.room = stompClient.current.subscribe(
          `/topic/task/${isTeam}`,
          (message) => {
            const nowdate = `${dateRef.current.year}-${dateRef.current.month
              .toString()
              .padStart(2, "0")}-${dateRef.current.day
              .toString()
              .padStart(2, "0")}`;
            const receivedMessage = JSON.parse(message.body);
            if (receivedMessage.type == "create") {
              addDate(receivedMessage.dueDate);
              if (nowdate == receivedMessage.dueDate) {
                addTask(receivedMessage);
              }
              if (
                `${dateRef.current.year}-${dateRef.current.month
                  .toString()
                  .padStart(2, "0")}` == receivedMessage.dueDate.slice(0, 7)
              ) {
                AddTTask(receivedMessage.status);
              }
            } else if (receivedMessage.type == "delete") {
              //{"type":"delete","teamId":61,"taskId":213,"dueDate":"2024-08-04","status":"done"}
              if (nowdate == receivedMessage.dueDate) {
                delTask(receivedMessage.taskId);
              }
              if (
                `${dateRef.current.year}-${dateRef.current.month
                  .toString()
                  .padStart(2, "0")}` == receivedMessage.dueDate.slice(0, 7)
              ) {
                conFigMTask(receivedMessage.status);
                DelDate(receivedMessage.dueDate);
              }

            } else if (receivedMessage.taskResponseDto.type == "update") {
              if (
                receivedMessage.beforeDueDate !=
                receivedMessage.taskResponseDto.dueDate
              ) {
                configDate(
                  receivedMessage.beforeDueDate,
                  receivedMessage.taskResponseDto.dueDate
                );
              }
              if (
                nowdate == receivedMessage.beforeDueDate ||
                nowdate == receivedMessage.taskResponseDto.dueDate
              ) {
                configTask(receivedMessage, nowdate);
              }
              if (
                `${dateRef.current.year}-${dateRef.current.month
                  .toString()
                  .padStart(2, "0")}` ==
                receivedMessage.beforeDueDate.slice(0, 7)
              ) {
                conFigMTask(receivedMessage.beforeStatus);
              }
              if (
                `${dateRef.current.year}-${dateRef.current.month
                  .toString()
                  .padStart(2, "0")}` ==
                receivedMessage.taskResponseDto.dueDate.slice(0, 7)
              ) {
                conFigPTask(receivedMessage.taskResponseDto.status);
              }
              // }else if(){
            }
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
  }, [Actoken, isTeam]);
  return (
    <S.calender.DashboardContainer style={{ margin: "0 20px" }}>
      <S.calender.CardFlexDiv>
        <S.calender.Card>
          <S.calender.CardHeader>
            <S.calender.CardTitle>일정 캘린더</S.calender.CardTitle>
          </S.calender.CardHeader>
          <S.calender.CardContent>
            <Calendarcom Taskcount={Taskcount} />
          </S.calender.CardContent>
        </S.calender.Card>
        <S.calender.InfoCard>
          <S.calender.CardHeader>
            <S.calender.CardTitle>일정 상세</S.calender.CardTitle>
          </S.calender.CardHeader>
          {
            <div>
              {TaskData.map((data) => {
                return (
                  <ScheduleDetailCard key={data.taskId} scheduleData={data} />
                );
              })}
            </div>
          }
        </S.calender.InfoCard>
      </S.calender.CardFlexDiv>
      <S.calender.BCard>
        <S.calender.CardHeader>
          <S.calender.CardTitle>이번달 프로젝트 진행상황</S.calender.CardTitle>
        </S.calender.CardHeader>
        <S.calender.CardContent>
          {projectProgress.map((project, index) => (
            <S.calender.ProgressContainer key={index}>
              <S.calender.ProgressLabel>
                <span>{project.name}</span>
                <span>{project.progress}%</span>
              </S.calender.ProgressLabel>
              <S.calender.ProgressBar>
                <S.calender.ProgressFill $progress={project.progress} />
              </S.calender.ProgressBar>
            </S.calender.ProgressContainer>
          ))}
        </S.calender.CardContent>
      </S.calender.BCard>
    </S.calender.DashboardContainer>
  );
};

export default Calenderboard;
