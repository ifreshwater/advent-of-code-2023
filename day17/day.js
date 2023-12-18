
// 0bUDLR
// 0b0000
// |= set
// & check

const DIRECTIONS = {
    U: 0b1000, // 8
    D: 0b0100, // 4
    L: 0b0010, // 2
    R: 0b0001  // 1
}

const DIRECTIONS_ARR = {
    // [X, Y]
    0b1000: [0,-1], // ^
    0b0100: [0, 1], // V
    0b0010: [1, 0], // =>
    0b0001: [-1, 0] // <=
}

class MapNode {
    constructor(x,y,dir,straightCount){
        this.x = x
        this.y = y
        this.dir = dir
        this.straightCount = straightCount
    }

    key(){
        return `${this.x}-${this.y}-${this.dir}-${this.straightCount}`
    }

    neighbors(){
        const v = []
   
        if(this.dir != DIRECTIONS.D && !(this.dir == DIRECTIONS.U && this.straightCount == 3)){
            v.push([this.x, this.y-1, DIRECTIONS.U, this.dir == DIRECTIONS.U ? this.straightCount + 1 : 1])
        }
        if(this.dir != DIRECTIONS.U && !(this.dir == DIRECTIONS.D && this.straightCount == 3)){
            v.push([this.x, this.y+1, DIRECTIONS.D, this.dir == DIRECTIONS.D ? this.straightCount + 1 : 1])
        }
        // LEFT
        if(this.dir != DIRECTIONS.R && !(this.dir == DIRECTIONS.L && this.straightCount == 3)){
            v.push([this.x-1, this.y, DIRECTIONS.L, this.dir == DIRECTIONS.L ? this.straightCount + 1 : 1])
        }
        // RIGHT
        if(this.dir != DIRECTIONS.L && !(this.dir == DIRECTIONS.R && this.straightCount == 3)){
            v.push([this.x+1, this.y, DIRECTIONS.R, this.dir == DIRECTIONS.R ? this.straightCount + 1 : 1])
        }
        return v
    }
}


function part1(input){
    
    let newNode = new MapNode(1,1,DIRECTIONS.R,3)

    console.log(newNode.neighbors())



}
function part2(input){

}

module.exports = {
    part1,
    part2
}