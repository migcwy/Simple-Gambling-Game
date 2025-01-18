document.addEventListener("DOMContentLoaded", () => {
    const numElements = [
        document.getElementById("num1"),
        document.getElementById("num2"),
        document.getElementById("num3"),
    ];
    const rollButton = document.getElementById("rollButton");

    let spinCounter = 0; // Tracks the number of spins since the last jackpot
    const pityThreshold = 10; // Number of non-jackpot spins required to trigger pity system

    rollButton.addEventListener("click", () => {
        const finalNumbers = generateNumbersWithPity();

        numElements.forEach((element, index) => {
            // Reset the content to spinning animation
            element.innerHTML = '<span>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9</span>';
            const span = element.querySelector("span");

            // Start the spinning animation
            span.style.animation = `spin 1s ${index * 0.5}s linear`;

            // Stop spinning and set final number
            setTimeout(() => {
                element.innerHTML = finalNumbers[index];
                if (index === numElements.length - 1) {
                    // Check results after all numbers are updated
                    checkResults(finalNumbers);
                }
            }, 1000 + index * 500); // Adjust to match animation timing
        });
    });

    function generateNumbersWithPity() {
        const isPityActive = spinCounter >= pityThreshold;

        if (isPityActive) {
            console.log("50/50 initiated.");
            if (Math.floor(Math.random() * 2) === 1) {
            // Force a jackpot
            console.log("Pity jackpot triggered");
            spinCounter = 0; // Reset pity counter
            return [7, 7, 7];
            } else {
                console.log("50/50 lost.")
            }
        }

        // Otherwise, generate random numbers
        const numbers = [
            Math.floor(Math.random() * 9) + 1,
            Math.floor(Math.random() * 9) + 1,
            Math.floor(Math.random() * 9) + 1,
        ];

        // If not a jackpot, increment the pity counter
        if (!(numbers[0] === numbers[1] && numbers[1] === numbers[2])) {
            spinCounter++;
        } else {
            spinCounter = 0; // Reset pity counter on jackpot
        }

        return numbers;
    }

    function checkResults(numbers) {
        const [a, b, c] = numbers;

        // Check for jackpot (all three numbers the same)
        if (a === b && b === c) {
            document.querySelector(".numbers-border").classList.add("jackpot");
            document.querySelector(".numbers-border").classList.remove("two-match");
        } 
        // Check for two matching numbers
        else if (a === b || b === c || a === c) {
            document.querySelector(".numbers-border").classList.add("two-match");
            document.querySelector(".numbers-border").classList.remove("jackpot");
        } 
        // No match
        else {
            document.querySelector(".numbers-border").classList.remove("jackpot", "two-match");
        }
    }
});
