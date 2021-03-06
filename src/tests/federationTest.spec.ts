
import * as Lab from 'lab'

import { expect } from 'code'
import { Player , CreatePlayer, RaceType} from '../logic/Player';
import { Benefit, Trigger, Value, Material, BuildingType } from '../logic/Benefit';
import TechBoard from '../logic/TechBoard';
import Tech from '../logic/Tech';
import { FederationLib, FederationTokenType } from '../logic/Federation';
import { MapBoard, Hex } from '../logic/MapBoard';
import { Action } from '../logic/Action';
import { Game } from '../logic/Game';
import { Request } from '../logic/Request';

const lab = Lab.script()
const { describe, it, before, beforeEach } = lab
export { lab }



describe('Federation Test', () => {
    let g = new Game(3);
    let board = g.board;
    let h1 = new Hex(1,4,-5);
    let h2 = new Hex(2,3,-5);
    let h3 = new Hex(3,3,-6);
    let h4 = new Hex(8,1,-9);
    let h5 = new Hex(2,4,-6);

    let p1 = board.getPlanet(h1);
    let p2 = board.getPlanet(h2);
    let p3 = board.getPlanet(h3);
    let p4 = board.getPlanet(h4);

    let p5 = board.getPlanet(h5);

    p1.playerID = 1;
    p2.playerID = 1;
    p3.playerID = 1;
    p4.playerID = 1;

    p5.playerID = 2;

    
    let p: Player;
    g.federationlib = new FederationLib(false);
    let request: Request;
    let action: Action;

    beforeEach(() => {
        p = CreatePlayer('nina', RaceType.Terrans);
        p.pid = 1;
        request = new Request();
    })

    it('can not federate with illegal request', () => {
        action = new Action(g, p, request);
        let judge = action.checkFederation();
        expect(judge).to.equal(false);
        expect(action.message).to.equal("federationTokenType required");
    })

    it('can not pass with an illegal token type', () => {
        request.federationTokenType = 7;
        action = new Action(g, p, request);
        let judge = action.checkFederation();
        expect(judge).to.equal(false);
        expect(action.message).to.equal("can not find this toke at game federationlib");
    })

    it('can not fed with low value buildings', () => {
        p1.building = 0;
        p2.building = 0;
        p3.building = 0;
        request.path.push(h1);
        request.path.push(h2);
        request.path.push(h3);
        request.federationTokenType = 1;
        action = new Action(g, p, request);
        let judge = action.checkFederation();
        expect(judge).to.equal(false);
        expect(action.message).to.equal("value of the buildings is too low");
    })

    it('can not go through another player s planet', () => {
        p1.building = 0;
        p2.building = 0;
        p3.building = 0;
        p5.building = 1;
        request.path.push(h1);
        request.path.push(h2);
        request.path.push(h5);
        request.federationTokenType = 1;
        action = new Action(g, p, request);
        let judge = action.checkFederation();
        expect(judge).to.equal(false);
        expect(action.message).to.equal("there is another players planet on the path");
    })

    it('can not let a player federate without enough power', () => {
        p2.building = 4;
        p3.building = 3;
        p4.building = 3;
        request.path.push(h2);
        request.path.push(h3);
        request.path.push(new Hex(4,2,-6));
        request.path.push(new Hex(5,2,-7));
        request.path.push(new Hex(6,1,-7));
        request.path.push(new Hex(8,1,-9));
        request.path.push(h4);
        p.power.bowl1 = 0;
        p.power.bowl2 = 0;
        request.federationTokenType = 1;
        action = new Action(g, p, request);
        let judge = action.checkFederation();
        expect(judge).to.equal(false);
        expect(action.message).to.equal("player do not have enough power to federate");
    })

    it('can pass the check fed with all settings rightly set', () => {
        p2.building = 4;
        p3.building = 3;
        p4.building = 3;
        request.path.push(h2);
        request.path.push(h3);
        request.path.push(new Hex(4,2,-6));
        request.path.push(new Hex(5,2,-7));
        request.path.push(new Hex(6,1,-7));
        request.path.push(new Hex(8,1,-9));
        request.path.push(h4);
        request.federationTokenType = 1;
        action = new Action(g, p, request);
        let judge = action.checkFederation();
        expect(judge).to.equal(true);
    })

    it('can form federation', () => {
        p2.building = 4;
        p3.building = 3;
        p4.building = 3;
        request.path.push(h2);
        request.path.push(h3);
        request.path.push(new Hex(4,2,-6));
        request.path.push(new Hex(5,2,-7));
        request.path.push(new Hex(6,1,-7));
        request.path.push(new Hex(8,1,-9));
        request.path.push(h4);
        request.federationTokenType = 1;
        action = new Action(g, p, request);
        let judge = action.FormFederation();
        expect(judge).to.equal(true);
    })

    it('can not use the same space in another federation s path to fed', () => {
        // fed a federation first
        p1.building = 1;
        p2.building = 4;
        p3.building = 3;
        p4.building = 3;
        request.path.push(h2);
        request.path.push(h3);
        request.path.push(new Hex(4,2,-6));
        request.path.push(new Hex(5,2,-7));
        request.path.push(new Hex(6,1,-7));
        request.path.push(new Hex(8,1,-9));
        request.path.push(h4);
        request.federationTokenType = 1;
        action = new Action(g, p, request);
        action.FormFederation();

        // use one point in the former one to form another federation
        let request2 = new Request();
        request2.path.push(h1);
        request2.path.push(h2);
        request2.path.push(h3);
        request2.federationTokenType = 2;
        action = new Action(g, p, request2);
        let judge = action.checkFederation();
        expect(judge).to.equal(false);
        expect(action.message).to.equal("this path has some place in another federation");
    })

})
