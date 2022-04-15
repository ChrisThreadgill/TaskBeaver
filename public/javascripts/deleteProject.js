window.addEventListener("load", (event) => {
  console.log("hello from deleteProject.js");
});

export const deleteProject = async (e) => {
  e.stopPropagation();
  const projectId = e.target.id.split("__")[2];
  if (projectId) {
    const res = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.message) {
      const div = document.getElementById(`project__link__div__${projectId}`);
      console.log(div);
      div.remove();
    }
  }
};

const deleteButtons = document.querySelectorAll(".delete__project");
for (let i = 0; i < deleteButtons.length; i++) {
  const deleteBtn = deleteButtons[i];
  deleteBtn.addEventListener("click", deleteProject);
}

const trashcans = document.querySelectorAll(".project__trash__icon");
for (let i = 0; i < trashcans.length; i++) {
  let trashcan = trashcans[i];
  trashcan.addEventListener("click", deleteProject);
}
