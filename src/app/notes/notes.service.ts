import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { NoteModelDTO } from './note.model.dto';

@Injectable({
    providedIn: 'root'
})
export class NotesService {
    private serviceUrl = '/.netlify/functions/api/notes';
    private readonly cudOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {}

    public getNotes(): Observable<NoteModelDTO[]> {
        console.debug('NotesService::getNotes()');

        return this.http.get<NoteModelDTO[]>(this.serviceUrl).pipe(
            tap(data => console.debug('getNotes(): ' + JSON.stringify(data))),
            catchError(this.handleError<NoteModelDTO[]>(`getNotes`))
        );
    }

    public getNote(noteId: string): Observable<NoteModelDTO> {
        console.debug('NotesService::getNotes()');

        return this.http.get<NoteModelDTO>(`${this.serviceUrl}/${noteId}`).pipe(
            tap(data =>
                console.debug(`getNote(${noteId}): ` + JSON.stringify(data))
            ),
            catchError(this.handleError<NoteModelDTO>(`getNotes`))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
