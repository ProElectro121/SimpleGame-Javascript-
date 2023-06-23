const prompt = require("prompt-sync")(); // user input

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = { //frequencey of 
    "A": 2 ,
    "B": 4 ,
    "C": 6 ,
    "D": 8
}

const SYMBOL_VALUE = { // multiplier after number will same in a row
    "A": 5 ,
    "B": 4 ,
    "C": 3 ,
    "D": 2
}

const deposit = () => {
    while(1) {
        const depositAmount = prompt("Enter a deposit amount: "); // string input
         const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount , try again");
        } else {
            return numberDepositAmount;
        }
    }
};


const getNumberOflines = () => {
    while(1) {
        const numberofLines = prompt("Enter number of lines to bet on(1 - 3): "); // string input
        const intNumberofLines = parseFloat(numberofLines);

        if(isNaN(intNumberofLines) || intNumberofLines <= 0 || intNumberofLines > 3) {
            console.log("Invalid number of lines , try again.");
        } else {
            return intNumberofLines;
        }
    }
}

const getBet = (balance , lines) => {
    while(1) {
        const bet = prompt("Enter the total Bet pre line: "); // string input
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet * lines > balance || numberBet <= 0) {
            console.log("Invalid bet , try again.");
        } else {
            return numberBet;
        }
    }
}

const spin= () => {
    const symbols = [];
    for(const [symbol , count] of Object.entries(SYMBOL_COUNT)) {
        let counts = count;
        while(counts--) {
            symbols.push(symbol);
        }
    }
    const reels = [];

    for(let i = 0; i < ROWS; i++) {
        reels.push([]);
        const reelSYmbols = [...symbols];
        for(let j = 0; j < COLS; j++) {
            let randomIndex = Math.floor(Math.random() * reelSYmbols.length);
            reels[i].push(reelSYmbols[randomIndex]);
            reelSYmbols.slice(randomIndex , 1);
        }
    }
    return reels;
}

const transpose = (reels) => {
    let n = reels.length;
    let m = reels[0].length;
    const transposeReels = [];
    for(let i = 0; i < m; i++) {
        const temp = [];
        for(let j = 0; j < n; j++) {
            temp.push(reels[j][i]);
        }
        transposeReels.push(temp);
    }
    return transposeReels;
}


const printRows = (reels) => {
    for(const row of reels) {
        let rowString = "";

        for(const [i , symbol] of row.entries()) { // index and element
            rowString += symbol;
            if(i < row.length - 1) {
                rowString += " |";
            }
        }
        console.log(rowString);
    }
}

const getWinning = (reels , bet , lines) => {

    let Winning  =  0;
    for(let i = 0; i < lines; i++) {
        let allEqual = true;

        for(const symbol of reels[i]) {
            if(symbol != reels[i][0]) {
                allEqual = false;
                break;
            }
        }
        if(allEqual) {
            Winning += bet * SYMBOL_VALUE[reels[i][0]];
        }
    }
    return Winning;
}
var ch = 'y'
const game =() => {
    let balance = deposit();
    while(1) {
        console.log("You have a balance of $" + balance);
        const  numberofLines = getNumberOflines();
        const bet = getBet(balance , numberofLines); 
        balance -= bet * numberofLines;
        const reels = spin();
        const transposeReels = transpose(reels);
        printRows(transposeReels);
        const winnings = getWinning(transposeReels , bet , numberofLines);
    
        console.log("You won: $" + winnings);
        balance += winnings;
        if(balance <= 0) {
            console.log("You ran out of money. Thanks for playing\n");
            break;
        }

        const playagain = prompt("Do you want to play again  (y / n) ?");

        if(playagain != "y") {
            console.log("Thanks for playing.");
            break;
        }
    }
}

game();

