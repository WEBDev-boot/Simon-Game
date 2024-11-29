// Create a new Pattern
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

var started = false;
var level = 0;

// This code is used to start the game when the user first presses a key.
// When the user presses a key, the game checks if the game has already started.
// If the game hasn't started, the game will start by changing the title of the page to "Level 0", 
// and then it will call the nextSequence() function to generate a random sequence of colors.
// The nextSequence() function will then play the sequence of colors, and the game will start.
// The gamePattern array will be used to store the sequence of colors that the user needs to follow.
// The userClickedPattern array is used to store the sequence of colors that the user has typed so far.
// The started variable is used to keep track of whether the game has started or not.
// The level variable is used to keep track of the current level of the game.
$(document).keydown(function() {
    if (!started) {
        // Change the title of the page to "Level 0"
        $("#level-title").text("Level " + level);
        // Generate a random sequence of colors
        nextSequence();
        // Set started to true so that the game knows it has started
        started = true;
    }
});

// This code is used to start the game when the user clicks the title of the page.
$("#level-title").click(function() {
    if (!started) {
        // Change the title of the page to "Level 0"
        $("#level-title").text("Level " + level);
        // Generate a random sequence of colors
        nextSequence();
        // Set started to true so that the game knows it has started
        started = true;
    }
});

// This function is used to generate a random sequence of colors
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);

}


// This function is used to play the sound of the button that was clicked
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
// This function is used to animate the button that was clicked
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Check if the user's sequence matches the game's sequence
// This function is called whenever the user clicks a button
// It checks if the button the user just clicked matches the current item in the game's sequence
// If it does, it will print "success" to the console and if the user has finished the sequence, it will call the nextSequence function to generate a new sequence
// If the user's click doesn't match the current item in the game's sequence, it will print "wrong" to the console
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                // Generate a new sequence
                nextSequence();
                // Reset the user's sequence
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// This function is called whenever the user clicks a button
$(".btn").on("click", function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// Reset the game
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}


