class NeuralPlayer extends Player{
  constructor(name, w,b){
    super(name)
    this.w = w;
    this.b = b;
  }

  /*wells is a 12 element int array of the number of pieces in each space (shown below)
  S1 and S2 are the player's stores, which decides the score for each player.
  
                      ||  Opponent
                      \/       
           +====================================+
           |    | 11 | 10 | 9  | 8 | 7 | 6 |    |
           | S2 |==========================| S1 |
           |    | 0  | 1  | 2  | 3 | 4 | 5 |    |
           +====================================+
                                /\
                        Player  ||
  */
  getMove(wells, store1, store2){
    let layers = b.length;
    let l = wells;
    l[12] = store1;
    l[13] = store2;
    for(let i=0;i<layers;i++){
      let n = [];
      let w = this.w[i]
      let b = this.b[i]
      for(let j = 0;j<b.length;j++){
        n[j]=b[j]
        for(let k=0;k<l.length;k++){
          n[j]+=l[k]*w[j][k];
        }
        n[j]=actv(n[j);
      }
      l=n;
    }
    let ind = 0;
    for(let i=1;i<6;i++){
      if(l[i]>l[ind]){
        ind = i;
      }
    }
    
    return i;
  }
  
  
}
