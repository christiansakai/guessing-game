$(document).ready(function() {

  /**
   * Start Game
   * with a random number
   * and 5 guesses max 
   */
  var maxGuessCount = 5;
  var gameBoardId = 'game-board';
  var secretNumber;
  var hotCold;
  var view;

  function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;

    hotCold = new Game(secretNumber, maxGuessCount);
    view = new Board(gameBoardId, maxGuessCount);

    view.setupBoard();

    view.listenToEvents({
      replay: startGame,
      guess: guess,
      hint: hint
    });


    // Check answer for debugging purposes
    console.log("Answer is ", secretNumber);
  };

  startGame();

  function guess(value) {
    var guessSummary;

    try {
      guessSummary = hotCold.guess(value);
    } catch (e) {
      return view.renderError(e);
    }

    if (hotCold.getWinLose() === 'win') {
      view.renderWin();
      return view.disableControls();
    }

    if (hotCold.getWinLose() === 'lose') {
      view.renderLose(hotCold.getSecretNumber());
      return view.disableControls();
    }

    var description = guessSummary.description;
    var guessCountLeft = hotCold.guessLeftCount();
    var guessCountSoFar = hotCold.getMaxGuessCount() - hotCold.guessLeftCount(); 

    view.renderSummary(description, guessCountLeft, guessCountSoFar);
  }

  function hint() {
    view.renderLose(hotCold.surrender());

    view.disableControls();
  }
});
