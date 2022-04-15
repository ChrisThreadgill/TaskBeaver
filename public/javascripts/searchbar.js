window.addEventListener("load", (e) => {
  console.log("hello from searchbar script");
});

const searchBar = document.getElementById("search__button");
const searchInput = document.getElementById("search__input");
searchBar.addEventListener("mouseover", async (e) => {
  searchInput.classList.toggle("hidden");
});

searchBar.addEventListener("mouseout", async (e) => {
  searchInput.classList.toggle("hidden");
});

searchInput.addEventListener("mouseover", async (e) => {
  searchInput.setAttribute("class", "");
});
searchInput.addEventListener("focus", async (e) => {
  searchInput.setAttribute("class", "");
});
searchInput.addEventListener("blur", async (e) => {
  searchInput.setAttribute("class", "hidden");
});
