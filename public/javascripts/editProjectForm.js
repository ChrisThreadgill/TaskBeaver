window.addEventListener("load", (e) => {
  console.log("hello from edit project script");
});

const editForm = document.getElementById("edit__form");
const hiddenForm = document.getElementById("hidden__form");
editForm.addEventListener("click", async (e) => {
  hiddenForm.classList.toggle("hidden");
  // editForm.setAttribute("class", "visible");
});
