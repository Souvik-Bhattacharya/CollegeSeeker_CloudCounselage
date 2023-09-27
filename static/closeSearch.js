const closeSearchBox = (e) => {
    let ele = document.getElementById("form");
    ele.style.display = "none";
}

document.getElementById("close").addEventListener("click", closeSearchBox);