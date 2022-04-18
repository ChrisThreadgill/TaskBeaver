window.addEventListener("load", (e) => {
  console.log("hello from task edit script");
});
const dateView = (date) => {
  const [year, month, day] = date.split("-");
  return month + "/" + day + "/" + year;
};
const contentTypeJson = { "Content-type": "application/json" };

const taskEditButtons = document.querySelectorAll(".task__edit__button");

for (let i = 0; i < taskEditButtons.length; i++) {
  const currentTaskEditButton = taskEditButtons[i];
  const currentTaskId = currentTaskEditButton.id.split("__")[2];

  currentTaskEditButton.addEventListener("click", async (e) => {
    const currentHiddenEditForm = document.getElementById(`hidden__task__edit__${currentTaskId}`);
    const currentTaskInputs = document.getElementsByClassName(`hidden__task__input__${currentTaskId}`);
    const taskResponse = await fetch(`/api/tasks/${currentTaskId}`, {
      method: "get",
      headers: contentTypeJson,
    });
    const taskDetails = await taskResponse.json();

    let { taskTitle, description, completed, dueDate, tag } = taskDetails.taskDetails;
    for (let i = 0; i < currentTaskInputs.length; i++) {
      const taskInput = currentTaskInputs[i];
      if (taskInput.name === "taskTitle") {
        taskInput.value = taskTitle;
      }
      if (taskInput.name === "description") {
        taskInput.value = description;
      }
      if (taskInput.name === "dueDate") {
        taskInput.value = dueDate.slice(0, 10);
      }
      if (taskInput.name === "tag") {
        taskInput.value = tag;
      }
    }

    currentHiddenEditForm.classList.toggle("hidden");
    currentHiddenEditForm.classList.toggle("edit__task__unhidden");
  });
  const currentTaskSubmitButton = document.getElementById(`edit__task__submit__${currentTaskId}`);
  currentTaskSubmitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const currentTaskInputs = document.getElementsByClassName(`hidden__task__input__${currentTaskId}`);
    const currentHiddenEditForm = document.getElementById(`hidden__task__edit__${currentTaskId}`);
    let taskTitle;
    let description;
    let dueDate;
    let tag;

    for (let i = 0; i < currentTaskInputs.length; i++) {
      const taskInput = currentTaskInputs[i];
      if (taskInput.name === "taskTitle") {
        taskTitle = taskInput.value;
      }
      if (taskInput.name === "description") {
        description = taskInput.value;
      }
      if (taskInput.name === "dueDate") {
        dueDate = taskInput.value;
      }
      if (taskInput.name === "tag") {
        tag = taskInput.value;
      }
    }

    let _csrf = document.getElementById(`hidden__task__edit__${currentTaskId}`).firstChild.value;
    const options = { taskTitle, description, dueDate, tag, _csrf };
    const body = JSON.stringify(options);
    const taskEdit = await fetch(`/api/tasks/${currentTaskId}`, {
      method: "put",
      body,
      headers: contentTypeJson,
    });

    const taskTitleDiv = document.querySelector(`.task__title__${currentTaskId}`);
    taskTitleDiv.innerText = taskTitle;

    const taskTag = document.getElementById(`task__tag__${currentTaskId}`);
    console.log(taskTag);
    taskTag.removeAttribute("class");
    taskTag.innerHTML = `<span class="badge bg__${tag}" id="task__tag__${currentTaskId}">${tag}</span>`;
    const taskDescription = document.getElementById(`task__description__${currentTaskId}`);
    taskDescription.innerText = `Description: ${description}`;
    const taskDueDate = document.getElementById(`task__dueDate__${currentTaskId}`);
    taskDueDate.innerText = `Due Date: ${new Date(dueDate).toDateString()}`;
    currentHiddenEditForm.classList.toggle("hidden");
    currentHiddenEditForm.classList.toggle("edit__task__unhidden");
  });
}
