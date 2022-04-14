window.addEventListener("load", (event) => {
    console.log("hello from javascript!");
});

import { deleteProject } from "./deleteProject.js";

const contentTypeJson = { "Content-Type": "application/json" };

const toggleHidden = (e) => {
    e.preventDefault();
    document.getElementById("projectNameAdd").value = "";
    document.getElementById("descriptionAdd").value = "";
    document.getElementById("dueDateAdd").value = "";
    document.getElementById("urlAdd").value = "";
    document.getElementById("projectTypeAdd").value = "personal";
    const addForm = document.getElementById("addProject");

    addForm.classList.toggle("hidden");
};

const addProject = document.getElementById("project__add__button");
addProject.addEventListener("click", toggleHidden);

const cancelProject = document.getElementById("cancel-add__Project__Button");
cancelProject.addEventListener("click", toggleHidden);

// todo add form values
const newProject = document.getElementById("confirm__Project__Button");
newProject.addEventListener("click", async(e) => {
    e.preventDefault();

    const projectName = document.getElementById("projectNameAdd").value;
    const description = document.getElementById("descriptionAdd").value;
    const dueDate = document.getElementById("dueDateAdd").value;
    const url = document.getElementById("urlAdd").value;
    const projectType = document.getElementById("projectTypeAdd").value;
    const _csrf = document.getElementById("csurfId").value;

    const info = {
        projectName,
        description,
        dueDate,
        url,
        projectType,
        _csrf,
    };

    const newProject = await fetch("/api/projects", {
        method: "post",
        body: JSON.stringify(info),
        headers: contentTypeJson,
    });

    const project = await newProject.json();

    const { id } = project.project;

    const projectList = document.querySelector(".project__list");

    const projectLink = document.createElement("div");

    console.log(projectName);
    console.log(id);

    projectLink.innerHTML = `
  <p class=project__List__Name id=project__List__Name${id}>
  ${projectName}
  </p>
  <span>
  <button class=delete__Project id=delete__Project__${id}>
  <i class="fa-solid fa-trash-can" id=trash__icon__${id}>
  </i>
  </button>
  </span>
  `;

    projectLink.setAttribute("class", "project__link");
    projectLink.setAttribute("id", `project-id-${id}`);
    projectList.appendChild(projectLink)

    const newDeleteButton = document.getElementById(`delete__Project__${id}`);
    const trashcans = document.querySelectorAll(".fa-trash-can");
    for (let i = 0; i < trashcans.length; i++) {
        let trashcan = trashcans[i];
        trashcan.addEventListener("click", deleteProject);
    }
    newDeleteButton.addEventListener("click", deleteProject);

});
