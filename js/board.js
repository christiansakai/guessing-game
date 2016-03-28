var Board = (function($) {
  var Board = function(boardId, maxGuessCount) {
    this.getBoardId = function() {
      return boardId;
    };

    this.getMaxGuessCount = function() {
      return maxGuessCount;
    };
  };

  // Original Renderer
  var renderHeader = function() {
    return "<div class='row'>" +
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
  };

  var renderBody = function(maxGuessCount) {
    return "<div class='row'>" +
              "<form class='col-xs-12'>" + 
                "<div class='form-group'>" +
                  "<input type='number' id='game-input' class='form-control center-block game-input' placeholder='1-100'>" +
                  "<p class='help-block text-center bg-danger game-info' id='game-summary'>" +
                    "Enter a number between 1 and 100.<br>" +
                    "You have " + maxGuessCount + " guesses left." +
                  "</p>" +
                "</div>" +
                "<div class='form-group text-center'>" +
                  "<input type='submit' id='game-guess' value='Guess!' class='btn btn-success btn-lg'>" +
                "</div>" +
              "</form>" +
            "</div>";
  };

  Board.prototype.mountBoard = function() {
    var boardElement = $('#' + this.getBoardId());
    var header = renderHeader();
    var body = renderBody(this.getMaxGuessCount());

    boardElement.append(header);
    boardElement.append(body);
  };

  // Event Handler Setup
  var dom;
  
  Board.prototype.initializeSelectors = function() {
    dom = {
      'hint': $('#game-hint'),
      'replay': $('#game-replay'),
      'input': $('#game-input'),
      'summary': $('#game-summary'),
      'guess': $('#game-guess')
    };
  };

  Board.prototype.setupBoard = function() {
    this.mountBoard();
    this.initializeSelectors();
  };

  Board.prototype.disableControls = function() {
    dom['input'].prop('disabled', true);
    dom['guess'].prop('disabled', true);
    dom['hint'].prop('disabled', true);
  };

  Board.prototype.listenToEvents = function(actions) {
    dom['hint'].on('click', function() {
      actions.hint();
    });

    dom['replay'].on('click', function() {
      actions.replay();
    });

    dom['input'].keypress(function(e) {
      if (e.which === 13 &&
          e.currentTarget.value) {
        e.preventDefault();
        actions.guess(parseInt(e.currentTarget.value));
      }
    });

    dom['guess'].on('click', function(e) {
      e.preventDefault();
      if (dom['input'].val()) {
        actions.guess(parseInt(dom['input'].val()));
      }
    });
  };

  function calculateIconStartIndex(sentence, word) {
    var wordIndex = sentence.search(word);
    
    return wordIndex + word.length;
  };

  var addTemperatureAndAltitudeIconToSentence = function(sentence) {
    var icons = {
      hot: 'fire',
      cold: 'ice-lolly',
      higher: 'upload',
      lower: 'download'
    };

    var openSpanTag = "<span class='glyphicon glyphicon-";
    var closeSpanTag = "'></span>";

    var iconsSpanTag = {};

    for (var key in icons) {
      iconsSpanTag[key] = openSpanTag + icons[key] + closeSpanTag;
    } 

    sentence = sentence.split(".")
      .map(function(sentence) {
        var wordsToBeIconed = Object.keys(icons);
        var iconStartIndex;
        var iconedSentence;

        wordsToBeIconed.forEach(function(wordToBeIconed) {
          iconStartIndex = calculateIconStartIndex(sentence, wordToBeIconed);

          iconedSentence = sentence.substring(0, iconStartIndex) +
                           iconsSpanTag[wordToBeIconed] + 
                           sentence.substring(iconStartIndex);

          if (((sentence.search('hot') > -1) && 
              (sentence.search('fiery hot') > -1)) ||
              ((sentence.search('cold') > -1) &&
              (sentence.search('ice cold') > -1))) {
            iconedSentence = sentence.substring(0, iconStartIndex) + 
                             iconsSpanTag[wordToBeIconed] +
                             iconsSpanTag[wordToBeIconed] +
                             sentence.substring(iconStartIndex);
          }
        });

        return iconedSentence;
      })
      .join(".");

    return sentence;
  };

  var renderSummary = function(description, guessCountLeft, guessCountSoFar) {
    var description = addTemperatureAndAltitudeIconToSentence(result.description);
    var guessLeft = "You have " + guessCountLeft + "counts left.";
    var guessSoFar = guessCountSoFar + " counts so far.";

    return description + guessLeft + guessSoFar;
  };

  Board.prototype.renderSummary = function(description, guessCountLeft, guessCountSoFar) {
    dom['summary'].html(renderSummary(description, guessCountLeft, guessCountSoFar));
  };

  return Board;
})(jQuery);


