// constant 
const controlForm = document.querySelector(".controlForm")
const gameGrid = document.querySelector(".gameContainer")
const balanceAmountElement = document.querySelector("#BalanceInput")
const bidAmountElement = document.querySelector("#bidInput")
const mineCountElement = document.querySelector("#mineInput")
const cashoutBtn = document.querySelector(".cashout")
const startBtn = document.querySelector(".startBtn")
const defaultTiles = `<div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>`
// variables
let balanceAmount
let bidAmount
let mineCount
let safe
let tiles = [
    { no: 1, flag: "" },
    { no: 2, flag: "" },
    { no: 3, flag: "" },
    { no: 4, flag: "" },
    { no: 5, flag: "" },
    { no: 6, flag: "" },
    { no: 7, flag: "" },
    { no: 8, flag: "" },
    { no: 9, flag: "" },
    { no: 10, flag: "" },
    { no: 11, flag: "" },
    { no: 12, flag: "" },
    { no: 13, flag: "" },
    { no: 14, flag: "" },
    { no: 15, flag: "" },
    { no: 16, flag: "" },
    { no: 17, flag: "" },
    { no: 18, flag: "" },
    { no: 19, flag: "" },
    { no: 20, flag: "" },
    { no: 21, flag: "" },
    { no: 22, flag: "" },
    { no: 23, flag: "" },
    { no: 24, flag: "" },
    { no: 25, flag: "" }
];
let greenBrokenTiles = []
let redBrokenTiles = []
let isGameOn

// onload function
window.onload = function () {
    startGame();
}

// eventListners
cashoutBtn.addEventListener("click", function () {
    startBtn.style.display = "block"
    cashoutBtn.style.display = "none"

    bidAmountElement.removeAttribute("disabled");
    mineCountElement.removeAttribute("disabled");
    document.querySelector(".result").style.display = 'none'
    document.querySelector(".lost").style.display = 'none'
    gameGrid.innerHTML = defaultTiles

    clearflags()
    isGameOn = false
    calculator()
})

// functions
function startGame() {
    controlForm.addEventListener('submit', function (e) {
        e.preventDefault()
        balanceAmount = Number(balanceAmountElement.value)
        bidAmount = Number(bidAmountElement.value)
        mineCount = Number(mineCountElement.value)

        if (balanceAmount >= bidAmount) {
            startBtn.style.display = "none";
            cashoutBtn.style.display = "block";
            document.querySelector(".result").style.display = 'grid'
            document.querySelector(".lost").style.display = 'none'
            bidAmountElement.setAttribute("disabled", "true");
            mineCountElement.setAttribute("disabled", "true");
            isGameOn = true;
            balanceAmountElement.value -= bidAmount
            randomMineGenerator()
        }
        else {

            isGameOn = false
            alert("you bidded more than balance amount")
            bidAmountElement.value = 10
        }
    })
}

function cashOut() {
    clearflags()
    greenBrokenTiles = []
    redBrokenTiles = []
}

function randomMineGenerator() {
    clearflags();
    let safeArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    for (i = 0; i < mineCount; i++) {
        let randomtile = Math.floor(Math.random() * safeArr.length)

        if (randomtile > safeArr.length - 1) {
            randomtile = safeArr.length - 1
        } else if (randomtile < 0) {
            randomtile = 0
        }

        tiles[safeArr[randomtile]].flag = 'mine'
        safeArr.splice(randomtile, 1)
    }
    showTiles();
}

function showTiles() {
    gameGrid.innerHTML = "";
    tiles.forEach(function (obj) {
        let tileElement = document.createElement('div')
        tileElement.setAttribute('class', `tile ${obj.flag}`);
        gameGrid.appendChild(tileElement)
    })

    cashOut()
    breaktile();
}

function clearflags() {
    let multiplier = document.querySelector('.actual-multiplier')
    let total = document.querySelector('.total')

    tiles.forEach(function (obj) {
        obj.flag = "";
    })
    multiplier.innerHTML = 0.99
    total.innerHTML = 0
}

function breaktile() {
    const tileArr = document.querySelectorAll(".tile");

    tileArr.forEach(function (t, id) {

        t.addEventListener('click', function () {

            if (t.className != 'tile mine') {
                if (isGameOn) {
                    t.style.backgroundColor = 'greenyellow';
                    if (!(greenBrokenTiles.includes(id))) {
                        greenBrokenTiles.push(id)
                        message()
                    }
                    restart()
                }
            }
            else {
                if (isGameOn) {
                    t.style.backgroundColor = 'red';
                    if (!(redBrokenTiles.includes(id))) {
                        redBrokenTiles.push(id)
                    }
                    isGameOn = false
                    document.querySelector(".result").style.display = 'none'
                    document.querySelector(".lost").style.display = 'grid'
                    revealTiles()
                    clearflags()
                }
            }
        })
    })
}

function revealTiles() {
    const tileArr = document.querySelectorAll(".tile");

    tileArr.forEach(function (t, id) {
        if (!(greenBrokenTiles.includes(id))) {
            if (t.className != 'tile mine') {
                t.style.backgroundColor = '#adff2f50';
            }

        }
        if (!(redBrokenTiles.includes(id))) {
            if (t.className == 'tile mine') {
                t.style.backgroundColor = '#ff000050';
            }
        }
    })
}

function message() {
    let m = calculator()
    let multiplier = document.querySelector('.actual-multiplier')
    let total = document.querySelector('.total')

    multiplier.innerHTML = m
    total.innerHTML = Number(((m * bidAmount) - bidAmount).toFixed(2))
}

function restart() {
    let clearTiles = 25 - Number(mineCountElement.value)

    if (clearTiles == greenBrokenTiles.length) {
        revealTiles();
    }

}

function calculator() {

    let m = Number(document.querySelector('#mineInput').value);
    let d = greenBrokenTiles.length
    let redMineCount = redBrokenTiles.length
    let bet = parseFloat(document.querySelector('#bidInput').value);
    let n = 25;
    let x = 25 - m;
    let finalVal
    let first
    let second
    let multiplier
    let bal = Number(balanceAmountElement.value)

    function factorial(number) {
        if (number == 0) {
            return 1
        }
        else {
            let value = number;
            for (let i = number; i > 1; i--) {
                value *= i - 1;
            }
            return value;
        }
    };

    function combination(n, d) {
        if (n == d) return 1;
        let ans = factorial(n) / (factorial(d) * factorial(n - d));
        return ans;
    };

    first = combination(n, d);
    second = combination(x, d);
    multiplier = 0.99 * (first / second);
    multiplier = Math.round(multiplier * 100) / 100;

    if (!redMineCount && !isGameOn) {
        finalVal = Number((bet * multiplier))
        bal += finalVal
        bal = Number(bal.toFixed(2))
        balanceAmountElement.value = bal.toFixed(2)
    }

    return multiplier;
}
