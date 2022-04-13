window.addEventListener("load", (event) => {
  console.log("hello from deleteProject.js");
});

const deleteButtons = document.querySelectorAll(".delete__Project");
console.log(deleteButtons);

for (let i = 0; i < deleteButtons.length; i++) {
  const deleteBtn = deleteButtons[i];
  deleteBtn.addEventListener("click", async (e) => {
    const projectId = e.target.id.split("__")[2];
    const res = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data.message);

    if (data.message === "Successfully deleted.") {
      const div = document.getElementById(`project-id-${projectId}`);
      div.remove();
    }
  });
}
