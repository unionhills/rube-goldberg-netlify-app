import { Note } from '../../..//models';

/**
 * Tests Note class
 * 
 * @group unit/classes/Note
 * 
 */

describe('This is a simple test of the note model', () => {
    test('Check to see if imports are working', () => {
        const note: Note = new Note();

        note.id = '1';
        expect(note.id).toEqual('1');
    });
});
