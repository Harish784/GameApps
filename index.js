document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const clock = document.getElementById("clock");

    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        clock.textContent = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateClock, 1000);
    updateClock(); // initial call to set the clock immediately

    const cardArray = [
        { name: "A", img: "A" },
        { name: "A", img: "A" },
        { name: "B", img: "B" },
        { name: "B", img: "B" },
        { name: "C", img: "C" },
        { name: "C", img: "C" },
        { name: "D", img: "D" },
        { name: "D", img: "D" }
    ];

    cardArray.sort(() => 0.5 - Math.random());

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement("div");
            card.setAttribute("class", "card");
            card.setAttribute("data-id", i);
            card.addEventListener("click", flipCard);
            card.innerHTML = `
                <div class="front"></div>
                <div class="back">${cardArray[i].img}</div>
            `;
            gameBoard.appendChild(card);
        }
    }

    function flipCard() {
        const cardId = this.getAttribute("data-id");
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.classList.add("flipped");

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll(".card");
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
            cardsWon.push(cardsChosen);
            cards[optionOneId].removeEventListener("click", flipCard);
            cards[optionTwoId].removeEventListener("click", flipCard);
        } else {
            cards[optionOneId].classList.remove("flipped");
            cards[optionTwoId].classList.remove("flipped");
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            alert("Congratulations! You found them all!");
        }
    }

    createBoard();
});
