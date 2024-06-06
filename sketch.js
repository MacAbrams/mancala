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
  setP1(p1){
    this.p1 = p1;
  }
  setP2(p2){
    this.p2 = p2;
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
        let tempSp = [...this.spaces];
        let temps1 = this.s1
        let temps2 = this.s2
        let m = this.p1.getMove(tempSp,temps1,temps2)

        playing = this.playMove(0,m)
        // console.log(this.spaces,m )

      }
    }
    else{
      let reversed = [];
      let playing = true;
      while (playing){
        for(let i=0;i<11;i++){
          reversed[i] = this.spaces[11-i]
        }
        let tempSp = [...reversed];
        let temps1 = this.s1
        let temps2 = this.s2
        let m = 11-this.p2.getMove(reversed,temps2,temps1)
        playing = this.playMove(1,m)
        // console.log(this.spaces,m )
      }
    }
    this.turnNumber++;
    // this.draw()
  }
  playMove(turn,space){
    // console.log(space)
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

    if(String(this.s2).length==1){
      text(this.s2,66,129)
    }
    else{
      text(this.s2,62,129)
    }

    for(let i=0;i<6;i++){
      fill(255)
      ellipse(i*30+100,100,25,45)
      fill(0)
      if(String(this.spaces[11-i]).length==1){
        text(this.spaces[11-i],i*30+96,104)
      }
      else{
        text(this.spaces[11-i],i*30+93,104)
      }
    }
          fill(255)

    ellipse(280,125,25,100)
    fill(0)
    if(String(this.s1).length==1){
      text(this.s1,277,129)
    }
    else{
      text(this.s1,273,129)
    }

    for(let i=0;i<6;i++){
            fill(255)

      ellipse(i*30+100,150,25,45)
      fill(0)
      if(String(this.spaces[i]).length==1){
        text(this.spaces[i],i*30+96,154)
      }
      else{
        text(this.spaces[i],i*30+93,154)
      }
    }
    let c = 0;
    for(let i=0;i<12;i++){
      c +=this.spaces[i];
    }
    text(c,200,320)
    text(c+this.s1+this.s2,200,340)
  }
}

let b;
let p1;
let p2;
  b = new Board(new Player("rando 1"),new Player("rando 2"));

function selectPlayer1(){
  let a = document.getElementById("bot1").value;
  p1 = new Player("test1");
  if(a==2){
    p1 = new Something_Else("will");
  }
  if(a==3){
    p1 = new MacBot("mac");
  }
  if(a==4){
    p1 = new JackBot("jack");
  }
  b.setP1(p1);
}
function selectPlayer2(){
  let a = document.getElementById("bot2").value;

  p2 = new Player("test2");
  if(a==2){
    p2 = new Something_Else("will");
  }
  if(a==3){
    p2 = new MacBot("mac");
  }
  if(a==4){
    p2 = new JackBot("jack");
  }
  b.setP2(p2);

}

function setup() {
  
  

  createCanvas(400, 400);
  selectPlayer1()
  selectPlayer2()
  
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
  else if(a==3){
    if(!b.isOver()){
    loop()
    b.playTurn();
    }
  }
  else{
    noLoop()
    tournament();
  }

}
function tournament(){
  let num = 10;
  let n = document.getElementById("tourSize").value;
  // console.log(n)
  if(n>0 && n<=1000){
    num = n;
  }
  let outcome = [0,0,0,0]
  // console.log("initial p1:"+b.p1.getName()+"  p2:"+b.p2.getName())

  b.switch();

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

  // console.log("second  p1:"+b.p1.getName()+"  p2:"+b.p2.getName())

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
  console.log(outcome)
  
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
  prop1=(outcome[3]+outcome[0])/num/2
  prop2=(outcome[1]+outcome[2])/num/2
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
  text(outcome[0]+outcome[3],80,360)
  text(outcome[1]+outcome[2],260,360)
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
