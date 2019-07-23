class brain {

    constructor(size, mutationRate){
        this.directions = []
        this.size = size;
        this.step = 0;
        this.mutationRate = mutationRate;
    }

    randomize(){

        for(let i = 0; i < this.size; i++){
            let randomAngle = random(2*PI);
            this.directions[i] = p5.Vector.fromAngle(randomAngle);
        }
    }

    clone(){
        var clone = new brain(this.size, this.mutationRate);
        for(let i = 0; i<this.size; i++){
            clone.directions[i] = this.directions[i];
        }
        return clone;
    }


    mutate(){
        var rand = 0;
        for(let i = 0;i<this.size;i++){
            rand = random(1);
            if(rand < this.mutationRate){
                let randomAngle = random(2*PI);
                this.directions[i] = p5.Vector.fromAngle(randomAngle);
            }
        }
    }
}
