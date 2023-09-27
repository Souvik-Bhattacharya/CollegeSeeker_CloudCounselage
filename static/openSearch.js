const showSearchBox = (e) => {
    let ele = document.getElementById("form");
    ele.style.display = "block";
}

document.getElementById("search").addEventListener("click", showSearchBox);
document.getElementById("searchBtn").addEventListener("click", showSearchBox);