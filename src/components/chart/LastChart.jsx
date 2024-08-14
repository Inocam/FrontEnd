import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useGetTaskcount } from "../../api/task/useTask";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Lastweek(TeamId) {
  const chatData = [
    { x: "1월", y: 0 },
    { x: "2월", y: 0 },
    { x: "3월", y: 0 },
    { x: "4월", y: 0 },
    { x: "5월", y: 0 },
    { x: "6월", y: 0 },
    { x: "7월", y: 0 },
    { x: "8월", y: 0 },
    { x: "9월", y: 0 },
    { x: "10월", y: 0 },
    { x: "11월", y: 0 },
    { x: "12월", y: 0 },
  ];
  const currentYear = new Date().getFullYear();

  const subdate = {
    year: currentYear,
    TeamId: TeamId.TeamId,
  };
  const { Taskcount, isLoading, isError } = useGetTaskcount(subdate);
  if (Object.keys(Taskcount).length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "250px",
        }}
      >
        데이터 없음
      </div>
    );
  }

  for (const date in Taskcount) {
    const month = date.split("-")[1];
    chatData[+month-1]['y']+=1
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0
        },
        grid: {
          display: false,
        },
      },
    },
  };

  let labels = [];
  if (chatData.length > 0) {
    labels = chatData.map((data) => data.x);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "일정 갯수",
        data: chatData.map((data) => data.y),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  if(isLoading){
    return <p>로딩중...</p>
  }

  return (
    <div>{chatData.length > 0 && <Line options={options} data={data} />}</div>
  );
}

export default Lastweek;