window.addEventListener("load", (event) => {
  console.log("hello from complete Task!");
});
const contentTypeJson = { "Content-type": "application/json" };

const taskCheckboxes = document.querySelectorAll(".completed__check__box");

export const taskComplete = async (e) => {
  const taskId = e.target.id.split("__")[2];
  let completed = true;

  const taskComplete = await fetch(`/api/tasks/${taskId}`, {
    method: "GET",
    headers: contentTypeJson,
  });
  const taskDetails = await taskComplete.json();

  if (taskDetails.taskDetails.completed !== false) {
    completed = false;
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
  // console.log(currentTaskDiv);
  currentTaskDiv.classList.toggle("completed");
};

for (let i = 0; i < taskCheckboxes.length; i++) {
  const currentTask = taskCheckboxes[i];
  // console.log(currentTask);
  currentTask.addEventListener("click", taskComplete);
}
