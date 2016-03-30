var Game = (function() {
  // ========= Model & Controller
  // Model
  var Game = function(secretNumber, maxGuessCount) {
    var userGuessHistory = [];
    var winLose;
    
    // Getters
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
          correct: guess.correct
        };
      }); 
    };

    this.getWinLose = function() {
      return winLose;
    };

    // Logic
    this.guess = function(number) {
      validateGuess(number);

      var result = {
        'value': number,
        'correct': this.getSecretNumber() === number
      };

      // If the answer is correct
      if (result.correct) {
        winLose = 'win';
        result['description'] = 'You win!';

        userGuessHistory.push(result);

        return result;
      }

      // If it is not correct
      // check if it is the last guess
      // lose the game
      if (this.getUserGuessHistory().length === this.getMaxGuessCount() - 1) {
        winLose = 'lose';
        result['description'] = 'You lose!';

        userGuessHistory.push(result);

        return result;
      }

      var temperature = calculateTemperature(number, this.getSecretNumber());
      var guessIsHigherThanAnswer = number > this.getSecretNumber();
      var description = "You are " + temperature + ".";

      if (guessIsHigherThanAnswer) {
        description += " You need to guess lower.";
      } else {
        description += " You need to guess higher.";
      }

      result['description'] = description;

      userGuessHistory.push(result);

      return result;
    };

    this.surrender = function() {
      winLose = 'lose';

      return this.getSecretNumber();
    };
  
    var validateGuess = (function(number) {
      if (this.getWinLose() === 'lose') {
        throw new Error("You already lost!");
      }

      if (this.getWinLose() === 'win') {
        throw new Error("You already won!");
      }

      if (number < 1 || number > 100) {
        throw new Error("Input must be between 1 and 100!");
      }

      if (getIndex(this.getUserGuessHistory(), number) > -1) {
        throw new Error("You already tried that number. Try again!");
      }
    }).bind(this);
  };

  Game.prototype.guessLeftCount = function() {
    return this.getMaxGuessCount() - this.getUserGuessHistory().length;
  };

  // ======== Helpers
  function calculateTemperature(numA, numB) {
    var distance = Math.abs(numA - numB);

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
  }

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
