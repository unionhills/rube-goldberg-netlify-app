import { Note } from '../../models';
import { NoteController } from '../../controllers';

import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';

describe('This is a simple test of the NoteController', () => {
    test('Check NoteController instantiation', () => {
        const noteCtlr: NoteController = new NoteController();

        expect(noteCtlr).toBeDefined();
    });
});
