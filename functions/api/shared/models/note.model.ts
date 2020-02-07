/**
 * This class represents the concept of a Message in
 * our application.  A Message simply contains a
 * packet of data to be transported.
 *
 * @author Union Hills Software
 * @date   February 5, 2020
 *
 */

export class Note {
  id: string;

  subject: string;
  body: string;

  correlationId: string;
  trace: [];
  createdAt: Date;
  updatedAt: Date;
}
