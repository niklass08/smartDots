    class dot{
    constructor(mutationRate){
        this.pos = createVector(width/2, height - 5);
        this.speed = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.brain = new brain(800,mutationRate);
        this.dead = false;
        this.fitness = 0;
        this.reachedGoal = false;
        this.isBest = false;

        this.brain.randomize();
    }

    show(){
        if(this.isBest){
            fill(0,255 , 0);
            ellipse(this.pos.x, this.pos.y, 8, 8);
        }else {
            fill(0);
            ellipse(this.pos.x, this.pos.y, 4, 4);
        }
    }

    move(){
        if(this.brain.directions.length > this.brain. step){
            this.acc = this.brain.directions[this.brain.step];
        } else {
            this.dead = true;
        }
        this.brain.step++;
        this.speed.add(this.acc);
        this.speed.limit(5);
        this.pos.add(this.speed);
    }

    update(goalX, goalY, ambush_array){
        if(!this.dead && !this.reachedGoal){
            this.move()
            var x = this.pos.x;
            var y = this.pos.y;
            if(x > width - 1 || x < 0 ||  y > height - 1 || y < 0){
                this.dead = true;
            }

            for(let i = 0; i<ambush_array.length; i++){
                if(dist(ambush_array[i].pos.x, ambush_array[i].pos.y, this.pos.x, this.pos.y) <= (ambush_array[i].diameter)/2){
                    this.dead = true;
                }
                
            }

            if(dist(this.pos.x, this.pos.y, goalX, goalY) < 5){
                this.reachedGoal = true;
            }
        }
    }

    calculateFitness(goalX, goalY){
        if(this.reachedGoal){
            this.fitness = 10000000/(this.brain.step*this.brain.step*this.brain.step*this.brain.step);
        } else {
            var distToGoal = dist(this.pos.x, this.pos.y, goalX, goalY);
            this.fitness = 1.0/(distToGoal * distToGoal*distToGoal * distToGoal);
        }
        return this.fitness;
    }

    baby(){
        var baby = new dot();
        baby.brain = this.brain.clone();
        return baby;
    }
}