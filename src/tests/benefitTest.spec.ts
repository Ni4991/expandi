
import * as Lab from 'lab'

import { expect } from 'code'
import { Player , CreatePlayer, RaceType} from '../logic/Player';
import { Benefit, Trigger, Value, Material } from '../logic/Benefit';
import TechBoard from '../logic/TechBoard';
import Tech from '../logic/Tech';
import { FederationLib } from '../logic/Federation';

const lab = Lab.script()
const { describe, it, before, beforeEach } = lab
export { lab }


describe('experiment', () => {
    before(() => {});

    it('verifies 1 equals 1', () => {
        expect(1).to.equal(1);
    });
});

describe('Benefit Test', () => {
    let p: Player
    let b1: Benefit;
    let b2: Benefit;
    // let b3: Benefit;
    beforeEach(() => {
        p =  CreatePlayer('jon', RaceType.Terrans);
        b1 = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Gold)]);
        b2 = new Benefit(Trigger.Now, null, null, [new Value(1, Material.Ore)]);
        // b3 = new Benefit(Trigger.Income, null, null, [new Value(3, Material.QIC)]);
    })

    it('can add the resource of now benefit into player class', () => {
        var oldOre = p.ore;
        p.getTechBenefit(b2);
        var nowOre = p.ore;
        expect(nowOre - oldOre).to.equal(1);
    })

    it('can add mutiple resources', () => {
        var g1 = p.gold;
        var o1 = p.ore;
        var s1 = p.science;
        var q1 = p.qic
        var b3 = new Benefit(Trigger.Now, null, null, [new Value(10, Material.Gold),
                                                       new Value(3, Material.Ore),
                                                       new Value(5, Material.Science),
                                                       new Value(7, Material.QIC)]);
        p.getTechBenefit(b3);
        expect(p.gold - g1).to.equal(10);
        expect(p.ore - o1).to.equal(3);
        expect(p.science - s1).to.equal(5);
        expect(p.qic - q1).to.equal(7);
    })

    it('can add mutiple resources from multiple benefits', () => {
        var g1 = p.gold;
        var o1 = p.ore;
        var s1 = p.science;
        var q1 = p.qic
        var b3 = new Benefit(Trigger.Now, null, null, [new Value(10, Material.Gold),
                                                       new Value(3, Material.Ore),
                                                       new Value(5, Material.Science),
                                                       new Value(7, Material.QIC)]);
        var b4 = new Benefit(Trigger.Now, null, null, [new Value(2, Material.Gold),
                                                       new Value(6, Material.Ore),
                                                       new Value(1, Material.Science),
                                                       new Value(9, Material.QIC)]);
        p.getTechBenefit(b3);
        p.getTechBenefit(b4);
        expect(p.gold - g1).to.equal(12);
        expect(p.ore - o1).to.equal(9);
        expect(p.science - s1).to.equal(6);
        expect(p.qic - q1).to.equal(16);
    })
})

describe('tech test', () => {
    let p: Player
    let techboard: TechBoard;
    let fedLib = new FederationLib();
    beforeEach(() => {
        //console.log("tech test begin");
        p = CreatePlayer('jon', RaceType.Terrans);
        expect(p.techs[0]).to.equal(0);
        expect(p.techs[1]).to.equal(0);
        expect(p.techs[2]).to.equal(0);
        expect(p.techs[3]).to.equal(1);
        expect(p.techs[4]).to.equal(0);
        expect(p.techs[5]).to.equal(0);
        techboard = new TechBoard(false, fedLib.getDigLaneSpeicalFederationToken());
        // techboard.print();
    })

    it("update test: 1.if it can update; 2.can not update when it is level 5", () => {
        techboard.update(0,p);
        expect(p.techs[0]).to.equal(1);
        techboard.update(0,p);
        expect(p.techs[0]).to.equal(2);
        techboard.update(0,p);
        expect(p.techs[0]).to.equal(3);
        techboard.update(0,p);
        expect(p.techs[0]).to.equal(4);
        techboard.update(0,p);
        expect(p.techs[0]).to.equal(5);
        techboard.update(0,p);
        expect(p.techs[0]).to.equal(5);
    })

    it("has the right effect of dig tech", () => {
        //console.log("the dig cost was: " + p.digCost);
        techboard.update(0, p);
        expect(p.ore).to.equal(6);
        techboard.update(0, p);
        expect(p.digCost).to.equal(2);
        techboard.update(0, p);
        expect(p.digCost).to.equal(1);
        expect(p.power.bowl2).to.equal(7);
        expect(p.power.bowl1).to.equal(1);
        techboard.update(0, p);
        expect(p.ore).to.equal(8);
    })

    it('has right effect of range tech', () => {
        techboard.update(1,p);
        expect(p.qic).to.equal(2);
        techboard.update(1,p);
        expect(p.range).to.equal(2);
        techboard.update(1,p);
        expect(p.qic).to.equal(3);
        expect(p.power.bowl2).to.equal(7);
        expect(p.power.bowl1).to.equal(1);
        techboard.update(1,p);
        expect(p.range).to.equal(3);
        techboard.update(1,p);
        expect(p.range).to.equal(4);
    })

    it('has right effect of QIC tech', () => {
        // console.log("the terran QIC was: " + p.qic);
        techboard.update(2,p);
        expect(p.qic).to.equal(2);
        techboard.update(2,p);
        expect(p.qic).to.equal(3);
        techboard.update(2,p);
        expect(p.qic).to.equal(5);
        expect(p.power.bowl2).to.equal(7);
        expect(p.power.bowl1).to.equal(1);
        techboard.update(2,p);
        expect(p.qic).to.equal(7);
        techboard.update(2,p);
        expect(p.qic).to.equal(11);
    })

    it('has right effect of Gaia tech', () => {
        // console.log("the terran QIC was: " + p.qic);
        expect(p.gaiaformer).to.equal(1);
        expect(p.gaiaFormingCost).to.equal(6);
        techboard.update(3,p);
        expect(p.power.bowl1).to.equal(7);
        techboard.update(3,p);
        expect(p.gaiaformer).to.equal(2);
        expect(p.gaiaFormingCost).to.equal(4);
        expect(p.power.bowl2).to.equal(7);
        expect(p.power.bowl1).to.equal(4);
        techboard.update(3,p);
        expect(p.gaiaformer).to.equal(3);
        expect(p.gaiaFormingCost).to.equal(3);
        techboard.update(3,p);
        // expect(p.qic).to.equal(11);
    })

    if('race HadschHallas add 2 gold 1 ore 1 science and power charge 1 at income phase'){
      let p = CreatePlayer('yalei', RaceType.HadschHallas);
      expect(p.science).to.equal(3);
      expect(p.ore).to.equal(4);
      expect(p.gold).to.equal(15);
      expect(p.power.bowl1).to.equal(2);
      expect(p.power.bowl2).to.equal(4);
      // p.calculateIncomeBenefit();
      // expect(p.science).to.equal(4);
      // expect(p.ore).to.equal(5);
      // expect(p.gold).to.equal(20);
      // expect(p.power.bowl1).to.equal(1);
      // expect(p.power.bowl2).to.equal(5);
    }




})

describe("special power test",() => {
    let p: Player;

    beforeEach(() => {
        p = CreatePlayer('yalei', RaceType.Terrans);
    })

    it('begin the test', () => {
        console.log();
        console.log("***********special power test begin***********");
        p.printSpecialPower();
        expect(1).to.equal(1);
        for(let i = 0; i < p.specialPowers.length; i++){
            expect(p.specialPowers[i].ifGet).to.equal(false);
        }
    })

    it('can directly activate the special power', () => {
        p.specialPowers[0].activatePower();
        expect(p.specialPowers[0].ifGet).to.equal(true);
    })

    it('can get the special power from the benefit', () => {
        p.activateSpecialPower(new Benefit(Trigger.Special, null, null, [new Value(3, Material.Science)]));
        // p.printSpecialPower();
        expect(p.specialPowers[6].ifGet).to.equal(true);
    })

    it('can get the special power from the normal techtile', () => {
        let t = new TechBoard(false);
        t.takeNormal3TechTiles(2, 0, p);
        expect(p.specialPowers[3].ifGet).to.equal(true);
    })

    it('can get the special power from the advance techtile', () => {
        let t = new TechBoard(false);
        t.takeAdvancedTechTiles(2, 0, p);
        expect(p.specialPowers[4].ifGet).to.equal(true);
    })

    it('can get advance techtile special power and turn off the normal techtile special power', () => {
        let t = new TechBoard(false);
        t.takeNormal3TechTiles(2, 0, p);
        expect(p.specialPowers[3].ifGet).to.equal(true);
        t.takeAdvancedTechTiles(2, 8, p);
        expect(p.specialPowers[3].ifGet).to.equal(false);
        expect(p.specialPowers[4].ifGet).to.equal(true);
    })

    it('can not use a deactivated special power', () => {
        let flag = p.useSpecialPower(0);
        expect(flag).to.equal(false);
    })

    it('can not use one special power two times in one turn', () => {
        let t = new TechBoard(false);
        t.takeNormal3TechTiles(2, 0, p);
        let flag = p.useSpecialPower(3);
        expect(flag).to.equal(true);
        flag = p.useSpecialPower(3);
        expect(flag).to.equal(false);
    })

    it('has the right effect of QIC1', () => {
        p.specialPowers[0].activatePower();
        p.useSpecialPower(0);
        expect(p.qic).to.equal(2);
    })
})
