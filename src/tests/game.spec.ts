import * as Lab from 'lab'

import { expect } from 'code'
const lab = Lab.script()
const { describe, it, before } = lab
export { lab }

describe('experiment', () => {
    before(() => {});

    it('verifies 1 equals 1', () => {
        expect(1).to.equal(1);
    });
});