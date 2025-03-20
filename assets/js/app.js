let board;
let boardWidth=360;
let boardHeight=640;
let context;


let birdWidth=34;
let birdHeight=24;


let birdX=boardWidth/8;
let birdY=boardHeight/2;
let birdImg;


let gameOver=false;


let bird={
    x:birdX,
    y:birdY,

    width:birdWidth,
    height:birdHeight,
}


let pipeArray=[];

let pipeWidth=64;
let pipeHeight=512;
let pipeX=boardWidth;
let pipeY=0;

let topPipeImg;
let bottomPipeImg;



let velocityX=-2;
let velocityY=0;
let gravity=0.4;



let score=0;
window.onload=function()
{
    board=document.getElementById("board");
    board.width=boardWidth;
    board.height=boardHeight;
    context=board.getContext("2d");

    
  

    birdImg = new Image();
    birdImg.src = "assets/images/flappybird3.png";
    birdImg.id="bird"
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };
   
    topPipeImg=new Image();
    topPipeImg.src="assets/images/toppipe.png"


    bottomPipeImg=new Image();
    bottomPipeImg.src="assets/images/bottompipe.png"

    requestAnimationFrame(update);

   setInterval(placePipes,1500);
  
   document.addEventListener("keydown",moveBird);

}


function update()
{
    requestAnimationFrame(update);

    if(gameOver)
    {
        return
    }
    context.clearRect(0,0,board.width,board.height);

    //bird


  velocityY+=gravity;


   // bird.y += velocityY;
    
   bird.y=Math.max(bird.y+velocityY,0);


    context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height)

 if(bird.y>board.height)
 {
    gameOver=true
    score="Game Over Score:" +score
 }
    //pipe

    for(let i=0;i<pipeArray.length;i++)
    {
       
        let pipe=pipeArray[i];
        pipe.x +=velocityX;
        if(!pipe.passed && bird.x>pipe.x+pipe.width)
        {
            score +=0.5;
            pipe.passed=true;
        }
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height)
        if(detectCollision(bird,pipe)){
            gameOver=true;
            score="Game Over Score:" +score
        }
        
        
    }


    context.fillStyle="white";
    context.font="25px sans-serif";
    context.fillText(score,5,45);
}


function placePipes()
{

    if(gameOver)
    {
        return
    }
    let randomPipeY=pipeY-pipeHeight/4-Math.random()*(pipeHeight/2);
     
    let openingSpace=boardHeight/4;
     

    let topPipe={
        img:topPipeImg,
        x:pipeX,
        y:randomPipeY,       
        width:pipeWidth,
        height:pipeHeight,
        passed:false,
    }
    pipeArray.push(topPipe);
    let bottomPipe={
        img:bottomPipeImg,
        x:pipeX,
        y:randomPipeY+pipeHeight+openingSpace,
        width:pipeWidth,
        height:pipeHeight,
        passed:false,
       }
    
    
        
        pipeArray.push(bottomPipe);
}


function moveBird(e)
{
    if (e.code=="space" || e.code=="ArrowUp"||e.code=="KeyX")
    {
        velocityY=-6;
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width && 
           a.x + a.width > b.x &&   
           a.y < b.y + b.height && 
           a.y + a.height > b.y; 
}