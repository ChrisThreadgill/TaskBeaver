import { taskDeletes } from "./deleteTask.js";

window.addEventListener("load", (event) => {
  console.log("hello from addTask!");
});

const contentTypeJson = { "Content-Type": "application/json" };

//addListener for add button

const addTaskButtons = document.querySelectorAll(".confirm__task__add");

//   console.log(addTaskButtons)

// grab all form inputs.

const addTask = async (e) => {
  e.preventDefault();

  const projectId = e.target.id.split(`__`)[3];

  console.log(projectId);

  const taskTitle = document.getElementById(`task__title__${projectId}`).value;
  const description = document.getElementById(
    `description__${projectId}`
  ).value;
  const dueDate = document.getElementById(`due__date__${projectId}`).value;
  const tag = document.getElementById(`task__select__${projectId}`).value;

  // console.log(taskTitle)
  // console.log(description.value)
  // console.log(dueDate.value)
  // console.log(options.value)

  const info = {
    taskTitle,
    description,
    dueDate,
    tag,
    projectId,
  };

  const newTask = await fetch("/api/tasks", {
    method: "POST",
    headers: contentTypeJson,
    body: JSON.stringify(info),
  });

  const res = await newTask.json();

  // console.log(res)

  const { id } = res.task;

  // console.log(id)

  const taskDiv = document.createElement("div");
  taskDiv.setAttribute("class", "project__task__container");
  taskDiv.setAttribute("id", `task__container__${id}`);
  //add class to buttons.

  const projectBoard = document.querySelector(".project__board");

  //TODO UPDATE THE HTML UPON CREATION IN EVENT LISTENER TO MATCH PUG NAMING CONVENTIONS
  taskDiv.innerHTML = `
   <div class="task__buttons">
        <button class='task__edit__button' id='task__edit__${id}'><i class="fa-solid fa-pen-to-square"></i></button>
        <button class='task__delete__button' id='task__delete__${id}'><i class="fa-solid fa-trash-can task__trash__icon" id='trash__task__${id}'></i></button>
        <button class='task__details__button' id='task__details__${id}'><i class="fa-solid fa-angle-down"></i></button>
    </div>
    <div class="task__title" id='task__title__${id}'>'${taskTitle}'</div>
    <div class="task__tag">
        <span class="badge bg-urgent" id='task__tag__${id}'>'${tag}'</span>
    </div>
    <div class="project__task">
        <div class="task__description" id='task__description__${id}'>'${description}'</div>
        <div class="task__dueDate" id='task__dueDate__${id}'>'${dueDate}'</div>
    </div>
    <div class="hidden__task__edit__${id}">
        <form class="hidden__task__edit__form" action='/api/tasks/${id}' method="PUT">
            <input type="hidden" name="_csrf" value=csrfToken>
            <div>
                <label for='taskTitle'>Task Title:</label>
                <input class= 'hidden__task__input__${id}' type="text " name="taskTitle " id="taskTitle " value=" " ></div>
            <div>
                <label for="description ">Description:</label>
                <input class='hidden__task__input__${id}' type="text " name="description " id="description " value=" " ></div>
            <div>
                <label for="dueDate ">Due Date:</label>
                <input class='hidden__task__input__${id}' type="date " name="dueDate " id="dueDate " value=" " ></div>
                <select class="hidden__task__input__${id} " name="tag ">
                    <option value="noDamGiven ">NoDamGiven</option>
                    <option value="urgent ">Urgent</option>
                    <option value="important ">Important</option>
                    <option value="notAtIssue ">Not An Issue</option>
                </select>
            <button
                class="edit__task__button " type="submit ">Edit</button>
                <button type="click " id="cancel__edit__task__button ">Cancel</button>
            </form>
    </div>
`;
  projectBoard.appendChild(taskDiv);
  const trashCansIcons = document.querySelectorAll(".task__trash__icon");

  const taskTrashButtons = document.querySelectorAll(".task__delete__button");

  for (let icon of trashCansIcons) {
    // console.log(icon)
    icon.addEventListener("click", taskDeletes);
  }

  for (let button of taskTrashButtons) {
    // console.log(button)
    button.addEventListener("click", taskDeletes);
  }
};

for (let i = 0; i < addTaskButtons.length; i++) {
  let button = addTaskButtons[i];

  button.addEventListener("click", addTask);
}
