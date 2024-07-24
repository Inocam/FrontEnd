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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Lastweek() {
  const [chatData, setChatData] = useState([
    { x: "kvo", y: "92" },
    { x: "qbp", y: "65" },
    { x: "lno", y: "29" },
    { x: "mky", y: "39" },
    { x: "jgg", y: "38" },
    { x: "vwv", y: "65" },
    { x: "zfc", y: "39" },
    { x: "faa", y: "99" },
    { x: "sfn", y: "47" },
    { x: "zeq", y: "3" },
    { x: "qrq", y: "3" },
    { x: "jtj", y: "42" },
  ]);

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
        label: "채팅 건수",
        data: chatData.map((data) => data.y),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div style={{ height: "400px", width: "400px" }}>
      {chatData.length > 0 && <Line options={options} data={data} />}
    </div>
  );
}

export default Lastweek;
