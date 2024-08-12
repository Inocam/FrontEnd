//내부 컴포넌트
import * as S from "../styles/index.style";
import Calendarcom from "../components/Calender";
import { useSelector } from "react-redux";
import { useGetTask, useGetTaskstatuscount } from "../api/task/useTask";

const Calenderboard = () => {
  const date = useSelector((state) => state.Date.date);
  console.log(date);
  const { TaskData } = useGetTask();
  const { TaskStatuscount: statusCount } = useGetTaskstatuscount();
  const values = Object.values(statusCount).reduce((a, b) => {
    return a + b;
  }, 0);
  console.log(TaskData);
  const projectProgress = [
    {
      name: "진행전",
      progress: !isNaN(statusCount["todo"])
        ? ((statusCount["todo"] / values) * 100).toFixed(0)
        : 0,
    },
    {
      name: "진행중",
      progress: !isNaN(statusCount["ongoing"])
        ? ((statusCount["ongoing"] / values) * 100).toFixed(0)
        : 0,
    },
    {
      name: "완료",
      progress: !isNaN(statusCount["done"])
        ? ((statusCount["done"] / values) * 100).toFixed(0)
        : 0,
    },
    {
      name: "중단",
      progress: !isNaN(statusCount["delay"])
        ? ((statusCount["delay"] / values) * 100).toFixed(0)
        : 0,
    },
  ];

  return (
    <S.calender.DashboardContainer style={{ margin: "0 20px" }}>
      <S.calender.CardFlexDiv>
        <S.calender.Card>
          <S.calender.CardHeader>
            <S.calender.CardTitle>일정 캘린더</S.calender.CardTitle>
          </S.calender.CardHeader>
          <S.calender.CardContent>
            <Calendarcom />
          </S.calender.CardContent>
        </S.calender.Card>
        <S.calender.InfoCard>
          <S.calender.CardHeader>
            <S.calender.CardTitle>일정 상세</S.calender.CardTitle>
          </S.calender.CardHeader>
          {TaskData.length != 0 ? (
            <div>
              {TaskData.map((data) => {
                return (
                  <div key={data.taskId}>
                    <p>title : {data.title}</p>
                    <p>description : {data.description}</p>
                    <p>user : {data.user}</p>
                    <p>status : {data.status}</p>
                    <p>startDate : {data.startDate}</p>
                    <p>dueDate : {data.dueDate}</p>
                    <p>endDate : {data.endDate}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>{`${date.year}-${date.month}-${date.day} 일정없음`} </p>
          )}
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
