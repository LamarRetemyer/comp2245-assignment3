document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll(".square");
    const gameBoard = Array(9).fill(null);
    let currentPlayer = "X";

    // Function to handle square clicks
    function handleSquareClick(index) {
        if (gameBoard[index] === null) {
            gameBoard[index] = currentPlayer;
            squares[index].textContent = currentPlayer;
            squares[index].classList.add(currentPlayer);

            if (checkWinner(currentPlayer)) {
                // A player has won
                document.getElementById("status").textContent = `Congratulations! ${currentPlayer} is the Winner!`;
                document.getElementById("status").classList.add("you-won");
                disableGame(); // Disable further moves when the game is over
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    // Function to check for a win (customize this part according to your win conditions)
    function checkWinner(player) {
        // Check rows, columns, and diagonals for the winning conditions
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combo of winningCombos) {
            if (combo.every((index) => gameBoard[index] === player)) {
                return true; // Player has won
            }
        }

        return false; // No winner yet
    }

    // Function to handle mouse enter (hover) event
    function handleSquareMouseEnter(index) {
        squares[index].classList.add("hover");
    }

    // Function to handle mouse leave event
    function handleSquareMouseLeave(index) {
        squares[index].classList.remove("hover");
    }

    // Function to disable further moves when the game is over
    function disableGame() {
        squares.forEach(function (square, index) {
            square.removeEventListener("click", function () {
                handleSquareClick(index);
            });
        });
    }

    // Function to reset the game state
    function resetGame() {
        gameBoard.fill(null);
        squares.forEach(function (square) {
            square.textContent = "";
            square.classList.remove("X", "O");
        });

        const status = document.getElementById("status");
        status.textContent = "Move your mouse over a square and click to play an X or an O.";
        status.classList.remove("you-won");

        squares.forEach(function (square, index) {
            square.addEventListener("click", function () {
                if (!gameBoard[index]) {
                    handleSquareClick(index);
                }
            });
        });

        currentPlayer = "X";
    }

    // Add event listeners for square clicks, mouse enter, and mouse leave
    squares.forEach(function (square, index) {
        square.addEventListener("click", function () {
            if (!gameBoard[index]) {
                handleSquareClick(index);
            }
        });

        square.addEventListener("mouseenter", function () {
            handleSquareMouseEnter(index);
        });

        square.addEventListener("mouseleave", function () {
            handleSquareMouseLeave(index);
        });
    });

    // Add an event listener for the "New Game" button
    document.getElementById("new-game-btn").addEventListener("click", resetGame);
});



