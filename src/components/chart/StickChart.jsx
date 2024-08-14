// import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useGetTaskstatuscount } from "../../api/task/useTask";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: "none",
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
      grid: {
        display: false,
      },
    },
  },
};

const labels = ["todo", "ongoing", "delay", "done"];

const colors = [
  "rgba(100, 100, 100, 0.5)",
  "rgba(54, 162, 235, 0.5)",
  "rgba(255, 99, 132, 0.5)",
  "rgba(75, 192, 192, 0.5)",
];

export default function BarChart(TeamId) {
  const { TaskStatuscount, isLoading, isError } = useGetTaskstatuscount(TeamId);
  if (Object.keys(TaskStatuscount).length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          paddingTop: "120px",
        }}
      >
        이번달의 데이터 없음
      </div>
    );
  }
  const data = {
    labels,
    datasets: [
      {
        data: [
          TaskStatuscount["todo"],
          TaskStatuscount["ongoing"],
          TaskStatuscount["delay"],
          TaskStatuscount["done"],
        ],
        backgroundColor: colors,
      },
    ],
  };
  return (
    <div style={{ height: "270px", width: "100%" }}>
      <Bar options={options} data={data} />
    </div>
  );
}
