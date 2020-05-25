import { Request, Response } from 'express';
import { Controller, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Note } from '../models';
import { NoteService } from '../services/note.service';

@Controller('.netlify/functions/api/notes')
export class NoteController {
  constructor(private readonly noteSvc: NoteService = new NoteService()) {}

  @Get()
  private getNotes(req: Request, res: Response): Response {
    const notes: Note[] = this.noteSvc.getNotes();

    return res.json(notes);
  }

  @Get(':id')
  private getNote(req: Request, res: Response): Response {
    Logger.Info(req.params.id);

    const noteId: string = req.params.id;
    const note: Note = this.noteSvc.getNote(noteId);

    return res.status(200).json(note);
  }

  @Post()
  private createNote(req: Request, res: Response): Response {
    Logger.Info(`Request Body = ${req.body}`);

    const note: Note = JSON.parse(req.body);
    const newNote = this.noteSvc.createNote(note);

    return res.status(200).json(newNote);
  }

  @Put(':id')
  private updateNote(req: Request, res: Response): Response {
    Logger.Info(req.params.id);
    Logger.Info(req.body);

    const noteId: string = req.params.id;
    const note: Note = JSON.parse(req.body);
    const updatedNote = this.noteSvc.updateNote(noteId, note);

    return res.status(200).json(updatedNote);
  }

  @Delete(':id')
  private deleteNote(req: Request, res: Response): Response {
    Logger.Info(req.params.id);
    const noteId: string = req.params.id;

    return res.status(200).json({ id: noteId });
  }
}
