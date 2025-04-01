const selector = document.getElementById('selector');
const options = document.getElementsByClassName('list-option');
let isOpen = false;

window.addEventListener("DOMContentLoaded", (e) => {
    selector.addEventListener('click', toggleDropDown);

    for (var i = 0; i < options.length; i++) {
        options[i].addEventListener('click', updateDropDown);
    }
})

function toggleDropDown() {
    isOpen = !isOpen;
        
    if (isOpen) {
        document.getElementById('options').style.display = "block";
    } else {
        document.getElementById('options').style.display = "none";
    }
}

function updateDropDown() {
    selector.innerHTML = this.innerHTML;
    let selected = this.innerHTML;
    console.log("Selected: ", selected);
    toggleDropDown();
}
