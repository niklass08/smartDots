class brain {

    constructor(size){
        this.directions = []
        this.size = size;
        this.step = 0;
    }

    randomize(){

        for(let i = 0; i < this.size; i++){
            let randomAngle = random(2*PI);
            this.directions[i] = p5.Vector.fromAngle(randomAngle);
        }
    }

    clone(){
        var clone = new brain(this.size);
        for(let i = 0; i<this.size; i++){
            clone.directions[i] = this.directions[i];
        }
        return clone;
    }


    mutate(){
        var mutationRate = 0.01;
        var rand = 0;
        for(let i = 0;i<this.size;i++){
            rand = random(1);
            if(rand < mutationRate){
                let randomAngle = random(2*PI);
                this.directions[i] = p5.Vector.fromAngle(randomAngle);
            }
        }
    }
}