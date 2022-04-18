window.addEventListener("load", (e) => {
  console.log("hello from project details script");
});

const projectDetailsButtons = document.querySelectorAll(".project__details__button");

for (let i = 0; i < projectDetailsButtons.length; i++) {
  const currentProjectDetailsButton = projectDetailsButtons[i];

  const currentProjectId = currentProjectDetailsButton.id.split("__")[3];

  const currentProjectDetails = document.getElementById(`project__details__${currentProjectId}`);

  currentProjectDetailsButton.addEventListener("click", async (e) => {
    currentProjectDetails.classList.toggle("project__details__unhidden");
    currentProjectDetails.classList.toggle("hidden");
  });
}
