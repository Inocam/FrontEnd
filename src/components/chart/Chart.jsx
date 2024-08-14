// import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
const DonutChart = (sdata) => {
  if (Object.keys(sdata.data).length === 0) {
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
  const data = {
    labels: ["todo", "ongoing", "delay", "done"],
    datasets: [
      {
        data: [
          sdata.data["todo"],
          sdata.data["ongoing"],
          sdata.data["delay"],
          sdata.data["done"],
        ],
        backgroundColor: [
          "rgba(100, 100, 100, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(100, 100, 100, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      labels: {
        generateLabels: (chart) => {
          const datasets = chart.data.datasets;
          return chart.data.labels.map((label, i) => {
            const meta = chart.getDatasetMeta(0);
            const style = meta.controller.getStyle(i);

            return {
              text: `${label.main} - ${label.sub}`,
              fillStyle: style.backgroundColor,
              strokeStyle: style.borderColor,
              lineWidth: style.borderWidth,
              hidden: isNaN(datasets[0].data[i]) || meta.data[i].hidden,
              index: i,
            };
          });
        },
      },
      title: {},
    },
    layout: {},
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
