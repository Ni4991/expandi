import {Race, BuildBenefit, RaceType} from "../Race";
import { PlanetType, Planet } from "../Planet";
import { Benefit, Trigger, BuildingType, Value, Material } from "../Benefit";
import TechBoard from "../TechBoard";

export class Terrans extends Race{

    /**
     * Initialise the starting state of Terrans
     * @param name 
     */
    constructor(name:string) {
        super(name);
        this.setRaceType(RaceType.Terrans);
        this.setPlanetType(PlanetType.Blue);
        this.techs = [0,0,0,1,0,0];
        this.gaiaformer = 1;
        this.power.bowl1 = 4;

        //Permanent Incomes
        const ore = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore)]);
        const science = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);

        this.income.push(ore)
        this.income.push(science);

    }

    /**
     * Gaia Phase for Terrans goes straight into bowl 2 
     */
    public GaiaPhase(){
       this.power.bowl2 += this.power.gaia;
       for(let planet of this.gaiaProjectPlanets){
         planet.type = PlanetType.Gaia;
       }

       this.gaiaProjectPlanets = [];
    }





}
