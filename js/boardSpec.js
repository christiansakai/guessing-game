describe("Board", function() {
  var board;

  it("initialize with the correct parameters", function() {
    board = new Board('game-board', 5); 

    expect(board.getBoardId()).toEqual('game-board');
    expect(board.getMaxGuessCount()).toEqual(5);
  });

  it('mount the correct HTML board', function() {
    board = new Board('game-board', 6);

    var renderedHead = "<div class='row'>" +
              "<div class='col-xs-7 col-md-8'>" +
                "<h2 class='text-center title game-title'>" +
                   "Hot or Cold<small>guessing game</small>" + 
                "</h2>" +
              "</div>" +
              "<div class='col-xs-5 col-md-4'>" +
                "<div class='pull-right game-control'>" +
                  "<button class='btn btn-warning' id='game-hint'>Hint</button>" + " " +
                  "<button class='btn btn-primary' id='game-replay'>Replay</button>" +
                "</div>" +
              "</div>" +
            "</div>";

    var renderedBody = "<div class='row'>" +
              "<form class='col-xs-12'>" + 
                "<div class='form-group'>" +
                  "<input type='number' id='game-input' class='form-control center-block game-input' placeholder='1-100'>" +
                  "<p class='help-block text-center bg-danger game-info' id='game-summary'>" +
                    "Enter a number between 1 and 100.<br>" +
                    "You have 6 guesses left." +
                  "</p>" +
                "</div>" +
                "<div class='form-group text-center'>" +
                  "<input type='submit' id='game-guess' value='Guess!' class='btn btn-success btn-lg'>" +
                "</div>" +
              "</form>" +
            "</div>";

      spyOn($.prototype, 'append');
      spyOn($.prototype, 'find');

      board.setupBoard();
      
      expect($.prototype.append).toHaveBeenCalledWith(renderedHead);
      expect($.prototype.append).toHaveBeenCalledWith(renderedBody);
      expect($.prototype.find).toHaveBeenCalledWith('#game-hint');
      expect($.prototype.find).toHaveBeenCalledWith('#game-replay');
      expect($.prototype.find).toHaveBeenCalledWith('#game-input');
      expect($.prototype.find).toHaveBeenCalledWith('#game-summary');
      expect($.prototype.find).toHaveBeenCalledWith('#game-guess');
  });

  it('disable controls', function() {
    board = new Board('game-board', 3);
    board.setupBoard();

    spyOn($.prototype, 'prop');

    board.disableControls();

    expect($.prototype.prop.calls.count()).toEqual(3);
    expect($.prototype.prop.calls.argsFor(0)).toEqual(['disabled', true]);
    expect($.prototype.prop.calls.argsFor(1)).toEqual(['disabled', true]);
    expect($.prototype.prop.calls.argsFor(2)).toEqual(['disabled', true]);
  });

  it("listen for events", function() {
    board = new Board('game-board', 3);
    board.setupBoard();

    var hintSpy = jasmine.createSpy('hint');
    var replaySpy = jasmine.createSpy('replay');
    var inputSpy = jasmine.createSpy('input');
    var guessSpy = jasmine.createSpy('guess');

    spyOn($.fn, 'on');
    spyOn($.fn, 'keypress');

    var actions = {
      hint: hintSpy,
      replay: replaySpy,
      guess: guessSpy
    };

    board.listenToEvents(actions);

    expect($.fn.on.calls.argsFor(0)[0]).toEqual('click');
    expect($.fn.on.calls.argsFor(1)[0]).toEqual('click');
    expect($.fn.on.calls.argsFor(2)[0]).toEqual('click');
    expect($.fn.keypress).toHaveBeenCalled();
  });

  describe('Summary', function() {
    beforeEach(function() {
      board = new Board('game-board', 5);
      board.setupBoard();
      
      spyOn($.fn, 'html');
    });

    it('renders when hot and need to guess lower', function() {
      var description = 'You are hot. You need to guess lower.';
      var guessCountLeft = 4;
      var guessCountSoFar = 1;

      board.renderSummary(description, guessCountLeft, guessCountSoFar);

    var expectedHTML = "You are hot <span class='glyphicon glyphicon-fire'></span>. You need to guess lower <span class='glyphicon glyphicon-download'></span>." + " " +
                      "You have 4 counts left." + " " +
                      "1 counts so far.";

      expect($.fn.html).toHaveBeenCalledWith(expectedHTML);
    });

    it('renders when cold and need to guess higher', function() {
      var description = 'You are cold. You need to guess higher.';
      var guessCountLeft = 0;
      var guessCountSoFar = 4;

      board.renderSummary(description, guessCountLeft, guessCountSoFar);

    var expectedHTML = "You are cold <span class='glyphicon glyphicon-ice-lolly'></span>. You need to guess higher <span class='glyphicon glyphicon-upload'></span>." + " " +
                      "You have 0 counts left." + " " +
                      "4 counts so far.";

      expect($.fn.html).toHaveBeenCalledWith(expectedHTML);
    });

    it('renders when hot and need to guess lower', function() {
      var description = 'You are hot. You need to guess lower.';
      var guessCountLeft = '4';
      var guessCountSoFar = '1';

      board.renderSummary(description, guessCountLeft, guessCountSoFar);

    var expectedHTML = "You are hot <span class='glyphicon glyphicon-fire'></span>. You need to guess lower <span class='glyphicon glyphicon-download'></span>." + " " +
                      "You have 4 counts left." + " " +
                      "1 counts so far.";

      expect($.fn.html).toHaveBeenCalledWith(expectedHTML);
    });

    it('renders when fiery hot and need to guess higher', function() {
      var description = 'You are fiery hot. You need to guess higher.';
      var guessCountLeft = 3;
      var guessCountSoFar = 2;

      board.renderSummary(description, guessCountLeft, guessCountSoFar);

    var expectedHTML = "You are fiery hot <span class='glyphicon glyphicon-fire'></span><span class='glyphicon glyphicon-fire'></span>. You need to guess higher <span class='glyphicon glyphicon-upload'></span>." + " " +
                      "You have 3 counts left." + " " +
                      "2 counts so far.";

      expect($.fn.html).toHaveBeenCalledWith(expectedHTML);
    });

    it('renders when ice cold and need to guess lower', function() {
      var description = 'You are ice cold. You need to guess lower.';
      var guessCountLeft = 1;
      var guessCountSoFar = 4;

      board.renderSummary(description, guessCountLeft, guessCountSoFar);

    var expectedHTML = "You are ice cold <span class='glyphicon glyphicon-ice-lolly'></span><span class='glyphicon glyphicon-ice-lolly'></span>. You need to guess lower <span class='glyphicon glyphicon-download'></span>." + " " +
                      "You have 1 counts left." + " " +
                      "4 counts so far.";

      expect($.fn.html).toHaveBeenCalledWith(expectedHTML);
    });
  });

  describe('Other Renderer', function() {
    beforeEach(function() {
       board = new Board('game-board', 5);
       board.setupBoard();
       
       spyOn($.fn, 'html');
    });

    it('renders error', function() {
      board.renderError("This is an error!");

      expect($.fn.html).toHaveBeenCalledWith("This is an error!");
    });

    it('renders when win', function() {
      board.renderWin();

      var expectedHTML = "You win! Click Replay to play again!";

      expect($.fn.html).toHaveBeenCalledWith(expectedHTML);
    });

    it('renders lose', function() {
      board.renderLose(7);

      var expectedHTML = "You lose! The answer is 7. Click Replay to play again!";

      expect($.fn.html).toHaveBeenCalledWith(expectedHTML);
    });
  });

});

