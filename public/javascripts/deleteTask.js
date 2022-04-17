window.addEventListener("load", (event) => {
  console.log("hello from deleteTask");
});

const contentTypeJson = { "Content-Type": "application/json" };

const taskDelete = document.querySelectorAll(".task__delete__button");

const trashCansTask = document.querySelectorAll(".task__trash__icon");

export const taskDeletes = async (e) => {
  e.stopPropagation();

  const taskId = e.target.id.split("__")[2];

  const taskDelete = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });

  const data = await taskDelete.json();

  if (data.message) {
    const currentTaskDiv = document.getElementById(
      `task__container__${taskId}`
    );
    currentTaskDiv.classList.add("text__delete__animation");

    setTimeout(() => {
      currentTaskDiv.remove();
    }, 2000);
  }
};

for (let i = 0; i < taskDelete.length; i++) {
  let taskButton = taskDelete[i];

  taskButton.addEventListener("click", taskDeletes);
}

for (let i = 0; i < trashCansTask.length; i++) {
  let taskTrashIcon = trashCansTask[i];
  taskTrashIcon.addEventListener("click", taskDeletes);
}
