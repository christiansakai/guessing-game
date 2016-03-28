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
      board.mountBoard();
      
      expect($.prototype.append).toHaveBeenCalledWith(renderedHead);
      expect($.prototype.append).toHaveBeenCalledWith(renderedBody);

      // TODO
      // Test for $('#game-board') to have been called
  });

  // TODO
  // Test for initialize selectors

  it('sets up board', function() {
    board = new Board('game-board', 4);

    spyOn(board, 'mountBoard');
    spyOn(board, 'initializeSelectors');

    board.setupBoard();

    expect(board.mountBoard).toHaveBeenCalled();
    expect(board.initializeSelectors).toHaveBeenCalled();
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
    // TODO
    // Event listener test
    board = new Board('game-board', 3);
    var hintSpy = jasmine.createSpy('hint');
    var replaySpy = jasmine.createSpy('replay');
    var inputSpy = jasmine.createSpy('input');
    var guessSpy = jasmine.createSpy('guess');

    board.listenToEvents({
      hint: hintSpy,
      replay: replaySpy,
      guess: guess
    });

  });
  
});

