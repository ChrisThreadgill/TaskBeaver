window.addEventListener("load", (e) => {
    console.log("hello from edit project script");
});
const contentTypeJson = { "Content-type": "application/json" };

// gives you all of the form fields with this class
const hiddenEditProjectForms = document.querySelectorAll(
    ".hidden__project__edit__form"
);
const formInputs = document.querySelectorAll(".edit__form");
console.log(formInputs);

const submitEditButtons = document.querySelectorAll(".edit__project__submit");

// const inputFields = Array.from(formInputs);

const editForm = Array.from(editForms);
const submitEdit = Array.from(submitEdits);

for (let i = 0; i < editForm.length; i++) {
    const currentProjectEditPen = editForm[i];
    console.log(hiddenEditProjectForms[i]);
    //gives us all of the edit pens for each project
    console.log(currentProjectEditPen);

    currentProjectEditPen.addEventListener("click", async(e) => {
        //grabs the project ID from the id of the element
        /**                                   *    *      Look an alien!
             /**                                   \  /                             */
        const projectId = currentProjectEditPen.id.split("__")[2];
        console.log(hiddenEditProjectForms[i]);
        const currentHiddenForm = hiddenEditProjectForms[i];
        console.log(currentHiddenForm);
        const activeHiddenForm = document.getElementById("hidden__form__active");

        if (activeHiddenForm) {
            activeHiddenForm.removeAttribute("id");
            activeHiddenForm.classList.toggle("hidden");
            return;
        } else {
            const currentInputs = document.getElementsByClassName(
                `hidden__form__input__${projectId}`
            );

            const currentProject = await fetch(`api/projects/${projectId}`, {
                method: "GET",
                headers: contentTypeJson,
            });

            const projectDetails = await currentProject.json();

            let { projectName, description, dueDate, url, projectType, _csrf } =
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

            const currentSubmitButton = submitEdit[i];

            currentSubmitButton.addEventListener("click", async(e) => {
                e.preventDefault();
                const projectHeaderDisplay = document.getElementById(
                    `project__header__display__${projectId}`
                );
                for (let i = 0; i < currentInputs.length; i++) {
                    let currentField = currentInputs[i];
                    // console.log(currentField)
                    // console.log(currentHiddenForm[0].value);
                    // console.log(currentHiddenForm[0].name);

                    if (currentField.id === "projectName") {
                        projectName = currentField.value;
                    }
                    if (currentField.name === "description")
                        description = currentField.value;
                    if (currentField.name === "dueDate") dueDate = currentField.value;
                    if (currentField.name === "url") url = currentField.value;
                    if (currentField.name === "projectType") projectType = currentField.value;
                    if (currentHiddenForm[0].name === "_csrf") _csrf = currentHiddenForm[0].value;
                    // console.log(_csrf)
                }
                const options = { projectName, description, dueDate, url, projectType, _csrf };
                const body = JSON.stringify(options);
                const projectEdit = await fetch(`/api/projects/${projectId}`, {
                    method: "PUT",
                    body,
                    headers: contentTypeJson,
                });

                const projectLinkName = document.getElementById(
                    `project__link__${projectId}`
                );
                projectLinkName.innerText = projectName;
                projectHeaderDisplay.innerText = projectName;
                currentHiddenForm.removeAttribute("id");
                currentHiddenForm.classList.toggle("hidden");
            });
        }
    });
}