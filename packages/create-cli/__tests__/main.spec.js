import {cli} from '../src/main';

global.console = jest.fn();

describe('create-cli', () => {
    it('test', () => {
        expect(cli).toBeTruthy();
    })
});
