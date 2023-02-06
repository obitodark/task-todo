const task_chartjs = document.querySelector("#task-chartjs").getContext("2d");
const selectChart = document.querySelector("#select-chart");

const createCharjs = (type = "doughnut") => {
  return new Chart(task_chartjs, {
    type,
    data: {
      labels: ["TODO", "DONE", "DELETE"],
      datasets: [
        {
          label: "Estado de tarea",
          backgroundColor: ["#4fdfa4", "#1d7fee", "#e94949"],
          borderColor: ["#1D2AEC "],
        },
      ],
    },
  });
};
const getTaskCount = () => {
  const status = {};
  arrayTask.forEach((statu) => {
    status[statu.status] = !status[statu.status] ? 1 : status[statu.status] + 1;
  });
  console.log(status);
  return status;
};
let myChart = createCharjs();
let dato = getTaskCount();

selectChart.onchange = (e) => {
  myChart.destroy();
  myChart = createCharjs(e.target.value);
  updateCharjs();
};

const updateCharjs = () => {
  ["pendiente", "complete", "delete"].forEach((data, index) => {
    myChart.data.datasets[0].data[index] = getTaskCount()[data];
  });
  myChart.update();
};
window.onload = updateCharjs();
