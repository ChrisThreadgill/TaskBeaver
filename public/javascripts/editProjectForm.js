window.addEventListener("load", (e) => {
  console.log("hello from edit project script");
});
const contentTypeJson = { "Content-type": "application/json" };

// gives you all of the form fields with this class
const projectEditPencils = document.querySelectorAll(".project__edit__pencil");

const submitEditButtons = document.querySelectorAll(".edit__project__submit");

for (let i = 0; i < projectEditPencils.length; i++) {
  const currentProjectEditPen = projectEditPencils[i];

  currentProjectEditPen.addEventListener("click", async (e) => {
    const projectId = currentProjectEditPen.id.split("__")[2];

    const currentInputs = document.getElementsByClassName(`hidden__form__input__${projectId}`);

    const currentProject = await fetch(`api/projects/${projectId}`, {
      method: "GET",
      headers: contentTypeJson,
    });

    const projectDetails = await currentProject.json();

    let { projectName, description, dueDate, url, projectType } = projectDetails.projectDetails;

    for (let i = 0; i < currentInputs.length; i++) {
      let currentField = currentInputs[i];

      if (currentField.id === "projectName") {
        currentField.value = projectName;
      }

      if (currentField.name === "description") currentField.value = description;

      if (currentField.name === "dueDate") currentField.value = dueDate.slice(0, 10);

      if (currentField.name === "url") currentField.value = url;

      if (currentField.name === "projectType") currentField.value = projectType;
    }
    const currentHiddenForm = document.getElementById(`hidden__edit__form__div__${projectId}`);
    const activeForm = document.getElementById(`hidden__project__edit__${projectId}`);

    currentHiddenForm.classList.toggle("hidden");

    activeForm.classList.toggle("hidden__form__active");
  });
}

for (let i = 0; i < submitEditButtons.length; i++) {
  const currentSubmitButton = submitEditButtons[i];

  currentSubmitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const projectId = e.target.id.split("__")[2];
    const projectHeaderDisplay = document.getElementById(`project__header__display__${projectId}`);
    const currentInputs = document.getElementsByClassName(`hidden__form__input__${projectId}`);
    const projectLinkName = document.getElementById(`project__link__${projectId}`);
    const projectLinkBadge = document.getElementById(`project__link__badge__${projectId}`);
    const emptyBadgeCheck = document.getElementById(`empty__span__badge__${projectId}`);
    const projectTypeDiv = document.querySelector(".project__type");
    const projectDueDate = document.querySelector(".project__dueDate");
    const projectTypeHTML = projectTypeDiv.firstChild;

    let projectName;
    let description;
    let dueDate;
    let url;
    let projectType;

    for (let i = 0; i < currentInputs.length; i++) {
      let currentField = currentInputs[i];
      if (currentField.id === "projectName") {
        projectName = currentField.value;
      }
      if (currentField.name === "description") description = currentField.value;
      if (currentField.name === "dueDate") dueDate = currentField.value;
      if (currentField.name === "url") url = currentField.value;
      if (currentField.name === "projectType") projectType = currentField.value;
    }

    const _csrf = document.getElementById("csurfId").value;

    const options = {
      projectName,
      description,
      dueDate,
      url,
      projectType,
      _csrf,
    };
    const body = JSON.stringify(options);
    const projectEdit = await fetch(`/api/projects/${projectId}`, {
      method: "PUT",
      body,
      headers: contentTypeJson,
    });

    projectLinkName.innerText = projectName;
    projectHeaderDisplay.innerText = projectName;
    if (projectLinkBadge) {
      projectLinkBadge.removeAttribute("class");
      projectLinkBadge.removeAttribute("id");
      projectLinkBadge.innerHTML = `<span class="badge bg__${projectType}" id="project__link__badge__${projectId}">${projectType}</span>`;
    }
    if (emptyBadgeCheck) {
      emptyBadgeCheck.innerHTML = `<span class="badge bg__${projectType}" id="project__type__${projectType}">${projectType}</span>`;
      const projectTypeDetails = document.getElementById(`project__type__${projectId}`);
      projectTypeDetails.removeAttribute("class");
      projectTypeDetails.removeAttribute("id");
      projectTypeDetails.firstChild.innerHTML = `<span class="badge bg__${projectType}" id="project__type__${projectType}">${projectType}</span>`;
    }
    projectTypeHTML.removeAttribute("class");
    projectTypeHTML.removeAttribute("id");
    projectTypeHTML.innerHTML = `<span class="badge bg__${projectType}" id="project__type__${projectType}">${projectType}</span>`;
    projectDueDate.innerText = `Due Date: ${new Date(dueDate).toDateString()}`;
    const currentHiddenForm = document.getElementById(`hidden__edit__form__div__${projectId}`);
    const activeForm = document.getElementById(`hidden__project__edit__${projectId}`);

    currentHiddenForm.classList.toggle("hidden");

    activeForm.classList.remove("hidden__form__active");
  });
}

// currentSubmitButton.addEventListener("click", async (e) => {
//   e.preventDefault();
//   e.stopPropagation();
//   const projectHeaderDisplay = document.getElementById(
//     `project__header__display__${projectId}`
//   );

//   for (let i = 0; i < currentInputs.length; i++) {
//     let currentField = currentInputs[i];
//     if (currentField.id === "projectName") {
//       projectName = currentField.value;
//     }
//     if (currentField.name === "description") description = currentField.value;
//     if (currentField.name === "dueDate") dueDate = currentField.value;
//     if (currentField.name === "url") url = currentField.value;
//     if (currentField.name === "projectType") projectType = currentField.value;
//   }

//   const options = { projectName, description, dueDate, url, projectType };
//   const body = JSON.stringify(options);
//   const projectEdit = await fetch(`/api/projects/${projectId}`, {
//     method: "PUT",
//     body,
//     headers: contentTypeJson,
//   });

//   const projectLinkName = document.getElementById(
//     `project__link__${projectId}`
//   );

//   projectLinkName.innerText = projectName;
//   projectHeaderDisplay.innerText = projectName;
//   console.log(currentHiddenForm, "please fucking work");

//   currentHiddenForm.removeAttribute("id");
//   currentHiddenForm.classList.toggle("hidden");
//   // currentHiddenForm.removeEventListener("click");
// });
