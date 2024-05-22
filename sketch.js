let b;
let p1;
let p2;

function selectPlayer1(){
  let a = document.getElementById("bot1").value;
  p1 = new Player1("test1");
  if(a==2){
    p1 = new Something_Else("will");
  }
}
function selectPlayer2(){
  let a = document.getElementById("bot2").value;

  p2 = new Player1("test2");
  if(a==2){
    p2 = new Something_Else("will");
  }
}

function setup() {
  
  

  createCanvas(400, 400);
  selectPlayer1()
  selectPlayer2()
  
  b = new Board(p1,p2);
  background(220);
  b.draw();
    noLoop()


}
function resetClick(){
  b.reset()
}
function buttonClick(){
      let a = document.getElementById("mode").value;
  if(a==1){
    loop()
    if(b.isOver()){
      b.reset()
    }
    b.playGame();
  }
  else if(a==3 && !b.isOver()){
    loop()
    b.playTurn();
  }
  else{
    noLoop()
    tournament();
  }

}
function tournament(){
  let num = 10;
  let n = document.getElementById("tourSize").value;
  console.log(n)
  if(n>0 && n<=1000){
    num = n;
  }
  let outcome = [0,0,0,0]
  
  for(let i=0;i<num;i++){
    b.reset()
    let o = b.playGame();
    if(o==p1.getName()){
      outcome[0]++
    }
    else if(o==p2.getName()){
      outcome[1]++;
    }
  }
  
  b.switch();
  for(let i=0;i<num;i++){
    b.reset()
    let o = b.playGame();
    if(o==p1.getName()){
      outcome[2]++
    }
    else if(o==p2.getName()){
      outcome[3]++;
    }
  }
  background(220)
  b.draw()
  // console.log(outcome)
  let prop1=outcome[0]/num
  let prop2=outcome[1]/num
  noStroke()
  fill(255)
  rect(80,200,200,20)
  fill(255,0,0)
  rect(280-200*(prop2),200,200*(prop2),20)
  fill(0,255,0)
  rect(80,200,200*prop1,20)
  stroke(2)
  fill(0)
  // text("as Player1",150,210)
  text(p1.getName(),20,215)
  text(outcome[0],80,240)
  text(outcome[1],260,240)
  text(num-(outcome[0]+outcome[1]),80+200*(prop1),240)
  noStroke()
  prop1=outcome[2]/num
  prop2=outcome[3]/num  
  fill(255)
  rect(80,250,200,20)
  fill(255,0,0)
  rect(280-200*(prop2),250,200*(prop2),20)
  fill(0,255,0)
  rect(80,250,200*prop1,20)
  stroke(2)
  fill(0)
  // text("as Player1",150,260)
  text(p2.getName(),20,265)
  text(outcome[2],80,290)
  text(outcome[3],260,290)
  text(num-(outcome[2]+outcome[3]),80+200*(prop1),290)
  
    noStroke()
  prop1=(outcome[2]+outcome[0])/num/2
  prop2=(outcome[1]+outcome[3])/num/2
  fill(255)
  rect(80,320,200,20)
  fill(255,0,0)
  rect(280-200*(prop2),320,200*(prop2),20)
  fill(0,255,0)
  rect(80,320,200*prop1,20)
  stroke(2)
  fill(0)
  text("combined",150,310)
  text(p1.getName(),20,330)
  text(p2.getName(),290,330)
  text(outcome[0]+outcome[2],80,360)
  text(outcome[1]+outcome[3],260,360)
  text(2*num-(outcome[1]+outcome[2]+outcome[3]+outcome[0]),80+200*(prop1),360)

  fill(255)
}


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
    fill(255)
    stroke(0)
    textSize(15)
    strokeWeight(1)
    background(200)
    ellipse(70,125,25,100)
        fill(0)

    text(this.s2,70,125)

    for(let i=0;i<6;i++){
      fill(255)
      ellipse(i*30+100,100,25,45)
      fill(0)
      text(this.spaces[11-i],i*30+100,100)
    }
          fill(255)

    ellipse(280,125,25,100)
    fill(0)
    text(this.s1,280,125)

    for(let i=0;i<6;i++){
            fill(255)

      ellipse(i*30+100,150,25,45)
      fill(0)
      text(this.spaces[i],i*30+100,150)

    }
  }
}
