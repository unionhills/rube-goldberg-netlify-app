import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Utils } from '../shared';
import { NoteModelDTO } from './note.model.dto';
import { NotesService } from './notes.service';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
    notes: NoteModelDTO[];

    constructor(private notesService: NotesService) {
        // this.createSampleData();
    }

    ngOnInit(): void {
        this.refresh();
    }

    public refresh() {
        this.notesService.getNotes().subscribe(
            (notes: NoteModelDTO[]) => {
                this.notes = notes;
            },
            (error: any) => console.error(error),
            () => {}
        );
    }

    private createSampleNote(id?: string): NoteModelDTO {
        const newNote:NoteModelDTO = new NoteModelDTO();
        let context:string = "";

        if (id) {
            newNote._id = id;
            context = id;
        }
        else {
            context = Utils.uuidv4();
        }

        newNote.subject = `Subject ${context}`;
        newNote.body = `This is the body for note ${context}`;
        newNote.correlationId = `${context}`;
        newNote.trace = [`Note ${context} created`];

        return newNote;
    }

    private createSampleData() {
        this.notes = new Array<NoteModelDTO>();

        for (let i: number = 0; i < 10; i++) {
            const id = (i + 1).toString();
            const newNote: NoteModelDTO = this.createSampleNote(id);

            newNote.createdAt = new Date();
            this.notes.push(newNote);
        }
    }

    public printTrace(trace: string[]): string {
        return JSON.stringify(trace);
    }

    public _onNewNote() {
        const newNote: NoteModelDTO = this.createSampleNote();

        console.debug(
            'NotesComponent::onNewNote(): ' + JSON.stringify(newNote)
        );
    }

    public onNewNote() {
        const newNote: NoteModelDTO = this.createSampleNote();

        //      newNote._id = Utils.uuidv4();
        //      newNote.createdAt = new Date();
        //      this.notes.push(newNote);

        console.debug(
            'NotesComponent::onNewNote(): Posting new note to API:\n' + JSON.stringify(newNote)
        );

        this.notesService.createNote(newNote).subscribe(
            (note: NoteModelDTO) => {
                console.debug(
                    'NotesComponent::onNewNote():\n' + JSON.stringify(note)
                );
                this.refresh();
            },
            (error: any) => console.log(error),
            () => {}
        );
    }
}
