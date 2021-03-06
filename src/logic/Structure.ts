import {Benefit, Value}   from './Benefit'

enum StructureType {
  Mine      = 0,
  Station   = 1,
  Lab       = 2,
  Academy   = 3,
  Institute = 4,
}
enum StructureStatus{
  Built = 0,
  Unbuilt = 1
}

class Structure {
  public value : number   // for neighbor building power charge
  public cost : Value[]
  public type : StructureType
  public owner : number  // change type from player to numer for playerID
  public status : StructureStatus
  public benefit : Benefit
  public location : Location | null = null

  constructor(type: StructureType, price: Value[], power: number, benefit: Benefit){
    this.value = power
    this.status = StructureStatus.Unbuilt
    this.type = type
    this.cost = price
    this.benefit = benefit
  }

  /**
   * when get or loose the tech tile of changing value, this function will work
   * @param value
   */
  public changePowerValue(value: number){
    this.value = value;
  }

  public changeBenefit(newBenefit: Benefit) {
    this.benefit = newBenefit;

  }

}

export {StructureType,StructureStatus, Structure}
