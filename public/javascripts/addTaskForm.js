const contentTypeJson = { "Content-Type": "application/json" }

window.addEventListener("load", (event) => {
    console.log("This is the addTaskForm!")


    console.log(document.querySelector('.add__task__id'))

})

//  Will reset the values after clicking add Task.

// const toggleHidden = (e) => {
//     e.preventDefault();
//     document.getElementById("projectNameAdd").value = "";
//     document.getElementById("descriptionAdd").value = "";
//     document.getElementById("dueDateAdd").value = "";
//     document.getElementById("urlAdd").value = "";
//     document.getElementById("projectTypeAdd").value = "personal";
//     const addForm = document.getElementById("addProject");

//     addForm.classList.toggle("hidden");
// };

// const addProject = document.getElementById("project__add__button");
// addProject.addEventListener("click", toggleHidden);

// const cancelProject = document.getElementById("cancel-add__Project__Button");
// cancelProject.addEventListener("click", toggleHidden);


const info = { "projectName": "poop1", "description": "this is poop", "dueDate": "2040-02-10 16:00:00-08", "url": "", "projectType": "homework" }
// todo add form values


// Will grab button for add task.
const newTask = document.querySelector('.test__task__add')

console.log(newTask)

// Grab values from our inputs.
const taskTitle = document.querySelector('#taskTitle')
// const description =
// const projectId =
// const dueDate =
// const tag =

console.log(taskTitle.value)

// Will listen for click
newTask.addEventListener("click", async(e) => {
    e.preventDefault();

    console.log('working')
    console.log(taskTitle.value)

    // const postTask = await fetch('/api/tasks', {
    //     method: "post",
    //     body: JSON.stringify(info),
    //     headers: contentTypeJson
    // })


    // const project = await postTask.json()
    // const { projectName, id, } = project.project
    // const projectList = document.querySelector('.project__list')
    // const projectLink = document.createElement('div')
    // projectLink.innerHTML = `<a href=/projects/${id}> ${projectName}</a>`
    // projectLink.setAttribute('class', 'project__link')
    // projectLink.setAttribute('id', `project-id-${id}`)
    // projectList.appendChild(projectLink)
});
