document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll(".square");
    const board = Array(9).fill(null);
    let player = "X";

    function play(index) {
        if (board[index] === null) {
            board[index] = player;
            squares[index].textContent = player;
            squares[index].classList.add(player);

            if (checkWin(player)) {
                const message = document.getElementById("status");
                message.textContent = `Congrats! ${player} is the Winner!`;
                message.classList.add("you-won");
                endGame();
            } else {
                player = player === "X" ? "O" : "X";
            }
        }
    }

    function checkWin(p) {
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winCombos) {
            if (combo.every((index) => board[index] === p)) {
                return true;
            }
        }

        return false;
    }

    function hoverEffect(index) {
        squares[index].classList.add("hover");
    }

    function unhover(index) {
        squares[index].classList.remove("hover");
    }

    function endGame() {
        squares.forEach(function (square, index) {
            square.removeEventListener("click", function () {
                play(index);
            });
        });
    }

    function reset() {
        board.fill(null);
        squares.forEach(function (square) {
            square.textContent = "";
            square.classList.remove("X", "O");
        });

        const status = document.getElementById("status");
        status.textContent = "Hover over a square and click to play an X or an O.";
        status.classList.remove("you-won");

        squares.forEach(function (square, index) {
            square.addEventListener("click", function () {
                if (!board[index]) {
                    play(index);
                }
            });
        });

        player = "X";
    }

    squares.forEach(function (square, index) {
        square.addEventListener("click", function () {
            if (!board[index]) {
                play(index);
            }
        });

        square.addEventListener("mouseenter", function () {
            hoverEffect(index);
        });

        square.addEventListener("mouseleave", function () {
            unhover(index);
        });
    });

    document.getElementById("new-game-btn").addEventListener("click", reset);
});




