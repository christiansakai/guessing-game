describe("Game", function() {
  var game;

  beforeEach(function() {
    game = new Game(10, 5);
  });
  
  it("initializes with correct parameters", function() {
    expect(game.getSecretNumber()).toEqual(10);
    expect(game.getMaxGuessCount()).toEqual(5);
    expect(game.getUserGuessHistory().length).toEqual(0);
    expect(game.guessLeftCount()).toEqual(5);
    expect(game.getWinLose()).toEqual(undefined);
  });

  describe('Input Validation', function() {
    var wrapper = function(number) {
      return function() {
        game.guess(number);
      };
    };

    it("should throw when you already lost", function() {
      game = new Game(30, 1);
      game.guess(2);

      expect(wrapper(0)).toThrow(new Error("You already lost!"));
    });

    it("should throw when you already won", function() {
      game = new Game(22, 5);
      game.guess(22);

      expect(wrapper(1)).toThrow(new Error("You already won!"));
    });

    it("should throw when input not between 1 and 100", function() {
      game = new Game(22, 5);

      expect(wrapper(0)).toThrow(new Error("Input must be between 1 and 100!"));

      expect(wrapper(101)).toThrow(new Error("Input must be between 1 and 100!"));
    });

    it("should throw when you already tried a number", function() {
      game = new Game(22, 5);
      game.guess(1);

      expect(wrapper(1)).toThrow(new Error("You already tried that number. Try again!"));
    });
  });

  describe('Surrender', function() {
    it('should be able to surrender and give back the correct answer', function() {
      var answer = game.surrender();

      expect(answer).toEqual(10);
      expect(game.getWinLose()).toEqual('lose');
    });

    it('should not be able to guess after lost', function() {
      game.surrender();
      
      var wrapper = function(number) {
        return function() {
          game.guess(number);
        };
      };

      expect(wrapper(5)).toThrow(new Error('You already lost!'));
    });
  });

  describe('Guess', function() {
    it("should give correct summary, history, and guess left ", function() {
      game = new Game(20, 3); 

      var guessSummary = game.guess(10);
      var guessHistory = game.getUserGuessHistory();

      expect(guessSummary).toEqual({
        value: 10,
        description: 'You are fiery hot. You need to guess higher.',
        correct: false
      });

      expect(guessSummary).toEqual(guessHistory[0]);
      expect(game.guessLeftCount()).toEqual(2);
      expect(game.getWinLose()).toEqual(undefined);
    });

    it("should give correct summary, history and guess left", function() {
      game = new Game(20, 3); 

      var guessSummary = game.guess(20);
      var guessHistory = game.getUserGuessHistory();

      expect(guessSummary).toEqual({
        value: 20,
        description: 'You win!',
        correct: true
      });

      expect(guessSummary).toEqual(guessHistory[0]);
      expect(game.guessLeftCount()).toEqual(2);
      expect(game.getWinLose()).toEqual('win');
    });

    it("should give correct summary, history and guess left", function() {
      game = new Game(20, 3); 

      game.guess(4);
      game.guess(10);

      var guessSummary = game.guess(20);
      var guessHistory = game.getUserGuessHistory();

      expect(guessSummary).toEqual({
        value: 20,
        description: 'You win!',
        correct: true
      });

      expect(guessSummary).toEqual(guessHistory[guessHistory.length - 1]);
      expect(game.guessLeftCount()).toEqual(0);
      expect(game.getWinLose()).toEqual('win');
    });

    it("should give correct summary, history and guess left", function() {
      game = new Game(20, 3); 

      game.guess(4);
      game.guess(10);

      var guessSummary = game.guess(11);
      var guessHistory = game.getUserGuessHistory();

      expect(guessSummary).toEqual({
        value: 11,
        description: 'You lose!',
        correct: false
      });

      expect(guessSummary).toEqual(guessHistory[guessHistory.length - 1]);
      expect(game.guessLeftCount()).toEqual(0);
      expect(game.getWinLose()).toEqual('lose');
    });
  });
  
});

