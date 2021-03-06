import Tech from './Tech'
import TechTile from './TechTiles';
import { Player } from './Player';
import { FederationToken } from './Federation';

class TechBoard {
  public table: Tech[][];
  public normal6Id: number[];
  public normal6TechTiles: TechTile[];
  public normal3Id: number[];
  public normal3TechTiles: TechTile[];
  public advanceId: number[];
  public advanceTechTiles: TechTile[];
  public topLevelTaken: boolean[]


  constructor(randomTechtile:boolean = true, fed: FederationToken = null) { // for testcase which will set to false
    this.table = []
    this.normal6Id = []
    this.normal6TechTiles = []
    this.normal3Id = []
    this.normal3TechTiles =[]
    this.advanceId = []
    this.advanceTechTiles = []
    this.topLevelTaken = [false, false, false, false, false, false]
    this.loadTechs(randomTechtile, fed);
  }

  /**
   * print out the id
   */
  public print(){
    console.log("normal 6 are: " + this.normal6Id[0] + " " +
    this.normal6Id[1] + " " +
    this.normal6Id[2] + " " +
    this.normal6Id[3] + " " +
    this.normal6Id[4] + " " +
    this.normal6Id[5] + " " );

    console.log("normal 3 are: " + this.normal3Id[0] + " " +
    this.normal3Id[1] + " " +
    this.normal3Id[2] + " " );

    console.log("advance 6 are: " + this.advanceId[0] + " " +
    this.advanceId[1] + " " +
    this.advanceId[2] + " " +
    this.advanceId[3] + " " +
    this.advanceId[4] + " " +
    this.advanceId[5] + " " );
  }


  public canUpdate(lane: number, player: Player){  // 0 - 5  lane 0 -5
     var level = player.techs[lane];
     if(level ===5 ||(level === 4 && this.topLevelTaken[lane] === true)) {
       return false;
     }else{
       return true;
     }
   }

   /**
    * update the technology
    * @param lane update the lane of tech
    * @param player
    */
   public update(lane: number, player: Player){  // 0 - 5  lane 0 -5
      var level = player.techs[lane];
      if(level === 5 ||(level === 4 && this.topLevelTaken[lane] === true)) {
        // var stack = new Error().stack
        // console.log( stack )
        console.log("max level can only access by one or level already max ");
        return;
      }
      this.table[lane][level + 1].update(player);
      player.techs[lane]++;

      if(level + 1 === 5)
         this.topLevelTaken[lane] = true;
   }

   /**
    *
    * @param lane which lane of techtile you want to take
    * @param player which player take
    */
   public takeNormal6TechTiles(lane: number, player: Player){
      this.normal6TechTiles[lane].onTechTile(player);
      this.update(lane, player);
   }

   /**
    * when you take the above 3 techtiles, you need to specify which lane of technology
    * you want to update
    * @param index the techtile index in the normail3TechTiles
    * @param lane the lane of tech you want to update
    * @param player the player who do this
    */
   public takeNormal3TechTiles(index: number, lane: number, player: Player){
      this.normal3TechTiles[index].onTechTile(player);
      this.update(lane, player);
   }

   /**
    * when you take the advance techtile, you must also turn off a normal techtile
    * @param lane the one you take
    * @param offId the one you turn off
    * @param player who will take
    */
   public takeAdvancedTechTiles(lane: number, offId: number, player: Player){
      this.advanceTechTiles[lane].onAdvanceTechTile(player, offId);
      this.update(lane, player);
   }

   /**
    * initialize the tech board
    * @param randomTechtile 
    */
   public loadTechs(randomTechtile : boolean, fed: FederationToken){
    var i;
    var j;

    for(i = 0; i < 6; i++){
      this.table[i] = [];
     for(j = 0; j< 6; j++){
       this.table[i][j] = new Tech(i, j);
       if(i === 0 && j === 5) this.table[i][j].putFed(fed);
     }
    }

    var arr = [0,1,2,3,4,5,6,7,8];
    if(randomTechtile === true){
        arr.sort(function(){ return 0.5 - Math.random() });
    }

    for(i = 0; i < 6; i++){
      this.normal6Id[i] = arr[i];
      this.normal6TechTiles[i] = new TechTile(arr[i]);
    }
    for(i = 0; i < 3; i++){
      this.normal3Id[i] = arr[i + 6];
      this.normal3TechTiles[i] = new TechTile(arr[i + 6]);
    }
    arr = [9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    if(randomTechtile === true){
        arr.sort(function(){ return 0.5 - Math.random() });
    }

    for(i = 0; i < 6; i++){
      this.advanceId[i] = arr[i];
      this.advanceTechTiles[i] = new TechTile(arr[i]);
    }
   }


}


export default TechBoard;
