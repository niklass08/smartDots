class obstacle{
    constructor(x, y){
        this.pos = createVector(x, y);
        this.diameter =75;;
    }

    show(){
        fill(255,0,0);
        ellipse(this.pos.x, this.pos.y, this.diameter);
    }
}