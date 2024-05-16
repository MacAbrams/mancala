let b;
let p1;
let p2;

function setup() {
  createCanvas(400, 400);
  p1 = new Player("test1")
  p2 = new Player("test2")
  
  b = new Board(p1,p2);
  background(220);
  b.draw();

}
function resetClick(){
  b.reset()
}
function buttonClick(){
      let a = document.getElementById("mode").value;
  if(a==1){
    if(b.isOver()){
      b.reset()
    }
    b.playGame();
  }
  else if(a==3 && !b.isOver()){
    b.playTurn();
  }
  // else{
  //   tournament();
  // }

}
// function tournament(){
//   let num = 10;
//   let outcomes = []
//   for(let i=0;i<num;i++){
    
//   }

// }


function draw() {
  
  b.draw()
  
  if(b.isOver()){
    textSize(25)

    let outcome = b.getWinner()
    if(outcome != "tie"){
      outcome = "Winner: "+outcome;
    }
    text(outcome,100,300)
      textSize(14)

  }
}

/*  
                      ||  Player 2
                      \/       
           +====================================+
           |    | 11 | 10 | 9  | 8 | 7 | 6 |    |
           | S2 |==========================| S1 |
           |    | 0  | 1  | 2  | 3 | 4 | 5 |    |
           +====================================+
                         e   /\
                      Player 1  ||
*/
class Board{
  constructor(p1,p2){
    this.s1 = 0;

    this.spaces = []
    for(let i=0;i<12;i++){
      this.spaces[i] = 4;
    }

    this.s2 = 0;
    
    this.p1 = p1;
    this.p2 = p2;
    this.p1.setPlayer1(true);
    this.p2.setPlayer1(false);
    this.turnNumber = 0;
    this.retries = 0;
  }
  switch(){
    let temp = this.p1;
    this.p1=this.p2;
    this.p2 = temp;
    this.p1.setPlayer1(true);
    this.p2.setPlayer1(false);
  }
  reset(){
        this.s1 = 0;

    this.spaces = []
    for(let i=0;i<12;i++){
      this.spaces[i] = 4;
    }

    this.s2 = 0;
    this.turnNumber = 0;
    this.retries = 0;
  }
  playGame(){
    while(!this.isOver()){
      this.playTurn();
    }
    return this.getWinner();
  }
  playTurn(){
    this.retries = 0;
    if(this.turnNumber%2==0){
      let playing = true;
      while (playing){
        playing = this.playMove(0,this.p1.getMove(this.spaces,this.s1,this.s2))
      }
    }
    else{
      let reversed = [];
      let playing = true;
      while (playing){
        for(let i=0;i<11;i++){
          reversed[i] = this.spaces[11-i]
        }
        playing = this.playMove(1,11-this.p2.getMove(reversed,this.s2,this.s1))
      }
    }
    this.turnNumber++;
    // this.draw()
  }
  playMove(turn,space){
    this.retries++;
    if(this.retries>1000){
      return false;
    }
      if(space<12 && space>=0 && this.spaces[space]>0){
    
        let hand = this.spaces[space];
        this.spaces[space] = 0

        let rerun = this.move(turn,space,hand);
        return rerun;
      }
    return true;
  }
  isOver(){
    let a = 0;
    let b = 0;
    for(let i=0;i<6;i++){
      a+=this.spaces[i];
      b+=this.spaces[i+6];
    }
    if(a==0 || b==0){
      return true;
    }
    return false
  }
  getWinner(){
    if(this.s1>this.s2){
      return this.p1.getName()
    }
    if(this.s1<this.s2){
      return this.p2.getName()
    }
    return "tie"
  }
  move(turn, space, hand){
    space++;
    if(turn ==0 && space == 6){
      hand--;
      this.s1++;
      if(hand <=0){
        return true
      }
    }
    if(turn ==1 && space == 12){
      hand--;
      this.s2++;
      if(hand <=0){
        return true
      }
      space = 0
    }
    else if(space == 12){
      space = 0;
    }
      // if(space)
    this.spaces[space] ++;
    hand--;
    
    this.draw()
    text(hand,200,200);
    if(hand>0){
      return this.move(turn,space,hand)
    }
    else if(hand==0 && !this.isOver()&& this.spaces[space]>1){
      return this.playMove(turn, space)
    }
    return false
  }
  draw(){
    background(200)
    ellipse(70,125,25,100)
    text(this.s2,70,125)

    for(let i=0;i<6;i++){
      ellipse(i*30+100,100,25,45)
      text(this.spaces[11-i],i*30+100,100)
    }
    ellipse(280,125,25,100)
    text(this.s1,280,125)

    for(let i=0;i<6;i++){
      ellipse(i*30+100,150,25,45)
      text(this.spaces[i],i*30+100,150)

    }
  }
}
