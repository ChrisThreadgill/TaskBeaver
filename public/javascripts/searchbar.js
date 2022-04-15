window.addEventListener("load", (e) => {
    console.log("hello from searchbar script");
});

const searchBars = document.querySelectorAll(".search__button");
// const searchInput = document.getElementById("search__input");
const searchInputs = document.querySelectorAll('.search__input')
for (let searchInput of searchInputs) {
    searchInput.addEventListener("mouseover", async(e) => {
        searchInput.setAttribute("class", "");
    });
    searchInput.addEventListener("focus", async(e) => {
        searchInput.setAttribute("class", "");
    });
    searchInput.addEventListener("blur", async(e) => {
        searchInput.setAttribute("class", "hidden");
    });
    for (let searchBar of searchBars) {
        searchBar.addEventListener("mouseover", async(e) => {
            searchInput.classList.toggle("hidden");
        });

        searchBar.addEventListener("mouseout", async(e) => {
            searchInput.classList.toggle("hidden");
        });
    }
}

// for (let searchBar of searchBars) {
//     searchBar.addEventListener("mouseover", async(e) => {
//         searchInput.classList.toggle("hidden");
//     });

//     searchBar.addEventListener("mouseout", async(e) => {
//         searchInput.classList.toggle("hidden");
//     });
// }