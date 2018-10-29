var textAreaBorder = document.querySelector("#text-area") ? document.querySelector("#text-area") : '';
var textArea = document.querySelector("#text-area") ? document.querySelector("#text-area") : '';
var originalText = document.querySelector(".text-section-div p") ? document.querySelector(".text-section-div p").innerHTML : '';
var resetButton = document.querySelector("#reset") ? document.querySelector("#reset") : '';
var theTimer = document.querySelector(".timer") ? document.querySelector(".timer") : '';
var congratsSection = document.querySelector('.cong-section') ? document.querySelector('.cong-section') : '';
var timer = 0;
var minutes = 0;
var seconds = 0;
var milliSeconds = 0;
var currentTime = "";

//to stop timer
var interval = 0;
var timerRunning = false;


function leadingZero(time) {
    if(time <= 9){
        return "0" + time;
    }
    if(typeof time !== 'number'){
        throw Error('The given argument is not a number')
    }
    else{
        return time;
    }
}

function startTimer() {
    minutes = Math.floor((timer/100)/60);
    seconds = Math.floor((timer/100) - (minutes * 60));
    milliSeconds = Math.floor(timer- (seconds * 100) - (minutes * 6000));

    // minutes = leadingZero(minutes);
    // seconds = leadingZero(seconds);
    // milliSeconds = leadingZero(milliSeconds);
    
    
    $('#minutes').text(leadingZero(minutes));
    $('#seconds').text(leadingZero(seconds));
    $('#milli-seconds').text(leadingZero(milliSeconds));

    currentTime = minutes + ":" + seconds + ":" + milliSeconds;

    theTimer.innerHTML = currentTime;
    timer++;
}


function spellCheck() {

    var textEntered = textArea.value;
    var partialText = originalText.substring(0,textEntered.length);
    if(textEntered.length === 0){
        textAreaBorder.style.borderColor = 'gray';
    }
    else{
        if(textEntered === originalText){
            textAreaBorder.style.borderColor = 'forestgreen';
            clearInterval(interval);
            congratsSection.style.display = 'block';
        }
        else{
            if(textEntered === partialText){
                textAreaBorder.style.borderColor = 'lightblue';
            }
            else{
                textAreaBorder.style.borderColor = 'orangered';
            }
        }
    }
}



function start(){
    var textEnteredLength=textArea.value.length;
    if(textEnteredLength===0 && !timerRunning)
    {
        interval=setInterval(startTimer,10);
        timerRunning=true;
    }
}



// Reset everything:
function reset() {
    clearInterval(interval);
    timer = 0;
    minutes = 00;
    seconds = 00;
    milliSeconds = 00;
    currentTime = "";
    interval = 0;
    timerRunning = false;
    theTimer.innerHTML = "00:00:00";
    textArea.value = "";
    textAreaBorder.style.borderColor = 'gray';
    congratsSection.style.display = 'none';
}


if (textArea){
textArea.addEventListener('keypress',start);
} 
if (textArea){
textArea.addEventListener('keyup',spellCheck);
} 
if (resetButton){
resetButton.addEventListener('click',reset);
} 
