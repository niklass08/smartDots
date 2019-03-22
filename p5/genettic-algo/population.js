class population{
    constructor(size, mutationRate){
        this.dots = [];
        this.size = size;
        this.fitnessSum = 0;
        this.gen = 1;
        this.bestDot = 0;
        this.bestStep = 400;
        for(let i = 0; i<size;i++) {
            this.dots[i] = new dot(mutationRate);
        }
    }

    show(){
        for(let i = 1; i<this.size;i++) {
            this.dots[i].show();
        }
        this.dots[0].show();
    }

    update(goalX, goalY, ambush_array){
        for(let i = 0; i<this.size;i++) {
            if(this.dots[i].brain.step >= this.bestStep){
                this.dots[i].dead = true;
            }
            this.dots[i].update(goalX, goalY, ambush_array);
        }
    }

    calculateFitness(goalX, goalY){
        for(let i = 0; i<this.size;i++) {
            this.dots[i].calculateFitness(goalX, goalY);
        }
    }

    allDotsDead(){
        for(let i = 0; i<this.size;i++) {
            if(!this.dots[i].dead && !this.dots[i].reachedGoal){
                return false;
            }
        }
        return true;
    }

    naturalSelection(goalX, goalY){
        var newDots = [];
        this.setBestDot();
        newDots[0] = this.dots[this.bestDot].baby();
        newDots[0].isBest = true;
        this.calculateSumFitness(goalX, goalY);
        for(let i = 1;i<this.size;i++){

            var parent = this.selectParent();
            newDots[i] = parent.baby();

        }

        this.dots = newDots;
        this.gen++;
    }

    calculateSumFitness(goalX, goalY){
        var fitnessSum = 0;
        for(let i = 0; i<this.size;i++) {
            fitnessSum += this.dots[i].calculateFitness(goalX, goalY);
        }
        this.fitnessSum = fitnessSum;
    }

    selectParent(){
        var rand = random(this.fitnessSum);
        var runningSum = 0;
        for(let i = 0; i<this.size;i++) {
            runningSum += this.dots[i].fitness;
            if(runningSum >= rand){
                return this.dots[i];
            }
        }
    }

    mutate(mutationRate){
        for(let i = 1; i<this.size;i++) {
            this.dots[i].brain.mutationRate = mutationRate;
            this.dots[i].brain.mutate();
        }
    }

    setBestDot(){
        let max = 0;
        let maxIndex = 0;
        for(let i = 0; i<this.size;i++) {
            if(this.dots[i].fitness > max){
                max = this.dots[i].fitness;
                maxIndex = i;
            }
        }

        if(this.dots[maxIndex].reachedGoal){
            this.bestStep = this.dots[maxIndex].brain.step;
        }
        this.bestDot = maxIndex;
    }

    noGoalReached(){
        for(let i = 1; i<this.size;i++) {
            if(this.dots[i].reachedGoal){
                return false; 
            }
        }
        return true;
    }
}
