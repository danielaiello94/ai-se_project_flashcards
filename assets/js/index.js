import { decks, getDeckByID } from "./decks.js";
import { stringToHex } from "./colorMap.js";
import { hexToString } from "./colorMap.js";
import { removeColorClasses } from "./colorMap.js";
import { renderCarouselView } from "./carousel.js";

const routes = {
    home: document.querySelector("#home"),
    about: document.querySelector("#about"),
    carousel: document.querySelector("#carousel"),
    notFound: document.querySelector("#not-found")
};

function createDeckEl(item) {
const deckEl = document.querySelector("#deck-template").content.cloneNode(true);

const deck = deckEl.querySelector(".deck");

deck.querySelector("h3").textContent = item.name;

const color = hexToString(item.color);
deck.classList.add(`deck_color_${color}`);

const cardCount = `${item.cards.length} cards`;

deck.querySelector(".deck__count").textContent = cardCount;

const deleteBtn = deck.querySelector(".deck__delete-btn");
deleteBtn.addEventListener("click", function() {
    deck.remove();
});

const deckLink = deck.querySelector('.deck__link');
deckLink.href = `#carousel/${item.id}`;

return deckEl;
}

function renderDeckEl(item) {
const deckEl = createDeckEl(item);
document.querySelector(".decks__list").prepend(deckEl);

}

function renderRoute() {
    const hash = window.location.hash.slice(1);

    Object.values(routes).forEach(function(section) {
        section.style.display = "none";
    });

    if (hash.startsWith("carousel/")) {
        const deckId = hash.split("/")[1];

        const deck = getDeckByID(deckId);

        if (deck) {
            routes.carousel.style.display = "block";
            renderCarouselView(deck);
            return;
        }

        if (hash.startsWith("carousel/")) {
            const parts = hash.split("/");
        }

        routes.notFound.style.display = "block";
        return;
    }

    const route = routes[hash] || routes.notFound;

    route.style.display = "block";
}

window.addEventListener("hashchange", renderRoute);

decks.forEach(renderDeckEl);

if(!window.location.hash) {
    window.location.hash = "#home";
}

renderRoute();
