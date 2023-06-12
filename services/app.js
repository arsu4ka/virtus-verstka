const imageBefore = document.querySelector("div.img-repr .img-before");
const imageAfter = document.querySelector("div.img-repr .img-after");
const prevBtn = document.querySelector("button.prev-btn");
const nextBtn = document.querySelector("button.next-btn");
const liElems = document.querySelectorAll(".gallery-list li");


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

function addActive(liElem) {
    liElem.setAttribute("class", `li-${getLiIndex(liElem)} active`);
}

function removeActive(liElem) {
    liElem.setAttribute("class", `li-${getLiIndex(liElem)}`);
}

function displayPrevious() {
    oldActive = currentActiveElem();
    removeActive(oldActive);
    oldIndex = getLiIndex(oldActive);
    newIndex = oldIndex - 1;
    
    if (newIndex < 0) {
        newIndex = liElems.length - 1;
    }

    addActive(getLiByIndex(newIndex));
    changeImage(newIndex);
}

function displayNext() {
    oldActive = currentActiveElem();
    removeActive(oldActive);
    oldIndex = getLiIndex(oldActive);
    newIndex = oldIndex + 1;
    
    if (newIndex >= liElems.length) {
        newIndex = 0;
    }

    addActive(getLiByIndex(newIndex));
    changeImage(newIndex);
}

function setNewActive(liElem) {
    liElem = liElem.target;
    oldActive = currentActiveElem();
    removeActive(oldActive);
    addActive(liElem);
    changeImage(getLiIndex(liElem));
}

liElems.forEach(element => {
    element.addEventListener("click", setNewActive);
});

prevBtn.addEventListener("click", displayPrevious);
nextBtn.addEventListener("click", displayNext);