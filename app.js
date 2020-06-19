






function init(){

    //console.log('in init');

    var canvas=document.getElementById("mycanvas");

    W=canvas.width=500;
    H=canvas.height=500;
    cs=57;
    //canvas is used to draw graphics
    pen=canvas.getContext('2d')
    game_over="false";
    food=generateFood();
    score=5;


    //create img object for food
    foodImg=new Image();
    foodImg.src="images/apple.png";

    //img for trophy
    trophyImg=new Image();
    trophyImg.src="images/trophy.png";



    snake = {

        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",
        createSnake:function(){

            for(var i=this.init_len;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },

        drawSnake:function(){

            //erase old frame
            pen.clearRect(0,0,W,H);

            //draw new frame
            for(var i=0;i<this.cells.length;i++){


                pen.fillStyle=this.color;


                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }

        },

        updateSnake:function(){

            //check if the sanke has eaten food and increse the length
            //generate new food
            var headX= this.cells[0].x;
            var headY= this.cells[0].y;


            if(headX==food.x && headY==food.y){

                //snake eats food
                score++;

                food=generateFood();
            }
            else{

                this.cells.pop();
            

            }


            


            var nextX,nextY;
            if(this.direction=="right"){

                nextX=headX+1;
                nextY=headY;

            }
            else if(this.direction=="left"){

                nextX=headX-1;
                nextY=headY;

            }
            else if(this.direction=="down"){

                nextX=headX;
                nextY=headY+1;

            }
            else if(this.direction=="up"){

                nextX=headX;
                nextY=headY-1;

            }
            

         
            this.cells.unshift({x:nextX,y:nextY});//adds to the begining of array at 0th index



            //Logic for preventing snake going out

            var lastx=Math.round(W/cs);
            var lasty=Math.round(H/cs);
            if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x>= lastx || this.cells[0].y>= lasty){
                game_over="true";
            }








        },
        

        


    };

    snake.createSnake();

    //ADD EVENT LISTENER

    function keyPressed(e){

        if(e.key=="ArrowRight" || e.key=="d" || e.key=="D"){
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft" || e.key=="a" || e.key=="A"){
            snake.direction="left";
        }
        else if(e.key=="ArrowDown" || e.key=="s" || e.key=="S"){
            snake.direction="down";
        }
        else if(e.key=="ArrowUp" || e.key=="w" || e.key=="W"){
            snake.direction="up";
        }
        //console.log(snake.direction);

    }


    document.addEventListener('keydown',keyPressed);

    
}
function draw(){

    //console.log('in draw');
    snake.drawSnake();
   
    pen.drawImage(foodImg,food.x*cs,food.y*cs,cs,cs);
    pen.drawImage(trophyImg,20,20,cs,cs);
    pen.fillStyle="blue";
    pen.font="25px Roboto";
    pen.fillText(score,50,50);
}

function update(){
    

    //console.log('in update');
 
    snake.updateSnake();
    


    

    

}


function generateFood(){

    var foodX= Math.round(Math.random()*(W-cs)/cs);
    var foodY= Math.round(Math.random()*(H-cs)/cs);

    var food={
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food;
}
function gameloop(){
    
    if(game_over=="true")
    {
        clearInterval(f);
        alert("Game Over");
        flag=1;
    }
    else{
        draw();
        update();
  
    }
    
    



}
init();
var f=setInterval(gameloop,200);
