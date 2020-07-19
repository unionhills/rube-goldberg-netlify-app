import { Note } from '../../..//models';

describe('This is a simple test of the note model', () => {
    test('Check to see if imports are working', () => {
        const note: Note = new Note();

        note.id = '1';
        expect(note.id).toEqual('1');
    });
});
