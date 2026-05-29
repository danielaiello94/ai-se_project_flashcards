function renderCarouselView(deck) {
    let currentIndex = 0;

    let showingQuestion = true;

    const carouselEl = document.querySelector("#carousel");

    const titleEl =
        carouselEl.querySelector(".carousel__title");

    const cardTextEl =
        carouselEl.querySelector(".carousel__card-text");

    const cardEl =
        carouselEl.querySelector(".carousel__card");    

    const leftBtn =
        carouselEl.querySelector(".carousel__btn_type_left");

    const rightBtn =
        carouselEl.querySelector(".carousel__btn_type_right");

    const flipBtn =
        carouselEl.querySelector(".carousel__btn_type_flip");

    function disableButton(buttonEl) {
        buttonEl.classList.add("carousel__btn_disabled");

        buttonEl.disabled = true;
    }

    function enableButton(buttonEl) {
        buttonEl.classList.remove("carousel__btn_disabled");

        buttonEl.disabled = false;
    }

    function updateArrows() {
        if (currentIndex === 0) {
            disableButton(leftBtn);
        } else {
            enableButton(leftBtn);
        }

        if (currentIndex === deck.cards.length - 1) {
            disableButton(rightBtn);
        } else {
            enableButton(rightBtn);
        }
    }

    function updateDisplay() {
        const currentCard = deck.cards[currentIndex];

        titleEl.textContent =
            `${deck.name} · ${currentIndex + 1}/${deck.cards.length}`;

        if (showingQuestion) {
            cardTextEl.textContent = currentCard.question;
        } else {
            cardTextEl.textContent = currentCard.answer;
        }

        if (!showingQuestion) {
          cardEl.classList.add("carousel__card_color_white");
        } else {
          cardEl.classList.remove("carousel__card_color_white");
        }

        updateArrows();
    }

    rightBtn.addEventListener("click", function() {
        if (currentIndex < deck.cards.length - 1) {
            currentIndex++;

            showingQuestion = true;

            updateDisplay();
        }
    });

    leftBtn.addEventListener("click", function() {
        if (currentIndex > 0) {
            currentIndex--;

            showingQuestion = true;

            updateDisplay();
        }
    });

    flipBtn.addEventListener("click", function() {
        showingQuestion = !showingQuestion;

         if (!showingQuestion) {
          cardEl.classList.add("carousel__card_color_white");
        } else {
          cardEl.classList.remove("carousel__card_color_white");
        }

       updateDisplay();
    });

    updateDisplay();
}

export { renderCarouselView };