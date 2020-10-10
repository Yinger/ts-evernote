export interface Note {
  id: number;
  title: string;
  body: string;
  datetime: string;
  bookId: number;
}

export type NoteResponse = Note | undefined;

export interface NoteRequest {
  Id?: number;
}

export type NoteListResponse = Note[] | undefined;

export interface NoteListRequest {
  bookId?: number;
}
