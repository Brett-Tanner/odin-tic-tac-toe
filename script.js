"use strict";
var _a;
const board = (() => {
    const marks = [];
    const addMark = (mark) => {
        marks.push(mark);
    };
    const colWin = () => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const colOne = [
            ((_a = document.getElementById("11")) === null || _a === void 0 ? void 0 : _a.innerText) || "",
            ((_b = document.getElementById("21")) === null || _b === void 0 ? void 0 : _b.innerText) || "",
            ((_c = document.getElementById("31")) === null || _c === void 0 ? void 0 : _c.innerText) || "",
        ];
        const colTwo = [
            ((_d = document.getElementById("12")) === null || _d === void 0 ? void 0 : _d.innerText) || "",
            ((_e = document.getElementById("22")) === null || _e === void 0 ? void 0 : _e.innerText) || "",
            ((_f = document.getElementById("32")) === null || _f === void 0 ? void 0 : _f.innerText) || "",
        ];
        const colThree = [
            ((_g = document.getElementById("13")) === null || _g === void 0 ? void 0 : _g.innerText) || "",
            ((_h = document.getElementById("23")) === null || _h === void 0 ? void 0 : _h.innerText) || "",
            ((_j = document.getElementById("33")) === null || _j === void 0 ? void 0 : _j.innerText) || "",
        ];
        if (sameSymbol(colOne) || sameSymbol(colTwo) || sameSymbol(colThree)) {
            return true;
        }
        else {
            return false;
        }
    };
    const diagWin = () => {
        var _a, _b, _c, _d, _e, _f;
        const topLeft = [
            ((_a = document.getElementById("11")) === null || _a === void 0 ? void 0 : _a.innerText) || "",
            ((_b = document.getElementById("22")) === null || _b === void 0 ? void 0 : _b.innerText) || "",
            ((_c = document.getElementById("33")) === null || _c === void 0 ? void 0 : _c.innerText) || "",
        ];
        const botLeft = [
            ((_d = document.getElementById("13")) === null || _d === void 0 ? void 0 : _d.innerText) || "",
            ((_e = document.getElementById("22")) === null || _e === void 0 ? void 0 : _e.innerText) || "",
            ((_f = document.getElementById("31")) === null || _f === void 0 ? void 0 : _f.innerText) || "",
        ];
        if (sameSymbol(topLeft) || sameSymbol(botLeft)) {
            return true;
        }
        else {
            return false;
        }
    };
    const printBoard = () => {
        console.log(marks);
    };
    const rowWin = () => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const rowOne = [
            ((_a = document.getElementById("11")) === null || _a === void 0 ? void 0 : _a.innerText) || "",
            ((_b = document.getElementById("12")) === null || _b === void 0 ? void 0 : _b.innerText) || "",
            ((_c = document.getElementById("13")) === null || _c === void 0 ? void 0 : _c.innerText) || "",
        ];
        const rowTwo = [
            ((_d = document.getElementById("21")) === null || _d === void 0 ? void 0 : _d.innerText) || "",
            ((_e = document.getElementById("22")) === null || _e === void 0 ? void 0 : _e.innerText) || "",
            ((_f = document.getElementById("23")) === null || _f === void 0 ? void 0 : _f.innerText) || "",
        ];
        const rowThree = [
            ((_g = document.getElementById("31")) === null || _g === void 0 ? void 0 : _g.innerText) || "",
            ((_h = document.getElementById("32")) === null || _h === void 0 ? void 0 : _h.innerText) || "",
            ((_j = document.getElementById("33")) === null || _j === void 0 ? void 0 : _j.innerText) || "",
        ];
        if (sameSymbol(rowOne) || sameSymbol(rowTwo) || sameSymbol(rowThree)) {
            return true;
        }
        else {
            return false;
        }
    };
    const sameSymbol = (array) => {
        const isX = (string) => {
            if (string === "X") {
                return true;
            }
            else {
                return false;
            }
        };
        const isO = (string) => {
            if (string === "O") {
                return true;
            }
            else {
                return false;
            }
        };
        if (array.every(isX) || array.every(isO)) {
            return true;
        }
        else {
            return false;
        }
    };
    return { addMark, colWin, diagWin, printBoard, rowWin };
})();
const game = (() => {
    const players = [];
    let currentPlayer;
    const addListeners = () => {
        const spaces = document.querySelectorAll(".space");
        spaces.forEach((space) => {
            if (space instanceof HTMLTableCellElement) {
                space.addEventListener("click", () => {
                    space.innerText = currentPlayer.symbol;
                });
            }
            else {
                throw new Error("At least one space isn't a table cell");
            }
        });
    };
    const createPlayers = () => {
        var _a;
        const playerOneInput = document.getElementById("playerOneName");
        const playerOneName = playerOneInput instanceof HTMLInputElement
            ? playerOneInput === null || playerOneInput === void 0 ? void 0 : playerOneInput.value
            : "Player 1";
        players[0] = playerFactory(playerOneName, Math.random() > 0.5 ? "X" : "O");
        const playerTwoInput = document.getElementById("playerTwoName");
        const playerTwoName = playerTwoInput instanceof HTMLInputElement
            ? playerTwoInput === null || playerTwoInput === void 0 ? void 0 : playerTwoInput.value
            : "Player 2";
        players[1] = playerFactory(playerTwoName, players[0].symbol == "X" ? "O" : "X");
        players.forEach((player) => {
            const playerInfoDiv = document.getElementById(`p${players.indexOf(player) + 1}Info`);
            playerInfoDiv.innerHTML = "";
            const playerName = document.createElement("h4");
            playerName.innerText = player.name;
            playerInfoDiv === null || playerInfoDiv === void 0 ? void 0 : playerInfoDiv.appendChild(playerName);
            const playerSymbol = document.createElement("p");
            playerSymbol.innerText = player.symbol;
            playerInfoDiv === null || playerInfoDiv === void 0 ? void 0 : playerInfoDiv.appendChild(playerSymbol);
        });
        (_a = document.getElementById("startButton")) === null || _a === void 0 ? void 0 : _a.classList.add("d-none");
        currentPlayer = players[0];
    };
    const congratulate = (name) => {
        alert(`Nice job ${name}, you win!`);
    };
    const over = () => {
        if (board.rowWin() || board.colWin() || board.diagWin()) {
            return true;
        }
        else {
            return false;
        }
    };
    const start = () => {
        createPlayers();
        addListeners();
    };
    return { start };
})();
const markFactory = (symbol, x, y) => {
    return { symbol, x };
};
const playerFactory = (name, symbol) => {
    return { name, symbol };
};
(_a = document.getElementById("startButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", game.start);
