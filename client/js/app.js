// // GLOBAL DATA BEGIN // //
let body = $("body");
let sentences = [
  "ten ate neite ate nee enet ite ate inet ent eate",
  "Too ato too nOt enot one totA not anot tOO aNot",
  "oat itain oat tain nate eate tea anne inant nean",
  "itant eate anot eat nato inate eat anot tain eat",
  "nee ene ate ite tent tiet ent ine ene ete ene ate"
];
let sentenceIndex = 0;
let letterIndex = 0;
let manualNumberOfWords = 54;
let mistakeCount = 0;
let timestampStart = 0;
let timestampStop = 0;
let keysPressed = 0;
let finished = 0;
let numberOfLetters = 0;
for (i = 0; i < sentences.length; i++) {
  numberOfLetters += sentences[i].length;
}
let highlightClass = "keypress-highlight";
let rgbOn = 0;
// // GLOBAL DATA END // //


// // GLOBAL FUNCTIONS  BEGIN // //
function nextLetter() {
  let currentLetter = sentences[sentenceIndex].charAt(letterIndex);
  $("#target-letter").text(currentLetter);
}

function moveYellowBox() {
  $("#yellow-block").animate(
    { left: "+=17.5px" },
    { duration: 1, easing: "linear" }
  );
}

function nextSentence() {
  if (sentenceIndex < sentences.length - 1) {
    sentenceIndex++;
    letterIndex = 0;
    $("#feedback").empty();
    $("#yellow-block").animate({ left: "15px" });
    $("#sentence").text(sentences[sentenceIndex]);
    nextLetter();
  } else {
    if (finished === 0) {
      finished++;
      timestampStop = event.timeStamp;
      let timeDiff = timestampStop - timestampStart;
      let time = Math.floor(timeDiff / 1000) / 60;
      let wordsPerMin = manualNumberOfWords / time - 2 * mistakeCount;
      let msg =
        "You finished in " +
        time.toFixed(2) +
        " minutes! <br> Words Per Minute: " +
        Math.floor(Math.max(0, wordsPerMin)) +
        " Accuracy: " +
        howAccurate() +
        "%";
      let btnYes = $('<button class="btn btn-success">Yes</button>');
      let btnNo = $('<button class="btn btn-danger">No</button>');
      let retry = "Would you like to try again?";
      $(btnYes).click(function () {
        location.reload(true);
      });
      $(btnNo).click(function () {
        $("#feedback")
          .empty()
          .delay(0750)
          .fadeOut(1000);
        $("#target-letter")
          .delay(0750)
          .fadeOut(1000);
        $("#feedback").text("Ok, bye...");
      });
      $("#yellow-block").removeAttr("id");
      $("#sentence")
        .html(msg)
        .addClass("text-center");
      $("#feedback")
        .text(retry)
        .css({ display: "none" })
        .delay(5000)
        .fadeIn(0750);
      $("#target-letter")
        .empty()
        .css({ display: "none" })
        .append(btnYes, btnNo)
        .delay(5000)
        .fadeIn(0750);
      $(".btn").css({
        "margin-right": "15px",
        "margin-left": "15px",
        width: "100px"
      });
    }
  }
}

function howAccurate() {
  let perfectScore = 100;
  let accuracy = 100 - Math.floor(mistakeCount / numberOfLetters * 100);
  if (mistakeCount === 0) {
    return perfectScore;
  } else {
    return accuracy;
  }
}

// // Easter Egg RGB Mode // //
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function style() {
  $(".rgb-mode").css({
    "background-color": getRandomColor()
  });
};
// // GLOBAL FUNCTIONS END // //


// // APP Begin // //
$("#keyboard-upper-container").hide();
$("#sentence").append(sentences[sentenceIndex]);
$("#target-letter").append(sentences[sentenceIndex].charAt(letterIndex));

$("body").append(`
    <div>
    <button class="rgb-button" style="display:none">RGB Mode</button>
		<audio id="darude" style="display:none"controls>
		<source src="assets/audio/darude.ogg" type="audio/ogg">
    <source src="assets/audio/darude.mp3" type="audio/mp3">
    </div>
`)
$("body").addClass("bg")
$("head").append('<link rel="stylesheet" href="css/styles.css">')

$(document).keypress(function (eventKeypress) {
  asciiVal = eventKeypress.which;
  $("#" + asciiVal).addClass(highlightClass);
  let currentSentence = sentences[sentenceIndex];
  style();
  if (keysPressed < 1) {
    timestampStart = event.timeStamp;
    keysPressed++;
  }
  if (sentenceIndex < sentences.length) {
    let currentLetter = sentences[sentenceIndex].charAt(letterIndex);
    letterIndex++;
    moveYellowBox();
    if (letterIndex < currentSentence.length) {
      if (asciiVal === currentLetter.charCodeAt()) {
        $("#feedback").append("<span class='glyphicon glyphicon-ok'></span>");
        nextLetter();
      } else {
        $("#feedback").append(
          "<span class='glyphicon glyphicon-remove'></span>"
        );
        mistakeCount++;
        nextLetter();
      }
    } else {
      nextSentence();
    };
  };
});

$(body).keydown(function (event) {
  keyId = event.which;
  if (keyId != "undefined") {
    if (keyId == 16) {
      $("#keyboard-upper-container").toggle();
      $("#keyboard-lower-container").toggle();
    }
    if (keyId == 39) {
      if (rgbOn < 1) {
        highlightClass = "rgb-mode";
        rgbOn++;
        $(body).css({ "background-image": 'url("../assets/images/img3.gif")', "background-repeat": "repeat", "background-size": "cover", "margin-top": "10%" }).removeClass('bg');
        $("#darude").trigger('play');
      } else {
        highlightClass = "keypress-highlight";
        rgbOn--;
        $(body).removeAttr("style").addClass("bg");
        $("#darude").trigger('pause');
      }
    }
  }
});

$(body).keyup(function (event) {
  keyId = event.which;
  if (keyId != "undefined") {
    if (keyId == 16) {
      $("#keyboard-upper-container").toggle();
      $("#keyboard-lower-container").toggle();
    }
  }

  $("." + highlightClass).removeClass(highlightClass);
  $(".key").removeAttr("style");
});
// // APP END // //