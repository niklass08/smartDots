let pop;
let obj;
let ambush_array;
let mutationRate;

function setup() {
  // put setup code
  createCanvas(1920/2, 1080/2); 
  mutationRate = 0.01;
  pop = new population(10000, mutationRate);
  //obj = new goal(width/2, height - 1);
  obj = new goal(width/2, 5);
  ambush_array =[];
  // ambush = new obstacle(width/2, height/2);
}

function mousePressed(){
  ambush_array.push(new obstacle(mouseX, mouseY));
  pop.bestStep = pop.bestStep*2;
  console.log('mouspressed');
  return false;
}

function draw() { 
  // put drawing code here
  background(255);
  obj.show();
  ambush_array.forEach(function(el){
    el.show();
  })
  if(pop.allDotsDead()){
    //genetic
    console.log("noGoalReached : " + pop.noGoalReached());
    if(pop.noGoalReached()){
      if(mutationRate < 1){
        mutationRate += 0.001
      }

    } else {

      if(mutationRate > 0.1){
        mutationRate -= 0.005;
      }

    }

    if(mutationRate < 0){
      mutationRate = 0;
    }
    if(mutationRate > 1){
      mutationRate = 1;
    }
    console.log("mutationRate : " + mutationRate);
    pop.calculateFitness(obj.pos.x, obj.pos.y);
    pop.naturalSelection(obj.pos.x, obj.pos.y);
    pop.mutate(mutationRate);

  } else {

    pop.show();
    pop.update(obj.pos.x, obj.pos.y, ambush_array);

  }

} 
