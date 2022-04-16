import { taskDeletes } from "./deleteTask.js";

window.addEventListener("load", (event) => {
    console.log("hello from addTask!");
});

const contentTypeJson = { "Content-Type": "application/json" };

const dateView = (date) => {
    const [year, month, day] = date.split("-");
    return month + "/" + day + "/" + year;
};


const addTaskButtons = document.querySelectorAll(".confirm__task__add");

const addTask = async(e) => {
    e.preventDefault();

    const projectId = e.target.id.split(`__`)[3];

    const taskTitle = document.getElementById(`task__title__${projectId}`).value;
    const description = document.getElementById(
        `description__${projectId}`
    ).value;
    const dueDate = document.getElementById(`due__date__${projectId}`).value;
    const tag = document.getElementById(`task__select__${projectId}`).value;
    const _csrf = document.getElementById("csurfId").value;

    const info = {
        taskTitle,
        description,
        dueDate,
        tag,
        projectId,
        _csrf,
    };

    const newTask = await fetch("/api/tasks", {
        method: "POST",
        headers: contentTypeJson,
        body: JSON.stringify(info),
    });

    const res = await newTask.json();

    if (res.errorArray) {
        const array = res.errorArray;

        const parentDivs = document.querySelectorAll('.add__task__error')
        for (let parentDiv of parentDivs) {
            const oldErrors = parentDiv.childNodes
            if (oldErrors) {
                while (oldErrors.length !== 0) {
                    let oldErr = oldErrors[0];
                    oldErr.remove()
                }
            }
            for (let i = 0; i < array.length; i++) {
                let errMsg = array[i];

                let p = document.createElement('p')
                p.innerText = errMsg

                parentDiv.appendChild(p)
            }
        }



    }

    if (res.task) {
        const { id } = res.task;

        const taskDiv = document.createElement("div");
        taskDiv.setAttribute("class", "project__task__container");
        taskDiv.setAttribute("id", `task__container__${id}`);

        const projectBoard = document.querySelector(`.project__board`);

        taskDiv.innerHTML = `
       <div class="task__buttons">
            <button class='task__edit__button' id='task__edit__${id}'><i class="fa-solid fa-pen-to-square"></i></button>
            <button class='task__delete__button' id='task__delete__${id}'><i class="fa-solid fa-trash-can task__trash__icon" id='trash__task__${id}'></i></button>
            <button class='task__details__button' id='task__details__${id}'><i class="fa-solid fa-angle-down"></i></button>
        </div>
        <div class="task__title" id='task__title__${id}'>${taskTitle}</div>
        <div class="task__tag">
            <span class="badge bg-urgent" id='task__tag__${id}'>${tag}</span>
        </div>
        <div class="hidden project__task__details__hidden project__task__${projectId}" id="project__task__details__${id}">
            <div class="task__description" id='task__description__${id}'>Description: ${description}</div>
            <div class="task__dueDate" id='task__dueDate__${id}'>Due Date: ${dueDate}</div>
        </div>
        <div class="hidden__task__edit__${projectId}">
            <form class="hidden" id="hidden__task__edit__${id}" action='/api/tasks/${id}' method="PUT">
                <input type="hidden" name="_csrf" value=csrfToken>
                <div>
                    <label for='taskTitle'>Task Title:</label>
                    <input class= 'hidden__task__input__${id}' type="text" name="taskTitle" id="taskTitle" value="" ></div>
                <div>
                    <label for="description ">Description:</label>
                    <input class='hidden__task__input__${id}' type="text" name="description" id="description" value="" ></div>
                <div>
                    <label for="dueDate ">Due Date:</label>
                    <input class="hidden__task__input__${id}" type="date" name="dueDate" id="dueDate" value="" ></div>
                    <select class="hidden__task__input__${id}" name="tag">
                        <option value="NoDamGiven">NoDamGiven</option>
                        <option value="Flexible">Flexible</option>
                        <option value="Important">Important</option>
                        <option value="Urgent">Urgent</option>
                    </select>
                <button
                    class="edit__task__button" id="edit__task__submit__${id}" type="submit ">Submit</button>
                </form>
        </div>
    `;

        projectBoard.appendChild(taskDiv);

        // adding new event listener for details drop down
        const newTaskDetailsButton = document.getElementById(`task__details__${id}`);
        const newTaskDetailContainer = document.getElementById(
            `project__task__details__${id}`
        );
        const taskDetailsEvent = async(e) => {
            newTaskDetailContainer.classList.toggle("hidden");
            newTaskDetailContainer.classList.remove("project__task__details__hidden");
            newTaskDetailContainer.classList.add("project__task__details__unhidden");
        };
        newTaskDetailsButton.addEventListener("click", taskDetailsEvent);

        const newTaskEditButton = document.getElementById(`task__edit__${id}`);

        newTaskEditButton.addEventListener("click", async(e) => {
            const newHiddenEditForm = document.getElementById(
                `hidden__task__edit__${id}`
            );
            const newTaskInputs = document.getElementsByClassName(
                `hidden__task__input__${id}`
            );
            const newTaskResponse = await fetch(`/api/tasks/${id}`, {
                method: "get",
                headers: contentTypeJson,
            });
            const newTaskDetails = await newTaskResponse.json();
            let { taskTitle, description, completed, dueDate, tag } =
            newTaskDetails.taskDetails;
            for (let i = 0; i < newTaskInputs.length; i++) {
                const taskInput = newTaskInputs[i];
                if (taskInput.name === "taskTitle") {
                    taskInput.value = taskTitle;
                }
                if (taskInput.name === "description") {
                    taskInput.value = description;
                }
                if (taskInput.name === "dueDate") {
                    taskInput.value = dueDate.slice(0, 10);
                }
                if (taskInput.name === "tag") {
                    taskInput.value = tag;
                }
            }

            newHiddenEditForm.classList.toggle("hidden");
            newHiddenEditForm.classList.toggle("edit__task__unhidden");

            const newEditSubmitButton = document.getElementById(
                `edit__task__submit__${id}`
            );
            newEditSubmitButton.addEventListener("click", async(e) => {
                e.preventDefault();
                for (let i = 0; i < newTaskInputs.length; i++) {
                    const taskInput = newTaskInputs[i];
                    if (taskInput.name === "taskTitle") {
                        taskTitle = taskInput.value;
                    }
                    if (taskInput.name === "description") {
                        description = taskInput.value;
                    }
                    if (taskInput.name === "dueDate") {
                        dueDate = taskInput.value;
                    }
                    if (taskInput.name === "tag") {
                        tag = taskInput.value;
                    }
                }
                const options = { taskTitle, description, dueDate, tag };
                const body = JSON.stringify(options);
                const newTaskEdit = await fetch(`/api/tasks/${id}`, {
                    method: "put",
                    body,
                    headers: contentTypeJson,
                });

                const taskTitleDiv = document.getElementById(`task__title__${id}`);
                taskTitleDiv.innerText = taskTitle;

                const taskTag = document.getElementById(`task__tag__${id}`);
                taskTag.innerText = tag;
                const taskDescription = document.getElementById(
                    `task__description__${id}`
                );
                taskDescription.innerText = description;
                const taskDueDate = document.getElementById(`task__dueDate__${id}`);
                taskDueDate.innerText = dateView(dueDate);
                newHiddenEditForm.classList.toggle("hidden");
                newHiddenEditForm.classList.toggle("edit__task__unhidden");
            });
        });

        const trashCansIcons = document.querySelectorAll(".task__trash__icon");

        const taskTrashButtons = document.querySelectorAll(".task__delete__button");

        for (let icon of trashCansIcons) {
            icon.addEventListener("click", taskDeletes);
        }

        for (let button of taskTrashButtons) {
            button.addEventListener("click", taskDeletes);
        }

        const taskTitleForms = document.querySelectorAll(".task__add__title")
        for (let taskTitleForm of taskTitleForms) {
            taskTitleForm.value = ""
        }
        const taskDescriptionForms = document.querySelectorAll(".task__add__description")
        for (let taskDescriptionForm of taskDescriptionForms) {
            taskDescriptionForm.value = ""
        }
      
        const taskDueDateForms = document.querySelectorAll(".task__add__duedate")
        for (let taskDueDateForm of taskDueDateForms) {
            taskDueDateForm.value = ""
        }
        const taskSelectForms = document.querySelectorAll(".task__select")
        for (let taskSelectForm of taskSelectForms) {
            taskSelectForm.value = "NoDamGiven"
        }

        const parentDivs = document.querySelectorAll('.add__task__error')
        for (let parentDiv of parentDivs) {
            const oldErrors = parentDiv.childNodes
            if (oldErrors) {
                while (oldErrors.length !== 0) {
                    let oldErr = oldErrors[0];
                    oldErr.remove()
                }
            }
        }

    }
};

const moveOffProject = async(e) => {
    e.preventDefault()
    const taskTitleForms = document.querySelectorAll(".task__add__title")
    for (let taskTitleForm of taskTitleForms) {
        taskTitleForm.value = ""
    }
    const taskDescriptionForms = document.querySelectorAll(".task__add__description")
    for (let taskDescriptionForm of taskDescriptionForms) {
        taskDescriptionForm.value = ""
    }
    const taskDueDateForms = document.querySelectorAll(".task__add__duedate")
    for (let taskDueDateForm of taskDueDateForms) {
        taskDueDateForm.value = ""
    }
    const taskSelectForms = document.querySelectorAll(".task__select")
    for (let taskSelectForm of taskSelectForms) {
        taskSelectForm.value = "NoDamGiven"
    }

    const taskErrorForms = document.querySelectorAll(".add__task__error")
    for (let taskErrorForm of taskErrorForms) {

        const oldErrors = taskErrorForm.childNodes

        if (oldErrors) {
            while (oldErrors.length !== 0) {
                let oldErr = oldErrors[0];
                oldErr.remove()
            }
        }

    }
};

const projectLinks = document.querySelectorAll(".project__link");
for (let projectLink of projectLinks) {
    projectLink.addEventListener("click", moveOffProject)
}

for (let i = 0; i < addTaskButtons.length; i++) {
    let button = addTaskButtons[i];

    button.addEventListener("click", addTask);

}