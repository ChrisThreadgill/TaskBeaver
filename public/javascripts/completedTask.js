window.addEventListener("load", (event) => {
  console.log("hello from complete Task!");
});
const contentTypeJson = { "Content-type": "application/json" };

const taskCheckboxes = document.querySelectorAll(".completed__check__box");

export const taskComplete = async (e) => {
  const taskId = e.target.id.split("__")[2];
  const currentProjectHeader = document.querySelector(".project__header__unhidden");
  const projectId = currentProjectHeader.id.split("__")[2];
  console.log(projectId);
  const currentTaskContainer = document.getElementById(`task__container__${taskId}`);
  let completed = true;

  const completedRes = await fetch(`/api/projects/${projectId}/tasks/completed`, {
    method: "GET",
    headers: contentTypeJson,
  });
  const currentCompletedTasks = await completedRes.json();
  let completedCount = currentCompletedTasks.tasksForProject.length;

  const incompleteRes = await fetch(`/api/projects/${projectId}/tasks/incomplete`, {
    method: "GET",
    headers: contentTypeJson,
  });
  const incompleteTasks = await incompleteRes.json();
  let incompleteCount = incompleteTasks.tasksForProject.length;
  console.log(incompleteCount);
  const inProgressNav = document.getElementById(`in__progress__tasks`);
  const completedNav = document.getElementById(`completed__tasks`);

  const taskComplete = await fetch(`/api/tasks/${taskId}`, {
    method: "GET",
    headers: contentTypeJson,
  });
  const taskDetails = await taskComplete.json();

  if (taskDetails.taskDetails.completed === true) {
    completed = false;
    incompleteCount++;
    completedCount--;
    inProgressNav.innerText = `${incompleteCount} In Progress`;
    completedNav.innerText = `${completedCount} Completed`;
    currentTaskContainer.classList.toggle("completed__hidden__active");
    currentTaskContainer.classList.toggle("incomplete__hidden__active");
  }
  if (taskDetails.taskDetails.completed === false) {
    completedCount++;
    incompleteCount--;
    completedNav.innerText = `${completedCount} Completed`;
    inProgressNav.innerText = `${incompleteCount} In Progress`;
    currentTaskContainer.classList.toggle("completed__hidden__active");
    currentTaskContainer.classList.toggle("incomplete__hidden__active");
  }
  const _csrf = document.getElementById("csurfId").value;

  const options = { completed, _csrf };
  const body = JSON.stringify(options);
  const completedUpdate = await fetch(`/api/tasks/${taskId}`, {
    method: "put",
    body,
    headers: contentTypeJson,
  });

  //hide the completed task
  const currentTaskDiv = document.getElementById(`task__container__${taskId}`);
  currentTaskDiv.classList.toggle("hidden");
};

for (let i = 0; i < taskCheckboxes.length; i++) {
  const currentTask = taskCheckboxes[i];
  currentTask.addEventListener("click", taskComplete);
}

// const dueTodayTasksInNavBar = document.getElementById("due__today__tasks");
// dueTodayTasksInNavBar.innerText = `${dueToday} Due Today`;
