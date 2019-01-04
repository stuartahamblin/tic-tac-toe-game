var recordingArr = [0, "---------", "", "", 0]; // [turn count, 123456789, HTMLAdded, player turn/win]

function modString (idName, recording) {
    var toBeModified = recording[1];
    var turnOrWin;
    if (recording[4] === 1) {                                                                                           //reset the game
        $('.insideTextButton').html('&nbsp');
        // recording = [0, "---------", "", "", 0];
        recording [0] = 0;
        recording [1] = "---------";
        recording [2] = "&nbsp";
        recording [3] = "<h2>" + '"X"' + " player's turn</h2>";
        recording [4] = 0;
        whoTurn = "";
        return recording;
    } else {
        if (toBeModified.substring(idName - 1, idName) === "-") {                                                       //Check if the space is blank
            var whoTurn = recording[0] % 2;
            if (whoTurn === 0) {                                                                                        //if x's turn
                whoTurn = "X";
                turnOrWin = "<h2>" + '"O"' + " player's turn</h2>";
            } else {                                                                                                    //if o's turn
                whoTurn = "O";
                turnOrWin = "<h2>" + '"X"' + " player's turn</h2>";
            }
            toBeModified = toBeModified.substring(0, idName - 1) + whoTurn + toBeModified.substring(idName, 9);         //add occupied value to map string
            var outputHTML = whoTurn;                                                                                   //html to be added
            var winArray = ['111000000', '100100100', '100010001', '010010010', '001010100', '001001001', '000111000', '000000111'];
            for (var j = 0; j < 8; j += 1) {
                var countToWin = 0;
                for (var i = 0; i < 9; i += 1) {
                    if (countToWin === 3) {                                                                             //if player wins
                        break;
                    } else if (toBeModified.substring(i, i + 1) === whoTurn) {
                        if (winArray[j].substring(i, i + 1) === "1") {
                            countToWin += 1;
                        }
                    }
                }
                if (countToWin === 3) {                                                                                 //if player wins
                    turnOrWin = '"' + whoTurn + '"' + ' player wins';
                    recording[4] = 1;
                    break;
                }
            }
            recording [0] += 1;
            recording [1] = toBeModified;
            recording [2] = outputHTML;
            recording [3] = turnOrWin;
        }
        if (recording [0] === 9 && recording[4] !== 1) {                                                                // displays draw
            recording [3] = "<h2>" + "draw" + "</h2>";
            recording [4] = 1;
        }
    }
    return recording;
}

$('.insideTextButton').click(function() {
    modString(this.id, recordingArr);                                                                                   //pass into function(idName) returns modified recordingArr
    $(this).html(recordingArr[2]);
    $('.playerTurn').html(recordingArr[3]);
});