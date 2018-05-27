var moves = []//array of current moves
var counter = 0;
var count = 1;
var turnedOff = true;
var showingCorrectMove = false;
var playerCount;
var isPlaying = false;
var isStrict = false;
var findingNextToShow = false;
var moveToCopy;
var movesToShow
// cancel set time outs
var c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17;

var red = document.getElementById('red');
var yellow = document.getElementById('yellow');
var green = document.getElementById('green');
var blue = document.getElementById('blue');

var start = document.getElementById('start');
var onOff = document.getElementById('on-off');
var strict = document.getElementById('strict');
var countDisplay = document.getElementById('counter');

// functionality buttons
start.addEventListener('click', handleStart);
onOff.addEventListener('click', handleOnOff);
strict.addEventListener('click', handleStrict);
// main color buttons
red.addEventListener('click', handleColor.bind(red));
yellow.addEventListener('click', handleColor.bind(yellow));
green.addEventListener('click', handleColor.bind(green));
blue.addEventListener('click', handleColor.bind(blue));

// functionality buttons
function handleOnOff() {
    if(turnedOff) {
        onOff.classList.add('onOff-active');
        countDisplay.textContent = '--';

    } else {
        onOff.classList.remove('onOff-active');
        start.classList.remove('start-active');
        strict.classList.remove('strict-active');
        
        lockAll();
        clearTimeout(c1);
        clearTimeout(c2);
        clearTimeout(c3);
        clearTimeout(c4);
        clearTimeout(c5);
        clearTimeout(c6);
        clearTimeout(c7);
        clearTimeout(c8);
        clearTimeout(c9);
        clearTimeout(c10);
        clearTimeout(c11);
        clearTimeout(c12);
        clearTimeout(c13);
        clearTimeout(c14);
        clearTimeout(c15);
        clearTimeout(c16);
        clearTimeout(c17);

        isPlaying = false;
        isStrict = false;
        countDisplay.textContent = '';
        moves = [];

    }
    turnedOff = !turnedOff;
}

function handleStrict() {
    if(turnedOff || isPlaying) {
        return;
    }

    if(isStrict) {
        isStrict = false;
        strict.classList.remove('strict-active');
        
    } else {
        isStrict = true;
        strict.classList.add('strict-active');
    }
}



function handleStart() {
    if(turnedOff || isPlaying) {
        return;
    }

    isPlaying = true;
    start.classList.add('start-active');
    startGame();
}

//start game
function startGame() {
    reset();

    c1 = setTimeout(function() {
        addMove();
    
    }, 1000);
}


function addMove(currentMoves) {
    lockAll();
    var nextMove = ranNumBetween(0,3);

    moves.push(nextMove);
    //add next move to moves array

    c2 = setTimeout(function() {
        findNextToShow();

    }, 1000);
}

function findNextToShow() {
  // show the pattern to match
    findingNextToShow = true;

    var nextMove = moves[counter];
    // var nextMove = movesToShow[counter];

    if(isStrict && showingCorrectMove) {
        nextMove = moves[moveToCopy];
    }

    if(nextMove === 0) {
        playNext.call(red);

    } else if(nextMove === 1) {
        playNext.call(yellow);

    } else if(nextMove === 2) {
        playNext.call(green);

    } else if(nextMove === 3) {
        playNext.call(blue);

    } else {
        countDisplay.textContent = count++;
        playersTurn();
        return;
    }
    counter++;
}


function playNext() {
    var self = this;

    self.style.backgroundColor = self.button.color2;
    self.button.sound.play();

    c3 = setTimeout(function() {
        self.style.backgroundColor = self.button.color1;

        c4 = setTimeout(function() {
            if(showingCorrectMove) {
                if(isStrict) {
                    isPlaying = false;
                    handleStart();
                    return;

                }

            }

            findNextToShow();

        }, 700);
    }, 300);
}


function playersTurn() {
    showingCorrectMove = false;
    findingNextToShow = false;
    playerCount = 0
    moveToCopy = 0;
    unlockAll();
}


function showCorrectMove() {
    showingCorrectMove = true;
    // isPlaying = false;

    c5 = setTimeout(function() {
        countDisplay.textContent = 'XX';

        c6 = setTimeout(function() {
            countDisplay.textContent = '--';

            c7 = setTimeout(function() {
                countDisplay.textContent = 'XX';

                c8 = setTimeout(function() {
                    countDisplay.textContent = '--';

                    c9 = setTimeout(function() {
                        countDisplay.textContent = 'XX';
                        findNextToShow();

                    }, 400);
                }, 400);
            }, 400);
        }, 400);
    }, 400);
}


function handleColor() {
    if(showingCorrectMove || findingNextToShow) {
        console.log('returned', showingCorrectMove, findingNextToShow)
        return;
    }

    console.log('color pressed')
    
    var self = this;
    var lastMove = moveToCopy + 1 === moves.length;
    var correctMove = self.button.index === moves[moveToCopy];
    
    self.style.backgroundColor = self.button.color2;
    self.button.sound.play();

    if(correctMove) {
        if(lastMove) {
                
            if(counter === 20) {
                countDisplay.textContent = 'YOU WON!';
                userWon();
                return;
            }

            findingNextToShow = true;
            counter = 0;
            addMove();

        } else {
            moveToCopy++;
        }

    } else {
        counter = 0;
        count--;
        lockAll();
        showCorrectMove();
    }

    setTimeout(function() {
        self.style.backgroundColor = self.button.color1;

    }, 300);
}

