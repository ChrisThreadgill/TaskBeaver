window.addEventListener("load", (e) => {
  console.log("hello from edit project script");
});
const contentTypeJson = { "Content-type": "application/json" };

const hiddenForm = document.querySelectorAll(".hidden__edit__form");
const formInputs = document.querySelectorAll(".test");
const editForms = document.querySelectorAll(".edit__form");
const submitEdits = document.querySelectorAll(".edit__project__button");

const inputFields = Array.from(formInputs);
const hiddenForms = Array.from(hiddenForm);
const editForm = Array.from(editForms);
const submitEdit = Array.from(submitEdits);
console.log(editForm);

for (let i = 0; i < editForm.length; i++) {
  // console.log(editForm[i]);
  const currentEdit = editForm[i];
  // console.log(currentEdit);
  currentEdit.addEventListener("click", async (e) => {
    //grabs the project ID from the id of the element
    /**                                   *    *      Look an alien!
     /**                                   \  /                             */
    const projectId = currentEdit.id.split("__")[2];
    const currentHiddenForm = hiddenForms[i];
    const activeHiddenForm = document.getElementById("hidden__form__active");
    console.log(activeHiddenForm);
    if (activeHiddenForm) {
      console.log("working");
      console.log(activeHiddenForm);
      activeHiddenForm.removeAttribute("id");
      activeHiddenForm.classList.toggle("hidden");
      return;
    } else {
      const currentInputs = document.getElementsByClassName(
        `hidden__form__input__${projectId}`
      );
      // console.log(currentInputs, "currentInputs");

      const currentProject = await fetch(`api/projects/${projectId}`, {
        method: "GET",
        headers: contentTypeJson,
      });

      const projectDetails = await currentProject.json();

      let { projectName, description, dueDate, url, projectType } =
        projectDetails.projectDetails;
      // console.log(projectName, description, dueDate, url, projectType);
      for (let i = 0; i < currentInputs.length; i++) {
        let currentField = currentInputs[i];

        if (currentField.id === "projectName") {
          currentField.value = projectName;
        }

        if (currentField.name === "description")
          currentField.value = description;

        if (currentField.name === "dueDate")
          currentField.value = dueDate.slice(0, 10);

        if (currentField.name === "url") currentField.value = url;

        if (currentField.name === "projectType")
          currentField.value = projectType.toLowerCase();
      }

      currentHiddenForm.classList.toggle("hidden");
      currentHiddenForm.setAttribute("id", "hidden__form__active");
      // editForm.setAttribute("class", "visible");
      // console.log(submitEdit, "submit edit");
      const currentSubmitButton = submitEdit[i];
      // console.log(currentSubmitButton, "current submit button");

      currentSubmitButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const projectHeaderDisplay = document.getElementById(
          `project__header__display__${projectId}`
        );
        console.log(projectHeaderDisplay, "projectheaderdisplay");
        for (let i = 0; i < currentInputs.length; i++) {
          let currentField = currentInputs[i];
          console.log(currentField);
          if (currentField.id === "projectName") {
            projectName = currentField.value;
          }
          if (currentField.name === "description")
            description = currentField.value;
          if (currentField.name === "dueDate") dueDate = currentField.value;
          if (currentField.name === "url") url = currentField.value;
          if (currentField.name === "projectType")
            projectType = currentField.value;
        }
        console.log(projectName, description, dueDate, url, projectType);

        const options = { projectName, description, dueDate, url, projectType };
        const body = JSON.stringify(options);
        const projectEdit = await fetch(`/api/projects/${projectId}`, {
          method: "PUT",
          body,
          headers: contentTypeJson,
        });
        projectHeaderDisplay.innerText = projectName;
        currentHiddenForm.removeAttribute("id");
        currentHiddenForm.classList.toggle("hidden");
      });
    }
  });
}
