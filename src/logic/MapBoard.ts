import {Hex} from './Hex'
import {Planet, PlanetType} from './Planet'
import {Config} from './Game'


class Space {
  public hex:Hex
  public planet:Planet|null
  constructor(hex:Hex){
    this.hex = hex
    this.planet = null
  }

  public static spiral(center: Hex, radius:number){
    const hexs = Hex.spiral(center, radius);
    let spaces:Space[] = [];
    for(let hex of hexs){
        spaces.push(new Space(hex))
    }
    return spaces;
  }

  public setPlanetType(type: PlanetType){
    this.planet = new Planet(this.hex, type);
  }


}


class MapBoard {
   public spaces : Space[]
   public planets: Planet[]
   public spacesMap: Map<Hex, Planet|null>

  constructor(public size: number = 10){
     this.spaces = []
     this.planets = []
     this.spacesMap  = new Map<Hex, Planet|null>();

    //  generate the tiles
    // place planets on tiles
    // randomly arrange the tiles into an acceptable configuration
    // (no two planets of the same type adjacent, except TransDim)
    this.setup(Config.PlayerLimit)
  }

  public getPlanet(hex: Hex): Planet|null|undefined {
    // if there's a planet in that spot, return it to the caller
    // otherwise return void or maybe throw an exception
    return this.spacesMap.get(hex)


  }

  public getHex(q:number, r:number){
    return new Hex(q, r, -q-r)
  }

  // setup map for player
  public setup(playerNumber: number){
        var centers = [];
        centers[0] = this.getHex(0, 0);
        centers[1] = this.getHex(2, 3);
        centers[2] = this.getHex(5, -2);
        centers[3] = this.getHex(-5, 2);
        centers[4] = this.getHex(-3, 5);
        centers[5] = this.getHex(-8, 7);
        centers[6] = this.getHex(7, 1);
        centers[7] = this.getHex(4, 6);
        centers[8] = this.getHex(-1, 8);
        centers[9] = this.getHex(-6, 10);

        var spaces0 = Space.spiral(centers[0], 2);
        spaces0[0].setPlanetType(PlanetType.Blue);
        spaces0[5].setPlanetType(PlanetType.Orange);
        spaces0[8].setPlanetType(PlanetType.Red);
        this.randomRotation(spaces0);

        var spaces1 = Space.spiral(centers[1], 2);

        this.randomRotation(spaces1);

        var spaces2 = Space.spiral(centers[2], 2);

        this.randomRotation(spaces2);

        var spaces3 = Space.spiral(centers[3], 2);

        this.randomRotation(spaces3)


        var spaces4 = Space.spiral(centers[4], 2);

        this.randomRotation(spaces4)

        var spaces5 = Space.spiral(centers[5], 2);

        this.randomRotation(spaces5);


        var spaces6 = Space.spiral(centers[6], 2);

        this.randomRotation(spaces6);


        var spaces7 = Space.spiral(centers[7], 2);

        this.randomRotation(spaces7)


        var spaces8 = Space.spiral(centers[8], 2);

        this.randomRotation(spaces8)

        var spaces9 = Space.spiral(centers[9], 2);

        this.randomRotation(spaces9)


        var spaces = spaces0.concat(spaces1);
        spaces = spaces.concat(spaces2);
        spaces = spaces.concat(spaces3);
        spaces = spaces.concat(spaces4);
        spaces = spaces.concat(spaces5);
        spaces = spaces.concat(spaces6);
        spaces = spaces.concat(spaces7);
        spaces = spaces.concat(spaces8);
        spaces = spaces.concat(spaces9);
        this.spaces = spaces;

        for(let space of spaces){
          this.spacesMap.set(space.hex, space.planet)
          if(space.planet != null)
            this.planets.push(space.planet);
        }


        return spaces;


  }

  public randomRotation(spaces: Space[]){
    // return  no rotation
    const value = Math.floor(Math.random() * 6);
    for(let i = 0; i < value; i++){
      spaces = this.spacesRotation(spaces);
    }
  }

  public spacesRotation(spaces: Space[]){
    const spacesRotation = [];
    for (let i = 0; i < spaces.length; i++) {
        spacesRotation[i] = this.getRotationHex(spaces[i]);
    }
    return spacesRotation;
  }

  public getRotationHex(s: Space){
    let a = s.hex
    const hex =  new Hex(-a.s, -a.q, -a.r);
    s.hex = hex;
    return s;
  }


  public hasNeighboring(hex: Hex, playerID: number ){
    //todo
    return true;
  }



}

export {Hex, MapBoard};
