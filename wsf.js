var dx = Math.floor(Math.random() * 13) + 1; // speed of ball (1 ~ 13)

var isStarted = false; // before game start : false, after game start : true
var ballMove; // variable that saves interval
var score; // final Score

var NUMBER_FUNCTION_IS_EXECUTED = 0; // number of how many time does interval execute
var isHide = false; // boolean variable to check status of hiding
var gameDone = false;

var wannaPlayAgain = false;

function operate() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    var canvasWidth;
    var canvasHeight;

    startSetting();

    var r = window.innerWidth / 25; // radius Of Ball
    var centerX = window.innerWidth / 2; // X point of ball's center point
    var centerY = window.innerHeight / 2; // Y point of ball's center point

    setFontSize(30);
    ctx.fillText("Click on Screen to Start", canvasWidth / 2, canvasHeight / 4);

    canvas.addEventListener('mousedown', function (e) {
        if (!isStarted)
            loopStart();
        else if (isStarted && isHide && !gameDone)
            loopStop();
    }, false);

    canvas.addEventListener('touchstart', function(e){
        if (!isStarted)
            loopStart();
        else if (isStarted && isHide && !gameDone)
            loopStop();
        else if(wannaPlayAgain){

        }
    });

    function start() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Erase all

        if(NUMBER_FUNCTION_IS_EXECUTED <= 800){
            setFontSize(30);
            ctx.fillText("속도를 숙지하세요!", canvasWidth / 2, canvasHeight / 4);
        }

        else{
            setFontSize(30);
            ctx.fillText("공이 중앙일 때 클릭해주세요!", canvasWidth / 2, canvasHeight / 4);
        }

        drawXasis();
        drawYasis();

        if (NUMBER_FUNCTION_IS_EXECUTED <= 800) { // 8 secs before hide
            drawBall();
        }

        if (NUMBER_FUNCTION_IS_EXECUTED >= 800) // after 8 secs, isHide becomes true
            isHide = true;

        if (NUMBER_FUNCTION_IS_EXECUTED >= 500) { // rectangle to hide balls
            ctx.fillStyle = '#000000';
            if (NUMBER_FUNCTION_IS_EXECUTED <= 800)
                ctx.fillRect(0, canvasHeight * (2 / 5), canvasWidth, (NUMBER_FUNCTION_IS_EXECUTED - 500) / (500 * 3) * canvasHeight)
            else
                ctx.fillRect(0, canvasHeight * (2 / 5), canvasWidth, canvasHeight / 5 * 1);

            if (NUMBER_FUNCTION_IS_EXECUTED >= 500 && NUMBER_FUNCTION_IS_EXECUTED < 600){
                ctx.clearRect(0, 0, canvasWidth, (2 / 7) * canvasHeight);
                setFontSize(30);
                ctx.fillText("3초 뒤에 암전됩니다!", canvasWidth / 2, canvasHeight / 4);
            }
            if (NUMBER_FUNCTION_IS_EXECUTED >= 600 && NUMBER_FUNCTION_IS_EXECUTED < 700){
                ctx.clearRect(0, 0, canvasWidth, (2 / 7) * canvasHeight);
                setFontSize(30);
                ctx.fillText("2초 뒤에 암전됩니다!", canvasWidth / 2, canvasHeight / 4);
            }
            if (NUMBER_FUNCTION_IS_EXECUTED >= 700 && NUMBER_FUNCTION_IS_EXECUTED < 800){
                ctx.clearRect(0, 0, canvasWidth, (2 / 7) * canvasHeight);
                setFontSize(30);
                ctx.fillText("1초뒤에 암전됩니다!", canvasWidth / 2, canvasHeight / 4);
            }
            if(NUMBER_FUNCTION_IS_EXECUTED == 800){
                ctx.clearRect(0, 0, canvasWidth, (2 / 7) * canvasHeight);
            }

        }

        NUMBER_FUNCTION_IS_EXECUTED++;

        if (centerX > (canvasWidth - r) || centerX < r) // if ball touches side of the canvas, ball changes its direction
            dx = -dx;

        centerX = centerX + dx;
    }

    function loopStart() { // function to start recursion
        isStarted = true;
        ballMove = setInterval(start, 10);
    }

    function loopStop() {
        clearInterval(ballMove);
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        setFontSize(30);
        ctx.fillText("Your Score", canvasWidth / 2, canvasHeight / 5);

        setFontSize(50);
        findScore();
        ctx.fillText(String(score) + "%", canvasWidth / 2, canvasHeight * (4 / 5));
        gameDone = true;
        socket.emit("score", {result: score})

        drawXasis();
        drawYasis()
        drawBall();
    }

    function drawXasis() { // X- axis line
        ctx.beginPath();
        ctx.moveTo(0, canvasHeight / 2);
        ctx.lineTo(canvasWidth, canvasHeight / 2);
        ctx.closePath();
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    function drawYasis() { // y - axis line
        ctx.beginPath();
        ctx.moveTo(canvasWidth / 2, canvasHeight / 2 - canvasHeight / 10);
        ctx.lineTo(canvasWidth / 2, canvasHeight / 2 + canvasHeight / 10);
        ctx.closePath();
        ctx.strokeStyle = "#BBBBBB";
        ctx.stroke();
    }

    function drawBall() {
        ctx.beginPath(); //ball
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2, false);
        ctx.fillStyle = '#FFAA00';
        ctx.fill();
        ctx.strokeStyle = '#FFAA00';
        ctx.stroke();
        ctx.closePath();

    }

    function setFontSize(size) {
        ctx.font = String(size) + 'px 고딕';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
    }

    function findScore() {
        score = 100 - Math.floor(((Math.abs(canvasWidth / 2 - centerX)) / (canvasWidth / 2) * 100));
    }

    function startSetting(){
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}