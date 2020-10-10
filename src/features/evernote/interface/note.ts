export interface NoteInfo {
  id: number;
  title: string;
  body: string;
  datetime: string;
  bookId: number;
}

export type NoteResponse = NoteInfo | undefined;

export interface NoteRequest {
  Id?: number;
}

export type NoteListResponse = NoteInfo[] | undefined;

export interface NoteListRequest {
  bookId?: number;
}
