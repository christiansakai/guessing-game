describe("Game", function() {
  var game;

  beforeEach(function() {
    game = new Game(10, 5);
  });
  
  it("initializes with correct parameters", function() {
    expect(game.getSecretNumber()).toEqual(10);
    expect(game.getMaxGuessCount()).toEqual(5);
    expect(game.getUserGuessHistory().length).toEqual(0);
    expect(game.guessLeft()).toEqual(5);
    expect(game.getWin()).toEqual(false);
  });

  it("calculates the correct temperature", function() {
    expect(game.calculateTemperature(10)).toEqual("fiery hot");
    expect(game.calculateTemperature(35)).toEqual("hot");
    expect(game.calculateTemperature(60)).toEqual("cold");
    expect(game.calculateTemperature(90)).toEqual("ice cold");
  });

  describe('Input Validation', function() {
    var wrapper = function(number) {
      return function() {
        game.validateGuess(number);
      };
    };

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

    it("should throw when you already won", function() {
      game = new Game(22, 5);
      game.guess(22);

      expect(wrapper(1)).toThrow(new Error("You already won!"));
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
      expect(game.guessLeft()).toEqual(2);
      expect(game.getWin()).toEqual(false);
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
      expect(game.guessLeft()).toEqual(2);
      expect(game.getWin()).toEqual(true);
    });
  });
  
});

