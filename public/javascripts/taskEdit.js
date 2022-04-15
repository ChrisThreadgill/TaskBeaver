window.addEventListener("load", (e) => {
  console.log("hello from task edit script");
});

const taskEditButtons = document.querySelectorAll(".task__edit__button");

for (let i = 0; i < taskEditButtons.length; i++) {
  const currentTaskEditButton = taskEditButtons[i];
  const currentTaskId = currentTaskEditButton.id.split("__")[2];

  currentTaskEditButton.addEventListener("click", async (e) => {
    const currentHiddenEditForm = document.getElementById(
      `hidden__task__edit__${currentTaskId}`
    );
    currentHiddenEditForm.classList.toggle("hidden");
    currentHiddenEditForm.classList.toggle("edit__task__unhidden");
  });
}
