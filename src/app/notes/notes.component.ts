import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NoteModelDTO } from './note.model.dto';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
    notes: NoteModelDTO[];

    constructor() {
        this.createSampleData();
    }

    ngOnInit(): void {
        this.refresh();
    }

    public refresh() {}

    private createSampleData() {
        this.notes = new Array<NoteModelDTO>();

        for (let i: number = 0; i < 10; i++) {
            const newNote = new NoteModelDTO();
            const id = (i + 1).toString();

            newNote._id = id;
            newNote.subject = `Subject ${id}`;
            newNote.body = `This is the body for note ${id}`;
            newNote.correlationId = `Correlation Id ${id}`;
            newNote.trace = [`Note ${id} created`];
            newNote.createdAt = new Date();

            this.notes.push(newNote);
        }
    }

    public printTrace(trace: string[]): string {
      return JSON.stringify(trace);
    }
}
