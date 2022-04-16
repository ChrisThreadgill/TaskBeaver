window.addEventListener("load", (e) => {
  console.log("hello from edit project script");
});

const editProjectPencils = document.querySelectorAll(".project__edit__button");

const submitEditButtons = document.querySelectorAll(".edit__project__button");
export const editPencil = async (e) => {
  // e.preventDefault();
  // e.stopPropagation();
  const projectId = e.target.id.split("__")[2];
  console.log(e.target.parentNode);

  const hiddenEditForm = document.getElementById(
    `hidden__edit__form__div__${projectId}`
  );
  const projectEditInputs = document.querySelectorAll(
    `.hidden__form__input__${projectId}`
  );

  const currentProject = await fetch(`api/projects/${projectId}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });

  const projectDetails = await currentProject.json();

  let { projectName, description, dueDate, url, projectType } =
    projectDetails.projectDetails;

  for (let i = 0; i < projectEditInputs.length; i++) {
    let currentInput = projectEditInputs[i];

    if (currentInput.id === "projectName") {
      currentInput.value = projectName;
    }

    if (currentInput.name === "description") currentInput.value = description;

    if (currentInput.name === "dueDate")
      currentInput.value = dueDate.slice(0, 10);

    if (currentInput.name === "url") currentInput.value = url;

    if (currentInput.name === "projectType")
      currentInput.value = projectType.toLowerCase();
  }

  hiddenEditForm.classList.toggle("hidden");
  hiddenEditForm.setAttribute("id", "hidden__form__active");
};

export const projectEditSubmit = async (e) => {
  e.preventDefault();
  const projectId = e.project.id.split("__")[2];

  const projectHeaderDisplay = document.getElementById(
    `project__header__display__${projectId}`
  );

  const projectLinkName = document.getElementById(
    `project__link__${projectId}`
  );

  const projectEditInputs = document.querySelectorAll(
    `.hidden__form__input__${projectId}`
  );

  const hiddenEditForm = document.getElementById(
    `hidden__edit__form__div__${projectId}`
  );

  let projectName;
  let description;
  let dueDate;
  let url;
  let projectType;

  for (let i = 0; i < projectEditInputs.length; i++) {
    let currentField = projectEditInputs[i];
    if (currentField.id === "projectName") {
      projectName = currentField.value;
    }
    if (currentField.name === "description") description = currentField.value;
    if (currentField.name === "dueDate") dueDate = currentField.value;
    if (currentField.name === "url") url = currentField.value;
    if (currentField.name === "projectType") projectType = currentField.value;
  }

  const options = { projectName, description, dueDate, url, projectType };
  const body = JSON.stringify(options);

  const projectEdit = await fetch(`/api/projects/${projectId}`, {
    method: "PUT",
    body,
    headers: { "Content-type": "application/json" },
  });

  projectLinkName.innerText = projectName;
  projectHeaderDisplay.innerText = projectName;

  hiddenEditForm.removeAttribute("id");
  hiddenEditForm.classList.toggle("hidden");
};

for (let i = 0; i < editProjectPencils.length; i++) {
  const currentEditPencil = editProjectPencils[i];
  console.log(currentEditPencil.firstChild);

  currentEditPencil.addEventListener("click", editPencil);
}

for (let i = 0; i < submitEditButtons; i++) {
  const currentSubmitButton = submitEditButtons[i];

  currentSubmitButton.addEventListener("click", projectEditSubmit);
}
