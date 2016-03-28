var Game = (function() {
  // ========= Model & Controller
  // Model
  var Game = function(secretNumber, maxGuessCount) {
    var userGuessHistory = [];
    var win = false;
    
    this.getSecretNumber = function() {
      return secretNumber;
    };

    this.getMaxGuessCount = function() {
      return maxGuessCount;
    };
    
    this.getUserGuessHistory = function() {
      return userGuessHistory.map(function(guess) {
        return {
          value: guess.value,
          description: guess.description,
          correct: guess.correct,
          temperature: guess.temperature
        };
      }); 
    };

    this.getWin = function() {
      return win;
    };

    this.guessLeft = function() {
      return maxGuessCount - userGuessHistory.length;
    };

    this.validateGuess = function(number) {
      if (win) {
        throw new Error("You already won!");
      }

      if (number < 1 || number > 100) {
        throw new Error("Input must be between 1 and 100!");
      }

      if (getIndex(userGuessHistory, number) > -1) {
        throw new Error("You already tried that number. Try again!");
      }

      if (this.getUserGuessHistory().length >= this.getMaxGuessCount()) {
        throw new Error("Max number of guess reached!");
      }
    };

    this.guess = function(number) {
       var result = {};

       try {
         this.validateGuess(number);
       } catch(e) {
         result['description'] = e;
         result[correct] = false;

         return result;
       }

       var temperature = this.calculateTemperature(number);
       var correct = this.getSecretNumber() === number;

       var guessIsHigherThanAnswer = number > this.getSecretNumber();

       result['value'] = number;
       result['correct'] = correct;
       result['description'] = correct ? "You win!" : "You are " + temperature + ".";

       if (!correct) {
         result['description'] += number > this.getSecretNumber ? " You need to guess lower." : " You need to guess higher."; 
       }

       userGuessHistory.push(result);

       if (correct) {
         win = true;
       }

       return result;
     };
  };

  Game.prototype.calculateTemperature = function(number) {
    var distance = Math.abs(number - this.getSecretNumber());

    if (distance >= 0 && distance < 25) {
      return "fiery hot";
    } 
          
    if (distance >= 25 && distance < 50) {
      return "hot";
    } 
          
    if (distance >= 50 && distance < 75) {
      return "cold";
    }
          
    if (distance >= 75 && distance <= 100) {
      return "ice cold";
    }
  };
 
  // ======== Helper
  function getIndex(arr, number) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].value === number) {
        return i;
      }
    }

    return -1;
  }

  return Game;
})();
