let pop;
let obj;
function setup() {
  // put setup code
  createCanvas(400, 400); 
  pop = new population(1000);
  //obj = new goal(width/2, height - 1);
  obj = new goal(width/2, 5);
}

function draw() { 
  // put drawing code here
  background(255);
  obj.show();
  if(pop.allDotsDead()){
    //genetic

    pop.calculateFitness(obj.pos.x, obj.pos.y);
    pop.naturalSelection(obj.pos.x, obj.pos.y);
    pop.mutate();

  } else {

    pop.show();
    pop.update(obj.pos.x, obj.pos.y);

  }

} 