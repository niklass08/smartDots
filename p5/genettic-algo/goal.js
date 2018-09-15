class goal{
    constructor(x, y){
        this.pos = createVector(x, y);
    }

    show(){
        fill(0, 0, 255);
        ellipse(this.pos.x, this.pos.y, 10, 10);
    }
}