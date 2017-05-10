$(document).ready(function() {

  var games = [
    "god of war", "call of duty", "rayman", "battlefield", "mass effect", "vindictus",
    "warframe", "dark souls", "bloodborne", "legend of zelda", "mario",
    "sonic", "warhammer", "goat simulator", "farming simulator", "need for speed"
  ];

  // function to make buttons and add to page
  function makeButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".game-button", function() {
    $("#games").empty();
    $(".game-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gameDiv = $("<div class=\"game-item\">");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        var gameImage = $("<img>");
        gameImage.attr("src", still);
        gameImage.attr("data-still", still);
        gameImage.attr("data-animate", animated);
        gameImage.attr("data-state", "still");
        gameImage.addClass("game-image");

        gameDiv.append(p);
        gameDiv.append(gameImage);

        $("#games").append(gameDiv);
      }
    });
  });

  $(document).on("click", ".game-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-game").on("click", function(event) {
    event.preventDefault();
    var newGame = $("input").eq(0).val();

    if (newGame.length > 2) {
      games.push(newGame);
    }

    makeButtons(games, "game-button", "#game-buttons");

  });

  makeButtons(games, "game-button", "#game-buttons");
});
