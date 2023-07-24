const board = (() => {
  const marks: mark[] = [];

  const addMark = (mark: mark) => {
    marks.push(mark);
  };

  const colWin = () => {
    const colOne: string[] = [
      document.getElementById("11")?.innerText || "",
      document.getElementById("21")?.innerText || "",
      document.getElementById("31")?.innerText || "",
    ];
    const colTwo: string[] = [
      document.getElementById("12")?.innerText || "",
      document.getElementById("22")?.innerText || "",
      document.getElementById("32")?.innerText || "",
    ];
    const colThree: string[] = [
      document.getElementById("13")?.innerText || "",
      document.getElementById("23")?.innerText || "",
      document.getElementById("33")?.innerText || "",
    ];
    if (sameSymbol(colOne) || sameSymbol(colTwo) || sameSymbol(colThree)) {
      return true;
    } else {
      return false;
    }
  };

  const diagWin = () => {
    const topLeft: string[] = [
      document.getElementById("11")?.innerText || "",
      document.getElementById("22")?.innerText || "",
      document.getElementById("33")?.innerText || "",
    ];
    const botLeft: string[] = [
      document.getElementById("13")?.innerText || "",
      document.getElementById("22")?.innerText || "",
      document.getElementById("31")?.innerText || "",
    ];
    if (sameSymbol(topLeft) || sameSymbol(botLeft)) {
      return true;
    } else {
      return false;
    }
  };

  const printBoard = () => {
    console.log(marks);
  };

  const rowWin = () => {
    const rowOne: string[] = [
      document.getElementById("11")?.innerText || "",
      document.getElementById("12")?.innerText || "",
      document.getElementById("13")?.innerText || "",
    ];
    const rowTwo: string[] = [
      document.getElementById("21")?.innerText || "",
      document.getElementById("22")?.innerText || "",
      document.getElementById("23")?.innerText || "",
    ];
    const rowThree: string[] = [
      document.getElementById("31")?.innerText || "",
      document.getElementById("32")?.innerText || "",
      document.getElementById("33")?.innerText || "",
    ];
    if (sameSymbol(rowOne) || sameSymbol(rowTwo) || sameSymbol(rowThree)) {
      return true;
    } else {
      return false;
    }
  };

  const sameSymbol = (array: string[]) => {
    const isX = (string: string) => {
      if (string === "X") {
        return true;
      } else {
        return false;
      }
    };

    const isO = (string: string) => {
      if (string === "O") {
        return true;
      } else {
        return false;
      }
    };

    if (array.every(isX) || array.every(isO)) {
      return true;
    } else {
      return false;
    }
  };

  return { addMark, colWin, diagWin, printBoard, rowWin };
})();

const game = (() => {
  let playerOne;
  let playerTwo;

  const createPlayers = () => {
    const playerOneName: string =
      document.getElementById("p1name")?.innerText || "Player 1";
    playerOne = playerFactory(playerOneName, Math.random() > 0.5 ? "X" : "O");
    const playerTwoName: string =
      document.getElementById("p2name")?.innerText || "Player 2";
    playerTwo = playerFactory(
      playerTwoName,
      playerOne.symbol == "X" ? "O" : "X"
    );
  };

  const congratulate = (name: string) => {
    alert(`Nice job ${name}, you win!`);
  };

  const over = () => {
    if (board.rowWin() || board.colWin() || board.diagWin()) {
      return true;
    } else {
      return false;
    }
  };

  const start = () => {
    createPlayers();
  };

  return { start };
})();

type coordinate = 1 | 2 | 3;

interface mark {
  symbol: "X" | "Y";
  x: coordinate;
  y: coordinate;
}

const markFactory = (symbol: string, x: coordinate, y: coordinate) => {
  return { symbol, x };
};

const playerFactory = (name: string, symbol: "X" | "O") => {
  return { name, symbol };
};
