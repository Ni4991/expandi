import { Material } from "./Benefit";
import { Player } from "./Player";

/**
 * the class Merchandise
 * this class will be used in the Exchange to reperesent a material
 * will also be used in the store in the TechBoard class
 * @argument give: the material used to trade
 * @argument get: the material you want
 * @argument numGive: the quantity to give in one trade
 * @argument numGet: the quantity you get in one trade
 */
class Merchandise{
  public give: Material;
  public get: Material;
  public numGive: number;
  public numGet: number;

  constructor(give: Material, get: Material, numGive: number, numGet: number){
    this.give = give;
    this.get = get;
    this.numGive = numGive;
    this.numGet = numGet;
  }
}

/**
 * Exchange has nine kinds of Merchandise;
 * this class will be initialized in the Action class;
 * after initialized, nine merchandises will be pushed into an array;
 */
class Exchange{
  public powerToQIC: Merchandise;
  public powerToOre: Merchandise;
  public powerToSicence: Merchandise;
  public powerToGold: Merchandise;
  public oreToGold: Merchandise;
  public oreToExtra: Merchandise;
  public qicToRange: Merchandise;
  public qicToOre: Merchandise;
  public scienceToGold: Merchandise;
  public exchanges: Merchandise[];

  constructor(){
    this.powerToQIC = new Merchandise(Material.Charge, Material.QIC, 4, 1);
    this.powerToOre = new Merchandise(Material.Charge, Material.Ore, 3, 1);
    this.powerToSicence = new Merchandise(Material.Charge, Material.Science, 4, 1);
    this.powerToGold = new Merchandise(Material.Charge, Material.Gold, 1, 1);
    this.oreToGold = new Merchandise(Material.Ore, Material.Gold, 1, 1);
    this.oreToExtra = new Merchandise(Material.Ore, Material.Power, 1, 1);
    this.qicToRange = new Merchandise(Material.QIC, Material.SpecialRange, 1, 2);
    this.qicToOre = new Merchandise(Material.QIC, Material.Ore, 1, 1);
    this.scienceToGold = new Merchandise(Material.Science, Material.Gold, 1, 1);
    this.exchanges.push(this.powerToQIC);
    this.exchanges.push(this.powerToOre);
    this.exchanges.push(this.powerToSicence);
    this.exchanges.push(this.powerToGold);
    this.exchanges.push(this.oreToGold);
    this.exchanges.push(this.oreToExtra);
    this.exchanges.push(this.qicToRange);
    this.exchanges.push(this.qicToOre);
    this.exchanges.push(this.scienceToGold);
  }

  /**
   * the function to make a particular times of trade;
   * @param player the player who does the trade;
   * @param give the material given out;
   * @param get the material get;
   * @param times the times of trade
   */
  public trade(player: Player, give: Material, get: Material, times: number){
    var good = null;
    // find the type of trading
    for(let i = 0; i < this.exchanges.length; i++){
      if(this.exchanges[i].give === give && this.exchanges[i].get === get){
        good = this.exchanges[i];
        break;
      }
    }

    if(good === null) {// if not find the type of trading
      console.log("merchandise not found");
      return;
    }

    var totalGive = good.numGive * times;
    var totalGet = good.numGet * times;
    //check if you have enough resources
    if(!this.checkResources(player, give, totalGive)){
      console.log("not enough resources");
      return;
    }

    if(give === Material.Charge) player.spendPower(totalGive);
    if(give === Material.Ore) player.ore -= totalGive;
    if(give === Material.QIC) player.qic -= totalGive;
    if(give === Material.Science) player.science -= totalGive;

    /**
     * // problem: how to reduce it after one action?
     * In player's class, if does exchange and get === Material.SpecialRange, do player.range-=totalGet after the exchange
     */
    if(get === Material.SpecialRange) player.specialRange += totalGet;
    if(get === Material.QIC) player.qic += totalGet;
    if(get === Material.Ore) player.ore += totalGet;
    if(get === Material.Gold) player.gold += totalGet;
    if(get === Material.Science) player.science += totalGet;
    if(get === Material.Power) player.power1 += totalGet;
  }

  /**
   * check if the player has enough resources to buy something
   * @param player
   * @param give the material given out
   * @param quantity the total number of resource needed
   */
  public checkResources(player: Player, give: Material, quantity: number){
    if(give === Material.Charge) return player.power3 >= quantity;
    if(give === Material.Ore) return player.ore >= quantity;
    if(give === Material.QIC) return player.qic >= quantity;
    if(give === Material.Science) return player.science >= quantity;
    console.log("material not found");
    return false;
  }


}

export {Merchandise, Exchange}
