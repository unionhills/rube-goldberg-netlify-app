import { Request, Response } from 'express';
import { Controller, Get, Put, Post, Delete } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';
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
            Logger.Info('NoteController::getNotes()');

            const notes: INote[] = await this.noteSvc.getNotes();

            return res.status(StatusCodes.OK).json(notes);
        } catch (err) {
            return this.handleError(err, res);
        }
    }

    @Get(':id')
    private async getNote(req: Request, res: Response): Promise<Response> {
        try {
            Logger.Info(`NoteController::getNote()\nRequest Param \"Id\" = ${req.params.id}`);

            const noteId: string = req.params.id;
            const note: INote = await this.noteSvc.getNote(noteId);

            return res.status(StatusCodes.OK).json(note);
        } catch (err) {
            return this.handleError(err, res);
        }
    }

    @Post()
    private async createNote(req: Request, res: Response): Promise<Response> {
        try {
            Logger.Info('NoteController::createNote()\nRequest Body =\n' + JSON.stringify(req.body));

            const note: Note = Note.fromAny(req.body);
            const newNote = await this.noteSvc.createNote(note);

            return res.status(StatusCodes.OK).json(newNote);
        } catch (err) {
            return this.handleError(err, res);
        }
    }

    @Put(':id')
    private async updateNote(req: Request, res: Response): Promise<Response> {
        try {
            Logger.Info(`NoteController::updateNote()\nRequest Param \"Id\" = ${req.params.id}`);
            Logger.Info('Request Body =\n' + JSON.stringify(req.body));

            const noteId: string = req.params.id;
            const note: Note = Note.fromAny(req.body);
            const updatedNote = await this.noteSvc.updateNote(noteId, note);

            return res.status(StatusCodes.OK).json(updatedNote);
        } catch (err) {
            return this.handleError(err, res);
        }
    }

    @Delete(':id')
    private async deleteNote(req: Request, res: Response): Promise<Response> {
        try {
            Logger.Info(`NoteController::deleteNote()\nRequest Param \"Id\" = ${req.params.id}`);

            const noteId: string = req.params.id;
            await this.noteSvc.deleteNote(noteId);

            return res.status(StatusCodes.OK).json({ id: noteId });
        } catch (err) {
            return this.handleError(err, res);
        }
    }

    private handleError(err, res: Response): Response {
        Logger.Err(err, true);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: err.message
        });
    }
}
