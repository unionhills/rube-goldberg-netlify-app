import { Request, Response } from 'express';
import { Controller, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Note } from '../shared/models';
import { NoteService } from '../services/note.service';

@Controller('.netlify/functions/api/notes')
export class NoteController {
  constructor(private readonly noteSvc: NoteService = new NoteService()) {}

  @Get()
  private getNotes(req: Request, res: Response) {
    const notes: Note[] = this.noteSvc.getNotes();

    return res.json(notes);
  }

  @Get(':id')
  private getNote(req: Request, res: Response) {
    Logger.Info(req.params.id);
    const notes: Note[] = this.noteSvc.getNotes();

    return res.json(notes);
  }

  @Post()
  private createNote(req: Request, res: Response) {
    Logger.Info(req.body);
    const note: Note = req.body;
    const newNote = this.noteSvc.createNote(note);

    return res.status(200).json(newNote);
  }

  @Put(':id')
  private updateNote(req: Request, res: Response) {
    Logger.Info(req.params.id);
    Logger.Info(req.body);
    const note: Note = req.body;

    return res.status(200);
  }

  @Delete(':id')
  private deleteNote(req: Request, res: Response) {
    Logger.Info(req.params.id);

    return res.status(200);
  }
}
