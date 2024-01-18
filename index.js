document.addEventListener("DOMContentLoaded",()=>{
const grid=document.querySelector(".grid");
const flagsLeft=document.querySelector("#flags-left");
const result=document.querySelector("#result");

const width=10;
const bombAmount=20;
let flags=0;

let squares=[];
let isGameOver=false;

//Board Create
function createBoard(){
flagsLeft.innerHTML=bombAmount;

//get shuffled game arrayy with random bombs
const bombArray=Array(bombAmount).fill("bomb");
const emptyArray=Array(width*width - bombAmount).fill("valid");
const gameArray=emptyArray.concat(bombArray);
const shuffledArray=gameArray.sort(()=>Math.random()-0.5);

console.log(gameArray);

for(let i=0;i<width*width;i++){
    const square=document.createElement("div");  
    square.id=i;
    square.classList.add(shuffledArray[i]);
    grid.appendChild(square); 
    squares.push(square);
    //Normal Click
    square.addEventListener("click",function(){
click(square)
    })
    //cntrl & left click
    square.addEventListener("contextmenu",function(){
 addFlag(square)
    })
}
//add numbers
for(let i=0;i<squares.length;i++){
    let total=0;
    const isLeftEdge=(i%width===0);
    const isRightEdge=(i%width===width-1);
    
    if(squares[i].classList.contains("valid")){
        if(i>0 && !isLeftEdge && squares[i-1].classList.contains("bomb"))
        total++;
        if(i>9 && !isRightEdge && squares[i+1-width].classList.contains("bomb"))
        total++;
        if(i>10 && squares[i+1-width].classList.contains("bomb"))
        total++;
         if(i>11 && !isLeftEdge && squares[i-1-width].classList.contains("bomb"))
         total++;
        if(i<99 && !isRightEdge && squares[i+1].classList.contains("bomb"))
        total++;
        if( i<90 && !isLeftEdge && squares[i-1+width].classList.contains("bomb"))
        total++;
        if(i<88 && !isRightEdge && squares[i+1+width].classList.contains("bomb"))
        total++;
        if(i<89 && squares[i+width].classList.contains("bomb"))
        total++;
        squares[i].setAttribute("data",total)

    }

}
}
//add flag with right click

function addFlag(square){
    if (isGameOver) return;
    if(!square.classList.contains("checked") && (flags<bombAmount)){
        if(!square.classList.contains("flag")){
            square.classList.add("flag");
            flags++;
            square.innerHTML="🚩";
            flagsLeft.innerHTML=bombAmount-flags;
            checkWin()
        }
        else{
            square.classList.remove("flag");
            flags--;
            square.innerHTML="";
            flagsLeft.innerHTML=bombAmount-flags
        }
    }

}

createBoard();
function click(square){
console.log(square.id);

if(isGameOver || square.classList.contains("checked") || square.classList.contains("flag"))
return;
if(square.classList.contains("bomb")){
    gameOver()
}
else{
   let total= square.getAttribute("data");
   if(total!=0){
    
    if(total==1) square.classList.add("one") 
    if(total==2) square.classList.add("two") 
    if(total==3) square.classList.add("three") 
    if(total==4) square.classList.add("four") 
    square.innerHTML=total;
return;

   }
   checkSquare(square)
}
square.classList.add("checked");
}
// check if neighbouring squares once clicked
function checkSquare(square){
    const currId=square.id;
    const isLeftEdge=(currId%width===0);
    const isRightEdge=(currId%width===width-1);
    setTimeout(function(){
if(currId>0 && !isLeftEdge){
    const newId= parseInt(currId)-1;
    const newSquare=document.getElementById(newId);
    click(newSquare);
};
if(currId>9 && !isRightEdge){
    const newId= parseInt(currId)+1-width;
    const newSquare=document.getElementById(newId);
    click(newSquare);
};
if(currId>10 ){
    const newId= parseInt(currId)-width;
    const newSquare=document.getElementById(newId);
    click(newSquare);
};
if(currId>11 && !isLeftEdge){
    const newId= parseInt(currId)-1-width;
    const newSquare=document.getElementById(newId);
    click(newSquare);
};
if(currId<98 && !isRightEdge){
    const newId= parseInt(currId)+1;
    const newSquare=document.getElementById(newId);
    click(newSquare);
};
if(currId<90 && !isLeftEdge){
    const newId= parseInt(currId)-1+width;
    const newSquare=document.getElementById(newId);
    click(newSquare);
};
if(currId<88 && !isRightEdge){
    const newId= parseInt(currId)+1+width;
    const newSquare=document.getElementById(newId);
    click(newSquare);
};
if(currId<89){
    const newId= parseInt(currId)+width;
    const newSquare=document.getElementById(newId);
    click(newSquare);
}
    },10)
}
function checkWin(){
    let matches=0;
    for(let i=0;i<squares.length;i++){
        if(squares[i].classList.contains("flag")&& squares[i].classList.contains("bomb")){
            matches++;
        }
        if(matches==bombAmount){
            result.innerHTML="You win!!";
            isGameOver=true

        }
    }
}

function gameOver(){
    result.innerHTML="Ooch !! Game Over";
    isGameOver=true;

    //show all bombs
    squares.forEach(function(square){
        if(square.classList.contains("bomb")){
            square.innerHTML="💣";
            square.classList.remove("bomb");
            square.classList.add("checked")
        }
    })
}

}
)