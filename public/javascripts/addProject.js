const contentTypeJson = { "Content-Type": "application/json" };

window.addEventListener("load", (event) => {
  console.log("hello from javascript!");
});

const info = {
  projectName: "poop1",
  description: "this is poop",
  dueDate: "2040-02-10 16:00:00-08",
  url: "",
  projectType: "homework",
};

// todo add form values
const newProject = document.getElementById("project__add__button");
newProject.addEventListener("click", async (e) => {
  const newProject = await fetch("/api/projects", {
    method: "post",
    body: JSON.stringify(info),
    headers: contentTypeJson,
  });
  const project = await newProject.json();
  const { projectName, id } = project.project;
  const projectList = document.querySelector(".project__list");
  const projectLink = document.createElement("div");
  projectLink.innerHTML = `<a href=/projects/${id}> ${projectName}</a>`;
  projectLink.setAttribute("class", "project__link");
  projectLink.setAttribute("id", `project-id-${id}`);
  projectList.appendChild(projectLink);
});
