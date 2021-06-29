let rlSync = require('readline-sync');

let Square = {
  UNUSED_SQUARE   : " ",
  HUMAN_MARKER    : "X",
  COMPUTER_MARKER : "O",

  init(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
    return this;
  },
  toString() {
    return this.marker;
  },
  setMarker(marker) {
    this.marker = marker;
  },
  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  },
  getMarker() {
    return this.marker;
  }
}


let Board = {
  init() {
    this.squares = {};
    for (let counter = 1; counter <= 9; counter += 1) {
      this.squares[String(counter)] = Object.create(Square).init();
    }
    return this;
  },
  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  },
  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  },
  isFull() {
    return this.unusedSquares().length === 0;
  },
  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });
    return markers.length;
  },
  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }
}


const PlayerPrototype = {
  initialize(marker) {
    this.marker = marker;
    return this;
  },

  getMarker() {
    return this.marker;
  }
};

let Human = Object.create(PlayerPrototype);

Human.init = function() {
  return this.initialize(Square.HUMAN_MARKER);
}

let Computer = Object.create(PlayerPrototype);

Computer.init = function() {
  return this.initialize(Square.COMPUTER_MARKER);
}


let TTTGame = {
  POSSIBLE_WINNING_ROWS: [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"]
  ],
  init() {
    this.board = Object.create(Board).init(); 
    this.human = Object.create(Human).init();
    this.computer = Object.create(Computer).init();
    return this;
  },
  displayWelcomeMessage() {
    console.log("--------------Welcome to TIC TAC TOE!-------------");
  },
  displayGoodbyeMessage() {
    console.log("----------Thank you for playing, Goodbye!---------");
  },
  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  },
  humanMoves() {
    let choice;
  
    while (true) {
      let validChoices = this.board.unusedSquares();
      choice = rlSync.question(`Choose a square (${validChoices.join(", ")}):`);
  
      if (validChoices.includes(choice)) break;
      console.log("Sorry, that's not a valid choice. \n");
    }
  
    this.board.markSquareAt(choice, Square.HUMAN_MARKER);
  },
  computerMoves() {
    let choice;
    let validChoices = this.board.unusedSquares();

    do {
      let index = Math.floor((Math.random() * validChoices.length) + 1);
      choice = validChoices[index];
    } while (!validChoices.includes(choice));

    this.board.markSquareAt(choice, Square.COMPUTER_MARKER);
  },
  gameOver() {
    return this.board.isFull() || this.someoneWon();
  },
  someoneWon() {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(this.human, row) === 3 ||
              this.board.countMarkersFor(this.computer, row) === 3;
    });
  },
  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  },
  play() {

    while (true) {
      console.clear();

      if (this.board.unusedSquares().length === 9) {
        this.displayWelcomeMessage();
      } else {
        console.log("");
      }

      this.board.display();

      this.humanMoves();

      if (this.gameOver()) break;

      this.computerMoves();

      if (this.gameOver()) break;
    }

    this.displayResults();
    this.displayGoodbyeMessage();
  }
}

let game = Object.create(TTTGame).init();
game.play();