console.log("welcome to tic tac toe");
let music= new Audio("music.mp3"); //new audio object to play and control your mp3 files
let audioturn= new Audio("ting.mp3");
let gameover= new Audio("gameover.mp3");
let turn="X";
let over=false;


//function to change the turn
const changeturn = ()=>{ //paramenters come i  the () brackets

    if(turn === "X") //using a  tenery operator
    {
        return 0;
    }
    else
    {
        return "X";
    }
}

//funtion to check for a win
const checkwin = ()=>{
    let boxtext=document.getElementsByClassName('boxtext')
    let wins= [ //writing down all possibilities of wins [0,1,2]
                                                       //[3,4,5]
                                                       //[6,7,8]
        [0, 1, 2, 5, 5, 0], // first 3 numbers represent the possible wins combinations and last 3 represent transformation (5,5 )translation, 90 degrees rotation
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]

    wins.forEach(e =>{ 
       if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&(boxtext[e[1]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText !== '') ) //e[0] refers to the first row in array let wins
       {
        document.querySelector('.info').innerText= boxtext[e[0]].innerText + "  HAS WON!!!";
        over=true;
        //making our excited gif appear now
        document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width= "200px";
        document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
        document.querySelector(".line").style.width = "20vw";
        gameover.play();
       }
    })
 
}

//  GAME LOGIC
music.play(); //playing background music
//FOR EAch box we make an on listener(to detect when mouse clicks on it)
let boxes= document.getElementsByClassName("box"); 
//now you need to create an array as there are various boxs
Array.from(boxes).forEach(element => {
    let boxtext= element.querySelector('.boxtext'); //where we place an X or a O
    //putting an event listener on every box clicked on
    
    element.addEventListener('click',()=>{
        if(boxtext.innerText === '')
        {   
            boxtext.innerText=turn;
            turn=changeturn();
            console.log(turn);
           
            //play audio on changing tunr
            audioturn.play();
            
            checkwin(); //check if someone has won after a turn
           
            if(!over)
            {
            document.getElementsByClassName("info")[0].innerText ="Turn for" + turn; //display whose turn is it now
            }
           
        }
    })
})

//ADD onclick listener for reset button
reset.addEventListener('click', ()=>{
    let boxtexts= document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach( element => {
        element.innerText="";
    })
    turn="X";
    over=false; // gameover would be false again
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText ="Turn for" + turn; //turn resets to X
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width= "0px";// removing the exited gif as game has beeen reset

})
