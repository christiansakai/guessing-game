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
  }

  function hint() {
    view.renderLose(hotCold.surrender());

    view.disableControls();
  }

  view.listenToEvents({
    replay: startGame,
    guess: guess,
    hint: hint
  });



//   // ===========View
//   // =====jQuery Additional Plugins
//   $.fn.visible = function() {
//     return this.css('visibility', 'visible');
//   };
//   $.fn.invisible = function() {
//     return this.css('visibility', 'hidden');
//   };
//   $.fn.visibilityToggle = function() {
//     return this.css('visibility', function(i, visibility) {
//       return (visibility == 'visible') ? 'hidden' : 'visible';
//     });
//   };

//   // =====jQuery DOM Variable & Function
//   var dom = {
//       dom['hot-cold'].invisible().text('This is a hot-cold hint');
//     },
//     checkUserInputAndPlay: function() {
//       var userGuess = parseInt(dom['input'].val(), 10);
//       var checkUserInput = app.checkUserInput(userGuess);
//       var guessNumberAndSetTemperature = function(userGuess) {
//         var number = app.__get('number');
//         var temperature = function(userGuess) {
//           var distance = Math.abs(userGuess - number);

//           if ((distance >= 1) && (distance < 20)) {
//             return "Super hot";
//           } else if ((distance >= 20) && (distance < 40)) {
//             return "Hot";
//           } else if ((distance >= 40) && (distance < 60)) {
//             return "Warm";
//           } else if ((distance >= 60) && (distance < 80)) {
//             return "Cold";
//           } else if ((distance >= 80) && (distance < 100)) {
//             return "Ice cold";
//           }
//         };

//         switch (temperature(userGuess)) {
//           case 'Super hot':
//           case 'Hot':
//           case 'Warm':
//             dom['hot-cold'].text(temperature(userGuess) + '! ').visible();
//             var hot = document.createElement('p');
//             hot.innerHTML = userGuess.toString();
//             dom['hot'].append(hot);
//             break;
//           case 'Cold':
//           case 'Ice cold':
//             dom['hot-cold'].text(temperature(userGuess) + '. ').visible();
//             var cold = document.createElement('p');
//             cold.innerHTML = userGuess.toString();
//             dom['cold'].append(cold);
//         }

//         var higherLower = function(userGuess) {
//           if (userGuess < number) {
//             return 'Guess higher';
//           } else {
//             return 'Guess lower'
//           }
//         };

//         switch (higherLower(userGuess)) {
//           case 'Guess higher':
//             dom['higher-lower'].text('Guess higher! ').visible();
//             break;
//           case 'Guess lower':
//             dom['higher-lower'].text('Guess lower! ').visible();
//             break;
//         }
//         return app.guessNumber(userGuess);
//       };

//       if (checkUserInput !== true) {
//         dom['hot-cold'].text(checkUserInput).visible();
//         setTimeout(dom.resetAndHideHotCold, 3000);
//       } else {
//         var win = guessNumberAndSetTemperature(userGuess);
//         var guessCount = app.__get('guessCount');

//         if (guessCount === 0) dom.gameOverLose();

//         dom['guess-remaining'].text(guessCount.toString());
//         if (win) {
//           dom.gameOverWin();
//         }
//       }
//     },
//     giveHint: function() {
//       var answer = app.__get('number');
//       dom['hint'].text(answer);
//     },
//     disableControl: function() {
//       dom['input'].prop('disabled', true);
//       dom['submit'].prop('disabled', true);
//       dom['give-hint'].prop('disabled', true);
//       dom['higher-lower'].text('Play again? ').visible();
//     },
//     gameOverLose: function() {
//       if (app.__get('guessCount') !== 0) {
//         app.__set('guessCount', 0);
//         dom['guess-remaining'].text('0');
//       }
//       dom['hot-cold'].text('You lose!').visible();
//       dom.disableControl();
//       $('body').addClass('animated swing');
//     },
//     gameOverWin: function() {
//       dom['hot-cold'].text('You win!').visible();
//       dom.disableControl();
//       $('body').addClass('animated tada');
//     }
//   };

//   // =====jQuery DOM Event Listener
//   dom['input'].keypress(function(e) {
//     if (e.which === 13) {
//       dom.checkUserInputAndPlay();
//     }
//   });

//   dom['submit'].on('click', function() {
//     dom.checkUserInputAndPlay();
//   });

//   dom['play-again'].on('click', function() {
//     document.location.reload(true);
//   });

//   dom['give-hint'].on('click', function() {
//     dom.giveHint();
//     dom.gameOverLose();
//   });

//   // =====Answer
//   console.log('Answer: ', app.__get('number'));
});
