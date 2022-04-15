window.addEventListener("load", (e) => {
  console.log("hello from list populate project script");
});

const projectLinks = document.querySelectorAll(".project__link");
const projects = Array.from(projectLinks);
const hiddenForm = document.querySelectorAll(".hidden__edit__form");
const hiddenForms = Array.from(hiddenForm);

for (let i = 0; i < projects.length; i++) {
  const currentProject = projects[i];
  const projectId = currentProject.id.split("__")[3];
  const projectHeader = document.getElementById(
    `project__header__${projectId}`
  );

  currentProject.addEventListener("click", async (e) => {
    e.preventDefault();
    const unhiddenHeader = document.querySelector(".project__header__unhidden");
    const activeHiddenForm = document.getElementById("hidden__form__active");

    if (activeHiddenForm) {
      activeHiddenForm.classList.toggle("hidden");
      activeHiddenForm.removeAttribute("id");
    }

    if (unhiddenHeader) {
      unhiddenHeader.removeAttribute("class");
      unhiddenHeader.setAttribute("class", "hidden");
    }
    projectHeader.removeAttribute("class");
    projectHeader.setAttribute("class", "project__header__unhidden");
    // projectHeader.setAttribute("class", "hidden");
    // console.log(projectHeader);
  });
}
