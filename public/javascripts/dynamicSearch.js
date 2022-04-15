window.addEventListener("load", (event) => {
    console.log("Dynamic Search!");
});

const contentTypeJson = { "Content-Type": "application/json" };

//We want to query
//id search__input

const search = document.querySelector('#search__input')

console.log(search)


search.addEventListener('input', async (e) => {
    // e.preventDefault();
    const inputValue = e.target.value

    const data = await fetch("/api/tasks/search", {
        method: "put",
        headers: contentTypeJson,
        body: JSON.stringify({input: inputValue})
    });

    // const dataResults = await data.json();

    // console.log(dataResults)

})
