var socket;

$(function () {
    // socket.io 서버에 접속한다
    socket = io.connect('http://54.180.144.146:5000');
    //socket = io.connect('http://localhost:5000');

    // 접속 버튼이 클릭되면
    $("form").submit(function (e) {
        e.preventDefault();
        var $msgForm = $("#msgForm");

        // 서버로 id 전송한다.
        socket.emit("login", {msg: $msgForm.val()});
        $msgForm.val("");
    });

    // 서버로부터 로그인 수신되면
    socket.on("login", function(data) {
        $("#idLogs").empty();
        for(var i=0; i<data.length; i++) {
            $("#idLogs").append("<div><strong>" + data[i].id + "</strong></div>");
        }
    });

    socket.on("scoreboard", function(data) {
        document.getElementById('canvas').style.display = "none";
        for(var i = 0; i<data.length; i++) {
            $("#resultLogs").append("<div><strong>" + data[i].id + ": " + data[i].score + "</strong></div>");
        }
    });

    // 서버로부터 결과 수신되면
    socket.on("result", function (data) {
        $("#resultLogs").append("<div><strong>" + data + "</strong></div>");
    });
});