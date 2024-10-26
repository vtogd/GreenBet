// Initial balance
let balance = 100;

// Array of slot symbols
const symbols = ["🍒", "🍋", "🍊", "🍉", "🍇", "🍌"];

// Load sound effects
const spinSound = document.getElementById("spin-sound");
const winSound = document.getElementById("win-sound");

// Popup elements
const winPopup = document.getElementById("win-popup");
const closePopupButton = document.getElementById("close-popup");

// Function to play a sound
function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

// Function to spin the reels and update the balance
function spin() {
    // Check if balance is enough to spin
    if (balance < 10) {
        alert("Not enough balance to play!");
        return;
    }

    // Deduct the spin cost
    balance -= 10;
    updateBalance();

    // Play spin sound
    playSound(spinSound);

    // Randomly assign symbols to each reel with a delay for each reel
    const reelElements = [
        document.getElementById("reel1"),
        document.getElementById("reel2"),
        document.getElementById("reel3")
    ];

    let results = [];
    reelElements.forEach((reel, index) => {
        setTimeout(() => {
            let randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            reel.textContent = randomSymbol;
            reel.classList.add("spinning");

            // After animation, remove class
            setTimeout(() => reel.classList.remove("spinning"), 300);
            results.push(randomSymbol);

            // Once all reels have stopped, check for wins
            if (results.length === 3) {
                checkWin(results);
            }
        }, index * 300);
    });
}

// Check if the player won and update balance accordingly
function checkWin(results) {
    const [reel1, reel2, reel3] = results;

    if (reel1 === reel2 && reel2 === reel3) {
        balance += 50;
        showWinPopup("Jackpot! You won 50 credits!");
        playSound(winSound);
    } else if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) {
        balance += 20;
        showWinPopup("Nice! You won 20 credits!");
        playSound(winSound);
    }

    updateBalance();
}

// Function to update the balance display
function updateBalance() {
    document.getElementById("balance").textContent = balance;
}

// Function to show the custom win popup
function showWinPopup(message) {
    document.querySelector("#win-popup p").textContent = message;
    winPopup.style.display = "block";
}

// Function to close the popup
function closePopup() {
    winPopup.style.display = "none";
}

// Event listener for the spin button
document.getElementById("spin-button").addEventListener("click", spin);

// Event listener for the close button in the popup
closePopupButton.addEventListener("click", closePopup);
