const openHam = () => {
    var x = document.querySelector("#hamTabs");
    x.style.display = "block";
}

document.getElementById("hamIcon").addEventListener("click", openHam);