import { Note } from '../../shared/models';
import { NoteController } from '../../controllers';

//import { Request } from 'jest-express/lib/request';

describe("This is a test of the NoteController", () => {
  test("Check NoteController instantiation", () => {
    const noteCtlr: NoteController = new NoteController();

    expect(noteCtlr).toBeDefined();
  });
});
