// =========GLOBALS=========
// init game as player 1's turn
let whosTurn = 1;
// Make an array for both players, and push each new square 
// onto the appropirate array
let player1Squares = [];
let player2Squares = [];
// Array of all winning combos
const winningCombos = [
    ['A1','B1','C1'], //row 1
    ['A2','B2','C2'], //row 2
    ['A3','B3','C3'], //row 3
    ['A1','A2','A3'], //Col 1
    ['B1','B2','B3'], //Col 2
    ['C1','C2','C3'], //Col 3
    ['A1','B2','C3'], //Diag 1
    ['A3','B2','C1'], //Diag 2
]
let gameOn = true;



// console.log(this); // window

// console.log("Sanity Check");

// 1. Set up Board --- CHECK!
// 2. User should be able to click on a button -- CHECK
// When the click happens, the square should have 
// that players mark (X or O)
// 3. If it's X's turn put an X in, otherwise, put an O in - CHECK
// 4. In order to accomplish 3, we need to keep track of who's turn it is
// After X goes, it becomes O's turn, and vice versa - CHECK
// 5. Keep other player from taking a square - CHECK
// 6. See if someone won! If so, congrautlate them
// 7. Stop the game if someone won, otherwise let it keep going

// squares is an array with 9 objects in it
// Each element is an HTML button element 
const squares = document.getElementsByClassName('square');
// const squares = document.getElementsByTagName('button');
// console.log(squares)

for(let i = 0; i < squares.length; i++){
    // console.log(squares[i]);
    // now that we have all the squares individually (squares[i]),
    // we can add an event listener to each one
    // to add eventlistener:
    // 1. What to listen to
    // 2. add the method (addEventListener)
    // 3. first arg: what event to listen for
    // 4. second arg: function to run if that even happens
    squares[i].addEventListener('click',function(event){
        // EVERY JS event, will give you the event object
        // console.log(event)
        console.dir(this);
        if(gameOn){
            // Check to see if the square is taken...
            if(this.innerHTML === "-"){
                // it's not taken, so see whos turn it is
                if(whosTurn === 1){
                    // its player 1, put an X, and give 
                    // control to O
                    this.innerHTML = "X"; // Update the DOM
                    whosTurn = 2; // Update JS
                    // Update the DOM
                    document.getElementById('message').innerHTML = "It's O's turn"
                    player1Squares.push(this.id)
                    checkWin(player1Squares,1)
                }else{
                    this.innerHTML = "O";
                    whosTurn = 1;
                    document.getElementById('message').innerHTML = "It's X's turn"
                    player2Squares.push(this.id)
                    checkWin(player2Squares,2)
                }
            }else{
                document.getElementById('message').innerHTML = "Sorry, that square is taken"
            }
            console.log(player1Squares)
            console.log(player2Squares)
        }
    })
}

function checkWin(playerSquares, whoMarked){
    console.log("Checking to see who won...")
    // console.log(playerSquares);
    // console.log(whoMarked)
    // we know who just went (whoMarked)
    // and we know what squares they have (playerSquares)
    // Outer Loop - Check each winning combination
    for(let i = 0; i < winningCombos.length; i++){
        // keep track of how many squares in THIS combo
        let squareCount = 0
        // Inner Loop - Check each square inside of THIS winning combo
        // winningCombos[i] = the winningCombo we are on (3 squares)
        for(let j = 0; j < winningCombos[i].length; j++){
            // winningCombos[i][j] = the square in the winningCombo we are on
            const winningSquare = winningCombos[i][j];
            if(playerSquares.includes(winningSquare)){
                // player has this square!!!
                squareCount++;
            }
        }
        if(squareCount === 3){
            // console.log("Player won")
            // console.log(winningCombos[i]);
            endGame(winningCombos[i], whoMarked)
        }
    }
}

function endGame(winningCombo,whoWon){
    gameOn = false;
    // if we get to endGame... WINNER WINNER, CHICKEN DINNER
    // so the game is over
    document.querySelector('#message').innerHTML = `Congrats to player ${whoWon}`
    // we know which squares are the winning squares
    for(let i = 0; i < winningCombo.length; i++){
        let winningSquare = winningCombo[i];
        let squareElem = document.getElementById(winningSquare);
        console.dir(squareElem)
        squareElem.className += " winning-square"
    
        
    }
}
function reset(){
    player1Squares = [];
    player2Squares = [];
    whosTurn = 1;
    gameOn= true;

    for( let i =0; i < squares.length; i++){
        squares[i].innerHTML = "-"
    }
    for(let i=0; i < squares.length; i++){
        console.dir(
            squares[i]
        )
        squares[i].className = ("square")
    }
    console.log(player1Squares);
    console.log(player2Squares);
}
