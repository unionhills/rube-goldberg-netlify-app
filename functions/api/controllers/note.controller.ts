import { Request, Response } from 'express';
import { Controller, Get, Put, Post, Delete } from '@overnightjs/core';
import { OK, BAD_REQUEST } from 'http-status-codes';
import { Logger } from '@overnightjs/logger';
import { Note } from '../models';
import { INote } from '../shared';
import { NoteService } from '../services';
import { MongoNoteRepository, InMemoryNoteRepository } from '../repos';

@Controller('.netlify/functions/api/notes')
export class NoteController {
    constructor(
        private readonly noteSvc: NoteService = new NoteService(
            InMemoryNoteRepository.getInstance()
        )
    ) {}

    @Get()
    private async getNotes(req: Request, res: Response): Promise<Response> {
        try {
            const notes: INote[] = await this.noteSvc.getNotes();

            return res.json(notes);
        } catch (err) {
            return this.handleError(err, res);
        }
    }

    @Get(':id')
    private async getNote(req: Request, res: Response): Promise<Response> {
        try {
            Logger.Info(req.params.id);

            const noteId: string = req.params.id;
            const note: INote = await this.noteSvc.getNote(noteId);

            return res.status(200).json(note);
        } catch (err) {
            return this.handleError(err, res);
        }
    }

    @Post()
    private async createNote(req: Request, res: Response): Promise<Response> {
        Logger.Info(`Request Body =\n` + JSON.stringify(req.body));

        const note: Note = Note.fromAny(req.body);
        const newNote = await this.noteSvc.createNote(note);

        return res.status(200).json(newNote);
    }

    @Put(':id')
    private async updateNote(req: Request, res: Response): Promise<Response> {
        Logger.Info(req.params.id);
        Logger.Info(req.body);

        const noteId: string = req.params.id;
        const note: Note = Note.fromAny(req.body);
        const updatedNote = await this.noteSvc.updateNote(noteId, note);

        return res.status(200).json(updatedNote);
    }

    @Delete(':id')
    private async deleteNote(req: Request, res: Response): Promise<Response> {
        Logger.Info(req.params.id);
        const noteId: string = req.params.id;
        await this.noteSvc.deleteNote(noteId);

        return res.status(200).json({ id: noteId });
    }

    private handleError(err, res: Response): Response {
        Logger.Err(err, true);
        return res.status(BAD_REQUEST).json({
            error: err.message
        });
    }
}
