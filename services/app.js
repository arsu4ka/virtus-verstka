const imageBefore = document.querySelector("div.img-repr .img-before");
const imageAfter = document.querySelector("div.img-repr .img-after");
const prevBtn = document.querySelector("button.prev-btn");
const nextBtn = document.querySelector("button.next-btn");
const liElems = document.querySelectorAll(".gallery-list li");

function isSmallWidth() {
    return window.innerWidth <= 1000;
}

function changeImage(number) {
    imageBefore.setAttribute("src", `images/gallery/list${number}_before.png`);
    imageAfter.setAttribute("src", `images/gallery/list${number}_after.png`);
}

function currentActiveElem() {
    return document.querySelector("li.active");
}

function getLiByIndex(index) {
    elem = document.querySelector(`li.li-${index}`);
    return elem;
} 

function getLiIndex(liElem) {
    const regex = /\d+/;
    const result = liElem.getAttribute("class").match(regex);

    if (result) {
    return parseInt(result[0], 10);
    }

    return null;
}

function toggleActive(liElem) {
    liElem.classList.toggle("active");
}

function displayPrevious() {
    oldActive = currentActiveElem();
    toggleActive(oldActive);
    oldIndex = getLiIndex(oldActive);
    newIndex = oldIndex - 1;
    
    if (newIndex < 0) {
        newIndex = liElems.length - 1;
    }

    toggleActive(getLiByIndex(newIndex));
    changeImage(newIndex);
}

function displayNext() {
    oldActive = currentActiveElem();
    toggleActive(oldActive);
    oldIndex = getLiIndex(oldActive);
    newIndex = oldIndex + 1;
    
    if (newIndex >= liElems.length) {
        newIndex = 0;
    }

    toggleActive(getLiByIndex(newIndex));
    changeImage(newIndex);
}

function setNewActive(liElem) {
    liElem = liElem.target;
    oldActive = currentActiveElem();
    toggleActive(oldActive);
    toggleActive(liElem);
    changeImage(getLiIndex(liElem));
}

function toggleDropDown(viaButton = false) {
    var dropdownItems = document.querySelectorAll(".gallery-list li:not(.active)");
    for (var i = 0; i < dropdownItems.length; i++) {
        if (isSmallWidth() && !viaButton) {
            dropdownItems[i].classList.toggle("dropdown");
        } else {
            if (!dropdownItems[i].classList.contains("dropdown")) {
                dropdownItems[i].classList.add("dropdown")
            }
        }
    }

    currentActiveElem().classList.remove("dropdown");
}

document.addEventListener("DOMContentLoaded", function() {
    toggleDropDown();

    liElems.forEach(element => {
        element.addEventListener("click", setNewActive);
        element.addEventListener("click", function() { toggleDropDown(false); })
    });

    prevBtn.addEventListener("click", displayPrevious);
    prevBtn.addEventListener("click", function() { toggleDropDown(true); });
    nextBtn.addEventListener("click", displayNext);
    nextBtn.addEventListener("click", function() { toggleDropDown(true); });
});