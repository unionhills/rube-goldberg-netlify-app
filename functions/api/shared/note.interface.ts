export interface INote {
    getId(): string;
    subject: string;
    body: string;

    correlationId: string;
}