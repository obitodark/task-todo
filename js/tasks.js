const __ = (id) => {
  return document.querySelector(id);
};

const text_input = __("#inputadd-text");
const btnAdd = __("#btn-add");
const box_container = __(".box-container");
let arrayTask = JSON.parse(localStorage.getItem("task")) || [];
let id_container = null;

const addrender = (taks) => {
  box_container.innerHTML += `
        <div  id="container_${taks.id}" class='d-flex row  align-item-start'  >
            <div id="containerItemTask_${
              taks.id
            }" class="d-flex col-12 mt-2 p-3 item-task" 
      
          >
              
            <div class="form-check">
                <input id='check_${taks.id}' 
                ${taks.status === "complete" ? "checked" : ""}
                
                ${
                  taks.status === "complete" || taks.status === "delete"
                    ? "disabled"
                    : ""
                }
                
   onchange='completeTask(this)' class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                </label>
            </div>

            <div class="col-10">
                  <p class="text-task">${taks.text}</p>
                    <span class="${statusTask(taks.status)}">
                    status ${taks.status}..
                   </span>
                   <br/>
                   <span class="text_date">
                     Creacion -> ${taks.created_at}
                    / Cerrado ->${taks.task_closing}
                   </span>
  
            </div>

            <div  class="col-2 justify-content-center">
                <button class="btn-action ${disabledButton(
                  taks.status,
                  "edit"
                )}"     onclick="editTask(this)" ><i class="bi bi-pen"></i></button>
                <button class="btn-action ${disabledButton(
                  taks.status,
                  "delete"
                )} "   
              onclick="deleteTask(this)"><i class="bi bi-x-square"></i></button>
            </div>
            </div>
         
         </div>
    `;
};

const disabledButton = (status, style) => {
  return status === "complete" || status === "delete"
    ? "disabledbtn"
    : `btn-${style}`;
};

const taskChange = (container) => {
  container.innerHTML += `
          
        <div  class="d-flex mt-2 p-2 item-task">

        <div class="col-8">
            <input
            id='text_replace'
            with='300px'
            id="inputadd-text"
            type="text"
            class="input-text mx-1"
            placeholder=""
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"

            />
        </div>

        <div  class="col-4 justify-content-center">
            <button class="btn-action btn-success " onclick="btn_success()">aceptar</button>
            <button  class="btn-action btn-cancel" onclick="render()">cancelar</button>
        </div>
      </div>
    `;
};

const changeBackground = (status) => {
  switch (status) {
    case "pendiente":
      return "#252526";
      break;
    case "delete":
      return "#6D4755";
      break;
    case "complete":
      return "#47476D";
      break;
  }
};

const statusTask = (status) => {
  switch (status) {
    case "pendiente":
      return "text-status";
      break;
    case "delete":
      return "text-status-delete";
      break;
    case "complete":
      return "text-status-complete";
      break;
  }
};

const filter = () => {
  let radioButtonFilter = document.querySelector(
    'input[name="status"]:checked'
  ).value;
  if (radioButtonFilter === "all") return render();
  if (radioButtonFilter) {
    renderFilter(radioButtonFilter);
  }
};
const restartList = () => {
  localStorage.removeItem("task");
  window.location.reload();
};

const renderFilter = (status) => {
  const filter = arrayTask.filter((task) => {
    return task.status === status;
  });

  render(filter);
};

const render = (data = arrayTask) => {
  box_container.innerHTML = "";
  data.forEach((data) => {
    addrender(data);
  });
};
window.onload = render();
function storeTask(text) {
  const today = new Date();
  const task = {
    id: arrayTask.length + 1,
    text,
    status: "pendiente",
    created_at: today.toLocaleString(),
    task_closing: "unknown",
    toHtml: function () {
      return toHtml(this);
    },
  };

  arrayTask.push(task);

  return task;
}

const btn_edit = __(".btn-edit");
// const btn_cancel = __(".btn-cancel");
let containerItemTask = null;

let containerItem = null;

const btn_success = () => {
  const text_replace = __("#text_replace");
  const text = text_replace.value;

  const id = containerItem.split("_")[1];
  const ids = arrayTask.findIndex((task) => task.id === Number(id));
  arrayTask[ids].text = text;
  console.log(arrayTask);
  localStorage.setItem("task", JSON.stringify(arrayTask));
  filter();
};

function editTask(element) {
  const padre = element.parentNode.parentNode.parentNode.id;
  containerItem = element.parentNode.parentNode.id;

  const container = __(`#${padre}`);
  containerItemTask = __(`#${containerItem}`);

  container.innerHTML = "";
  containerItemTask.classList.add("active");
  taskChange(container);

  // alert(container);
}
function completeTask(element) {
  changeStatus(element, "complete");
}

function deleteTask(element) {
  changeStatus(element, "delete");
}
btnAdd.onclick = () => {
  storeTask(text_input.value);
  localStorage.setItem("task", JSON.stringify(arrayTask));
  text_input.value = "";
  render();
  updateCharjs();
};

const changeStatus = (element, status) => {
  const today = new Date();
  containerItem = element.parentNode.parentNode.id;
  // const id = containerItem.split("_")[1];
  const id = arrayTask.findIndex(
    (task) => task.id === Number(containerItem.split("_")[1])
  );
  arrayTask[id].status = status;
  arrayTask[id].task_closing = today.toLocaleString();
  localStorage.setItem("task", JSON.stringify(arrayTask));
  filter();
  updateCharjs();
};
