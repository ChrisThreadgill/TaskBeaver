window.addEventListener("load", (event) => {
  console.log("hello from deleteTask.js");
});

const deleteButtons = document.querySelectorAll(".delete__task");
console.log(deleteButtons);

async function deleteTask(e) {
  e.stopPropagation();
  const taskId = e.target.id.split("__")[2];

  if (taskId) {
    const res = await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.message) {
      const div = document.getElementById(`task-container-${task.id}`);
      div.remove();
    }
  }
}

for (let i = 0; i < deleteButtons.length; i++) {
  const deleteButton = deleteButtons[i];
  deleteButton.addEventListener("click", deleteTask);
}
