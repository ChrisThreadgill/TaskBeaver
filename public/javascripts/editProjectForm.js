window.addEventListener("load", (e) => {
  console.log("hello from edit project script");
});
const contentTypeJson = { "Content-type": "application/json" };

const hiddenForm = document.querySelectorAll(".hidden__edit__form");
const formInputs = document.querySelectorAll(".test");
const editForm = document.getElementById("edit__form");
const submitEdit = document.getElementById("edit__project__button");

const inputFields = Array.from(formInputs);
const hiddenForms = Array.from(hiddenForm);

editForm.addEventListener("click", async (e) => {
  //grabs the project ID from the id of the element
  const projectId = hiddenForms[0].id.split("__")[2];
  console.log(projectId);

  const currentProject = await fetch(`api/projects/${projectId}`, {
    method: "GET",
    headers: contentTypeJson,
  });

  const projectDetails = await currentProject.json();

  let { projectName, description, dueDate, url, projectType } =
    projectDetails.projectDetails;

  for (let i = 0; i < inputFields.length; i++) {
    let currentField = inputFields[i];
    if (currentField.id === "projectName") {
      currentField.value = projectName;
    }
    if (currentField.name === "description") currentField.value = description;
    if (currentField.name === "dueDate")
      currentField.value = dueDate.slice(0, 10);
    if (currentField.name === "url") currentField.value = url;
    if (currentField.name === "projectType")
      currentField.value = projectType.toLowerCase();
  }

  hiddenForms[0].classList.toggle("hidden");

  editForm.setAttribute("class", "visible");
  submitEdit.addEventListener("click", async (e) => {
    e.preventDefault();
    for (let i = 0; i < inputFields.length; i++) {
      let currentField = inputFields[i];
      if (currentField.id === "projectName") {
        projectName = currentField.value;
      }
      if (currentField.name === "description") description = currentField.value;
      if (currentField.name === "dueDate") dueDate = currentField.value;
      if (currentField.name === "url") url = currentField.value;
      if (currentField.name === "projectType") projectType = currentField.value;
    }
    // console.log("working");
    const options = { projectName, description, dueDate, url, projectType };
    const body = JSON.stringify(options);
    console.log(body);
    const projectEdit = await fetch(`/api/projects/${projectId}`, {
      method: "PUT",
      body,
      headers: contentTypeJson,
    });
  });
});
