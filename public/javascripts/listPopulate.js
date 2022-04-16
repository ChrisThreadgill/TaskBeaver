window.addEventListener("load", (e) => {
  console.log("hello from list populate project script");
});

const projects = document.querySelectorAll(".project__link");

const hiddenForm = document.querySelectorAll(".hidden__project__edit__form");

for (let i = 0; i < projects.length; i++) {
  //each project link in the project list
  const currentProjectLink = projects[i];

  const projectId = currentProjectLink.id.split("__")[3];

  const currentProjectAddTask = document.querySelector(
    `.add__task__div__${projectId}`
  );

  const projectHeader = document.getElementById(
    `project__header__${projectId}`
  );

  const currentTasksContainer = document.getElementById(
    `tasks__project__${projectId}`
  );

  currentProjectLink.addEventListener("click", async (e) => {
    e.preventDefault();
    const currentTargetId = e.target.id.split("__")[2];

    const allOpenEditTaskForms = document.querySelectorAll(
      `.edit__task__unhidden`
    );
    const allOpenTaskDetails = document.querySelectorAll(
      `.project__task__details__unhidden`
    );

    const unHiddenTaskContainer = document.querySelector(
      ".task__container__unhidden"
    );

    const unhiddenHeader = document.querySelector(".project__header__unhidden");

    const activeHiddenForm = document.querySelector(".hidden__form__active");

    const activeTaskAddForm = document.getElementById("add__task__unhidden");

    if (allOpenEditTaskForms[0]) {
      if (
        currentTargetId !==
        allOpenEditTaskForms[0].parentNode.classList[0].split("__")[3]
      ) {
        if (allOpenEditTaskForms.length) {
          for (let i = 0; i < allOpenEditTaskForms.length; i++) {
            const currentOpenEditForm = allOpenEditTaskForms[i];
            currentOpenEditForm.classList.toggle("hidden");
            currentOpenEditForm.classList.remove("edit__task__unhidden");
            currentOpenEditForm.classList.add("edit__task__hidden");
          }
        }
      }
    }
    if (allOpenTaskDetails[0]) {
      if (
        currentTargetId !== allOpenTaskDetails[0].classList[0].split("__")[2]
      ) {
        if (allOpenTaskDetails.length) {
          for (let i = 0; i < allOpenTaskDetails.length; i++) {
            const currentOpenTask = allOpenTaskDetails[i];
            currentOpenTask.classList.toggle("hidden");
            currentOpenTask.classList.remove(
              "project__task__details__unhidden"
            );
            currentOpenTask.classList.add("project__task__details__hidden");
          }
        }
      }
    }

    if (unHiddenTaskContainer) {
      unHiddenTaskContainer.classList.remove("task__container__unhidden");
      unHiddenTaskContainer.classList.add("task__container__hidden");
      unHiddenTaskContainer.classList.toggle("hidden");
    }

    if (activeTaskAddForm) {
      activeTaskAddForm.classList.toggle("hidden");
      activeTaskAddForm.removeAttribute("id");
    }

    //checking for an active hidden project edit form
    if (activeHiddenForm) {
      activeHiddenForm.parentNode.classList.toggle("hidden");
      activeHiddenForm.classList.remove("hidden__form__active");
    }

    //checking for an unhidden project header
    if (unhiddenHeader) {
      unhiddenHeader.removeAttribute("class");
      unhiddenHeader.setAttribute("class", "hidden");
    }

    currentTasksContainer.classList.add("task__container__unhidden");
    currentTasksContainer.classList.toggle("hidden");

    currentProjectAddTask.classList.toggle("hidden");
    currentProjectAddTask.setAttribute("id", "add__task__unhidden");

    projectHeader.removeAttribute("class");
    projectHeader.setAttribute("class", "project__header__unhidden");
  });
}
