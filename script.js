const width = 600;
const height = 400;
const boxSize = 20;
const maxX = width/boxSize;
const maxY = height/boxSize;
const boxes = [];
let start = false;

function setup() {
  createCanvas(width, height);
  for(let x = 0; x < maxX; x++){
      boxes[x] = [];
      for(let y = 0; y < maxY; y++){
        boxes[x][y] = new Rectangle(createVector(x*boxSize, y*boxSize),x ,y);
    }
  }
}

function draw() {
  frameRate(10);
  boxes.forEach(function(x){
      x.forEach(function(box){
            box.update();
            box.draw();
      })
  });
 
  start = false;
}

function mouseClicked() {
    const mouseVector = createVector(mouseX,mouseY)
    boxes.forEach(function(x){
      x.forEach(function(box){
          if(box.isClickedByMouse(mouseVector)){
              box.toggleActive();
          }
      })
    });
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    start = true;
  }
  if (keyCode === DOWN_ARROW) {
    start = false;
  }
}

class Rectangle{
    constructor(vector,x, y){
        this.vector = vector;
        this.active = false;
        this.shouldActive = false;
        this.x = x;
        this.y = y;
    }

    update(){
        if(start){
            this.active = this.shouldActive;
            let activeCells = 0; 
            this.neighbors().forEach(function(neighbor){
                  activeCells += neighbor.isActive()
            })
            if(this.active === false && activeCells === 3){
                this.shouldActive = true;
            }else if(this.active === false && (activeCells === 3 || activeCells === 2)){
                this.shouldActive = true;
            }else{
               this.shouldActive = false;
            }
        }
    }

    neighbors(){
        let neighbors = [];

        if(typeof boxes[this.x - 1] != 'undefined'){
            if(typeof boxes[this.x - 1][this.y + 1] != 'undefined'){
                neighbors.push(boxes[this.x - 1][this.y + 1])
            }
            if(typeof boxes[this.x - 1][this.y - 1] != 'undefined'){
                neighbors.push(boxes[this.x - 1][this.y - 1])
            }
            if(typeof boxes[this.x - 1][this.y] != 'undefined'){
                neighbors.push(boxes[this.x - 1][this.y])
            }
        }

        if(typeof boxes[this.x + 1] != 'undefined'){
            if(typeof boxes[this.x + 1][this.y - 1] != 'undefined'){
            neighbors.push(boxes[this.x + 1][this.y - 1])
            }
            if(typeof boxes[this.x + 1][this.y + 1] != 'undefined'){
                neighbors.push(boxes[this.x + 1][this.y + 1])
            }
            if(typeof boxes[this.x + 1][this.y] != 'undefined'){
                neighbors.push(boxes[this.x + 1][this.y])
            }
        }

        if(typeof boxes[this.x][this.y + 1] != 'undefined'){
            neighbors.push(boxes[this.x][this.y + 1])
        }
        if(typeof boxes[this.x][this.y - 1] != 'undefined'){
            neighbors.push(boxes[this.x][this.y - 1])
        }


        return neighbors;
        // return [
        //     boxes[this.x - 1][this.y + 1],
        //     boxes[this.x + 1][this.y - 1],
        //     boxes[this.x - 1][this.y - 1],
        //     boxes[this.x + 1][this.y + 1],
        //     boxes[this.x][this.y + 1],
        //     boxes[this.x][this.y - 1],
        //     boxes[this.x - 1][this.y],
        //     boxes[this.x + 1][this.y] 
        // ]

    }

    isClickedByMouse(mouseVector){
        if(mouseVector.x - this.vector.x <= 20 && mouseVector.x - this.vector.x > 0){
            if(mouseVector.y - this.vector.y <= 20 && mouseVector.y - this.vector.y > 0){
                return true;
            }
        }
        return false;
    }

    isActive(){
        return this.active;
    }

    toggleActive(){
        this.active = this.active ? false : true;
    }

    draw(){
        fill(this.active ? 255: 0)
        strokeWeight(1);
        stroke(128);
        rect(this.vector.x, this.vector.y, boxSize, boxSize);
    }
}