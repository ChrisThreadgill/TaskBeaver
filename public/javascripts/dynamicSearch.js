window.addEventListener("load", (event) => {
    console.log("Dynamic Search!");
});

// const db = require("../db/models");


const contentTypeJson = { "Content-Type": "application/json" };

//We want to query
//id search__input

const searchs = document.querySelectorAll('.search__input')
console.log(searchs)
for (let search of searchs) {
    search.addEventListener('input', async(e) => {
        // e.preventDefault();
        e.stopPropagation()
        const id = e.target.id
        console.log(id)
        const inputValue = e.target.value
        console.log("hello there")
        console.log(e.target)
        const data = await fetch("/api/tasks/search", {
            method: "put",
            headers: contentTypeJson,
            body: JSON.stringify({ input: inputValue })
        });


        const dataResults = await data.json();

        console.log(dataResults.searchResults[0])

    })
}