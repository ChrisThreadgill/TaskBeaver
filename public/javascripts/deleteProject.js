window.addEventListener("load", (event) => {
  console.log("hello from deleteProject.js");
});

export const deleteProject = async (e) => {
  const projectId = e.target.id.split("__")[2];
  if (projectId) {
    const res = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.message) {
      const div = document.getElementById(`project-id-${projectId}`);
      div.remove();
    }
  }
};

const deleteButtons = document.querySelectorAll(".delete__Project");
for (let i = 0; i < deleteButtons.length; i++) {
  const deleteBtn = deleteButtons[i];
  deleteBtn.addEventListener("click", deleteProject);
}

const trashcans = document.querySelectorAll(".fa-trash-can");
for (let i = 0; i < trashcans.length; i++) {
  let trashcan = trashcans[i];
  trashcan.addEventListener("click", deleteProject);
}
