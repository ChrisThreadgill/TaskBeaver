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
    const projectHeader = document.getElementById(`project__header__${projectId}`);
    const projectTasks = document.getElementById(`tasks__project__${projectId}`);
    const addTaskDiv = document.querySelector(`.add__task__div__${projectId}`);
    const hiddenEditForm = document.getElementById(`hidden__edit__form__div__${projectId}`);
    const data = await res.json();
    if (data.message) {
      const div = document.getElementById(`project__link__div__${projectId}`);

      const currentProjectHeader = document.querySelector(".project__header__unhidden");

      if (currentProjectHeader) {
        currentProjectHeader;
        const currentProjectId = currentProjectHeader.id.split("__")[2];
        console.log(currentProjectId);
        if (currentProjectId === projectId) {
          const inProgressNav = document.getElementById(`in__progress__tasks`);
          const completedNav = document.getElementById(`completed__tasks`);
          inProgressNav.innerText = `0 In Progress`;
          completedNav.innerText = `0 Completed`;
        }
      }
      div.remove();
      projectHeader.remove();
      projectTasks.remove();
      addTaskDiv.remove();
      if (hiddenEditForm) {
        hiddenEditForm.remove();
      }
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
