window.addEventListener("load", (e) => {
  console.log("hello from task details script");
});

const taskDetailsButtons = document.querySelectorAll(".task__details__button");

for (let i = 0; i < taskDetailsButtons.length; i++) {
  const detailsButton = taskDetailsButtons[i];
  const taskId = detailsButton.id.split("__")[2];
  const taskDetails = document.getElementById(
    `project__task__details__${taskId}`
  );
  const taskDetailsEvent = async (e) => {
    taskDetails.classList.toggle("hidden");
    taskDetails.classList.remove("project__task__details__hidden");
    taskDetails.classList.add("project__task__details__unhidden");
  };
  detailsButton.addEventListener("click", taskDetailsEvent);
}
