window.addEventListener("load", (e) => {
  console.log("hello from list populate project script");
});

const getCompletedTasksButton = async () => {
  return document.getElementById(`completed__tasks`);
};

const getInProgressTasksButton = async () => {
  return document.getElementById("in__progress__tasks");
};

//call this function and set it to a variable and it will get you the current
//projectId no matter where you are.
const getCurrentProjectId = () => {
  return document.querySelector(".project__header__unhidden").id.split("__")[2];
};

const getAllTasksByProjectId = async (projectId) => {
  const tasks = await fetch(`/api/projects/${projectId}/tasks`, {
    method: "get",
  });
  const taskDetails = await tasks.json();
  return taskDetails.tasksForProject;
};

const projects = document.querySelectorAll(".project__list__name");

const hiddenForm = document.querySelectorAll(".hidden__project__edit__form");

export const projectLinkPopulate = async (e) => {
  const completedButton = await getCompletedTasksButton();
  const inProgressButton = await getInProgressTasksButton();

  const projectId = e.target.id.split("__")[2];

  const activeProjectLink = document.querySelector(".project__link__active");
  const previousCompletedHiddenActive = document.querySelectorAll(
    ".completed__hidden__active"
  );
  const previousInCompleteHiddenActive = document.querySelectorAll(
    ".incomplete__hidden__active"
  );
  if (activeProjectLink) {
    const currentActiveProjectId = activeProjectLink.id.split("__")[2];

    if (currentActiveProjectId === projectId) return;
    else {
      activeProjectLink.classList.toggle("project__link__active");
    }
  }
  completedButton.addEventListener("click", showCompleted);
  inProgressButton.removeEventListener("click", showInProgress);

  if (previousInCompleteHiddenActive.length) {
    for (let i = 0; i < previousInCompleteHiddenActive.length; i++) {
      const previousIncomplete = previousInCompleteHiddenActive[i];
      // previousIncomplete.remove("incomplete__hidden__active");
      // previousIncomplete.classList.toggle("hidden");
    }
  }
  if (previousCompletedHiddenActive.length) {
    for (let i = 0; i < previousCompletedHiddenActive.length; i++) {
      const previousCompleted = previousCompletedHiddenActive[i];
      // previousHidden.classList.toggle("hidden");
      previousCompleted.classList.remove("completed__hidden__active");
      previousCompleted.classList.toggle("hidden");
    }
  }

  const currentTasksContainer = document.getElementById(
    `tasks__project__${projectId}`
  );

  const currentProjectAddTask = document.querySelector(
    `.add__task__div__${projectId}`
  );

  const projectHeader = document.getElementById(
    `project__header__${projectId}`
  );

  //populates nav bar with current project completed/in progress/ and due today
  const tasks = await fetch(`/api/projects/${projectId}/tasks`, {
    method: "GET",
  });

  const taskDetails = await tasks.json();
  const tasksArray = taskDetails.tasksForProject;
  let uncompletedTasks = 0;
  let completedTasks = 0;
  let dueToday = 0;
  let today = new Date();
  today = today.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "numeric",
  });
  for (let i = 0; i < tasksArray.length; i++) {
    let task = tasksArray[i];

    if (!task.completed) {
      const incompleteTask = document.getElementById(
        `task__container__${task.id}`
      );
      const incompleteTaskList = incompleteTask.classList;

      for (let i = 0; i < incompleteTaskList.length; i++) {
        const currentClass = incompleteTaskList[i];

        if (currentClass === "hidden") {
          incompleteTask.classList.toggle("hidden");
        }

        if (currentClass === "incomplete__hidden__active") {
          incompleteTask.classList.toggle("incomplete__hidden__active");
        }
      }

      uncompletedTasks++;
    }
    if (task.completed) {
      const completedTask = document.getElementById(
        `task__container__${task.id}`
      );

      completedTask.classList.toggle("hidden");
      completedTask.classList.toggle("completed__hidden__active");

      completedTasks++;
    }
    if (
      today.split("/")[0] === task.dueDate.split("-")[1] &&
      today.split("/")[1] === task.dueDate.split("-")[2].split("T")[0]
    ) {
      dueToday++;
    }
  }
  const uncompletedTasksInNavBar =
    document.getElementById(`in__progress__tasks`);
  uncompletedTasksInNavBar.innerText = `${uncompletedTasks} In Progress`;

  const completedTasksInNavBar = document.getElementById(`completed__tasks`);
  completedTasksInNavBar.innerText = `${completedTasks} Completed`;

  const dueTodayTasksInNavBar = document.getElementById("due__today__tasks");
  dueTodayTasksInNavBar.innerText = `${dueToday} Due Today`;

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
      projectId !==
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
    if (projectId !== allOpenTaskDetails[0].classList[0].split("__")[2]) {
      if (allOpenTaskDetails.length) {
        for (let i = 0; i < allOpenTaskDetails.length; i++) {
          const currentOpenTask = allOpenTaskDetails[i];
          currentOpenTask.classList.toggle("hidden");
          currentOpenTask.classList.remove("project__task__details__unhidden");
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
    if (projectId !== activeHiddenForm.id.split("__")[2]) {
      activeHiddenForm.parentNode.classList.toggle("hidden");
      activeHiddenForm.classList.remove("hidden__form__active");
    }
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

  e.target.classList.toggle("project__link__active");
};

for (let i = 0; i < projects.length; i++) {
  //each project link in the project list
  const currentProjectLink = projects[i];

  currentProjectLink.addEventListener("click", projectLinkPopulate);
}

const inProgressTasksInNavBar = await getInProgressTasksButton();
const completedTasksInNavBar = await getCompletedTasksButton();

export const showCompleted = async (e) => {
  const projectId = getCurrentProjectId();

  const completedActive = document.getElementsByClassName(
    "show__completed__active"
  );

  const tasksArray = await getAllTasksByProjectId(projectId);

  for (let i = 0; i < tasksArray.length; i++) {
    const task = tasksArray[i];
    if (!task.completed) {
      const incompleteTask = document.getElementById(
        `task__container__${task.id}`
      );
      incompleteTask.classList.toggle("hidden");
      incompleteTask.classList.toggle("incomplete__hidden__active");
    }

    if (task.completed) {
      const completedTask = document.getElementById(
        `task__container__${task.id}`
      );
      completedTask.classList.toggle("hidden");
      completedTask.classList.toggle("completed__hidden__active");
      // setCompletedActive.classList.toggle("show__completed__active");
    }
  }

  const completedTasksButton = await getCompletedTasksButton();
  completedTasksButton.removeEventListener("click", showCompleted);

  const inProgressTasksButton = await getInProgressTasksButton();
  inProgressTasksButton.addEventListener("click", showInProgress);

  // setCompletedActive.classList.toggle("in__progress__active");
};

export const showInProgress = async (e) => {
  const projectId = getCurrentProjectId();
  const inProgressActive = document.getElementsByClassName(
    "in__progress__active"
  );
  if (inProgressActive[0]) return;

  const tasksArray = await getAllTasksByProjectId(projectId);

  for (let i = 0; i < tasksArray.length; i++) {
    const task = tasksArray[i];
    if (!task.completed) {
      const incompleteTask = document.getElementById(
        `task__container__${task.id}`
      );
      incompleteTask.classList.toggle("hidden");
      incompleteTask.classList.toggle("incomplete__hidden__active");
    }

    if (task.completed) {
      const completedTask = document.getElementById(
        `task__container__${task.id}`
      );
      completedTask.classList.toggle("hidden");
      completedTask.classList.toggle("completed__hidden__active");
    }
  }

  const setCompletedInActive = document.getElementById(
    `tasks__project__${projectId}`
  );
  setCompletedInActive.classList.toggle("show__completed__active");

  //adds event listener back on completed button now that in progress is active
  const completedTasksButton = await getCompletedTasksButton();
  completedTasksButton.addEventListener("click", showCompleted);

  //removes event listener on inprogress link to alleviate unwanted 'hidden' toggles
  const inProgressTasksButton = await getInProgressTasksButton();
  inProgressTasksButton.removeEventListener("click", showInProgress);

  // setCompletedInActive.classList.toggle("in__progress__active");
};

inProgressTasksInNavBar.addEventListener("click", showInProgress);
completedTasksInNavBar.addEventListener("click", showCompleted);

//=============================================================================================================
//refactor to exported click even helper function
