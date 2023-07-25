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
  const players: player[] = [];

  const createPlayers = () => {
    const playerOneInput = document.getElementById("playerOneName");
    const playerOneName =
      playerOneInput instanceof HTMLInputElement
        ? playerOneInput?.value
        : "Player 1";
    players[0] = playerFactory(playerOneName, Math.random() > 0.5 ? "X" : "O");
    const playerTwoInput = document.getElementById("playerTwoName");
    const playerTwoName =
      playerTwoInput instanceof HTMLInputElement
        ? playerTwoInput?.value
        : "Player 2";
    players[1] = playerFactory(
      playerTwoName,
      players[0].symbol == "X" ? "O" : "X"
    );

    players.forEach((player) => {
      const playerInfoDiv = document.getElementById(
        `p${players.indexOf(player) + 1}Info`
      );
      playerInfoDiv!.innerHTML = "";
      const playerName = document.createElement("h4");
      playerName.innerText = player.name;
      playerInfoDiv?.appendChild(playerName);
      const playerSymbol = document.createElement("p");
      playerSymbol.innerText = player.symbol;
      playerInfoDiv?.appendChild(playerSymbol);
    });

    document.getElementById("startButton")?.classList.add("d-none");
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

interface player {
  name: string;
  symbol: "X" | "O";
}

const playerFactory = (name: string, symbol: "X" | "O") => {
  return { name, symbol };
};
