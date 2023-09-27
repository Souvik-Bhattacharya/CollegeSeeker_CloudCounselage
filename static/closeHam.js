const closeHam = () => {
    var x = document.querySelector("#hamTabs");
    x.style.display = "none";
}

document.getElementById("closeHam").addEventListener("click", closeHam);