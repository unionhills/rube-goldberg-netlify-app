import * as bodyParser from 'body-parser';

import { Application } from 'express';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

import { NoteService } from './services';

import { INote } from './shared';
import {
    IRepository,
    MongoNoteRepository,
    InMemoryNoteRepository
} from './repos';

import { ApiHealthController, NoteController } from './controllers';

export class ApiServer extends Server {
    constructor() {
        super(true);

        this.setupExpress();
        this.setupControllers();
    }

    private getRepository(): NoteService {
        let noteService: NoteService;

        if (process.env.PERSISTENCE_TYPE == 'db') {
            noteService = new NoteService(MongoNoteRepository.getInstance());
        } else {
            noteService = new NoteService(InMemoryNoteRepository.getInstance());
        }

        return noteService;
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private setupControllers(): void {
        const ctlrInstances = [
            new ApiHealthController(),
            new NoteController(this.getRepository())
        ];

        super.addControllers(ctlrInstances);
    }

    public get expressApp(): Application {
        return this.app;
    }
}
