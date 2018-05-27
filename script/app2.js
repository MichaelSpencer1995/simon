function SimonButton (index, sound, color1, color2, frequency) {
    this.index = index;
    this.sound = new Audio(sound);
    this.color1 = color1;
    this.color2 = color2;
    this.frequency = frequency;
}

red.button = new SimonButton(0, './sounds/simonSound1.mp3', 'rgb(230, 49, 49)', '#a92e1d', 329.63);
yellow.button = new SimonButton(1, './sounds/simonSound2.mp3', '#ECC417', '#caa400', 261.63);
green.button = new SimonButton(2, './sounds/simonSound3.mp3', '#3AA84B', '#1d882d', 220);
blue.button = new SimonButton(3, './sounds/simonSound4.mp3', '#0E5D9E', '#0d3a5f', 164.81);

function ranNumBetween(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function lockAll() {
    console.log('locked')
    red.setAttribute('disabled', 'true');
    green.setAttribute('disabled', 'true');
    yellow.setAttribute('disabled', 'true');
    blue.setAttribute('disabled', 'true');
}

function unlockAll() {
    console.log('unlocked')
    red.removeAttribute("disabled");
    green.removeAttribute("disabled");
    yellow.removeAttribute("disabled");
    blue.removeAttribute("disabled");
}

function reset() {
    moves = [];
    countDisplay.textContent = '--';
    counter = 0;
    count = 1; // so count display starts at 0 and not 1
    showingCorrectMove = false;
    playerCount = 0;
    findingNextToShow = false;
}


function userWon() {
    lockAll();

    c10 = setTimeout(function() {
        strobeOne();

        c11 = setTimeout(function() {
            strobeTwo();

            c12 = setTimeout(function() {
                strobeOne();

                c13 = setTimeout(function() {
                    strobeTwo();
                    
                    c14 = setTimeout(function() {
                        strobeOne();
                
                        c15 = setTimeout(function() {
                            strobeTwo();

                            c16 = setTimeout(function() {
                                strobeOne();

                                c17 = setTimeout(function() {
                                    strobeTwo();
                                    strict.classList.add('strict-active');
                                    
                                }, 400);
                            }, 400);
                        }, 400);
                    }, 400);
                }, 400);
            }, 400);
        }, 400);
    }, 400);
}

function strobeOne() {
    onOff.classList.remove('onOff-active');
    start.classList.remove('start-active');
    strict.classList.add('strict-active');
}

function strobeTwo() {
    onOff.classList.add('onOff-active');
    start.classList.add('start-active');
    strict.classList.remove('strict-active');
}