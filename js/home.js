const numberOfImages = 3;
const prevButton = document.querySelector(".part-6 .prev-btn");
const nextButton = document.querySelector(".part-6 .next-btn");

function getImageElement() {
    return document.querySelector(".part-6 .review-img");
}

function getCurrentActiveIndex() {
    const elem = getImageElement();
    const index = elem.getAttribute("src").match(/\d/);
    return Number.parseInt(index);
}

function setNewIndex(index) {
    const elem = getImageElement();
    elem.setAttribute("src", `images/home/reviews/rev${index}.jpg`)
}

function prevBtnTrigger() {
    const oldIndex = getCurrentActiveIndex();
    let newIndex = oldIndex - 1;

    if (newIndex < 0) {
        newIndex = numberOfImages - 1;
    }

    setNewIndex(newIndex);
}

function nextBtnTrigger() {
    const oldIndex = getCurrentActiveIndex();
    let newIndex = oldIndex + 1;

    if (newIndex >= numberOfImages) {
        newIndex = 0;
    }

    setNewIndex(newIndex);
}

prevButton.addEventListener("click", prevBtnTrigger)
nextButton.addEventListener("click", nextBtnTrigger)