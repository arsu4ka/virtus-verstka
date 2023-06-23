const imageBefore = document.querySelector(".img-before-after");
const prevBtn = document.querySelector("button.prev-btn");
const nextBtn = document.querySelector("button.next-btn");
const liElems = document.querySelectorAll(".gallery-list li");

function isSmallWidth() {
    const element = document.querySelector('.gallery');
    const computedStyle = window.getComputedStyle(element);
    return computedStyle.getPropertyValue('flex-direction') == "column";
}

function changeImage(number) {
    imageBefore.setAttribute("src", `../images/services/gallery/list${number}.jpg`);
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
    const url = window.location.href;
    if (url.includes("?") && url.includes("=")) {
        const paramsStr = url.split("?");
        const param = paramsStr[paramsStr.length - 1].split("=");
        const key = param[0];
        let value = param[1];
        if (key === "galleryItem" && Number.isInteger(parseInt(value)) && parseInt(value) < liElems.length) {
            console.log(key, value);
            value = parseInt(value);
            setNewActive({
                target: document.querySelector(`li.li-${value}`)
            });
        }
    }

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
