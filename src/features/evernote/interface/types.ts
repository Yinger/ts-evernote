import { NotebooksResponse } from "./notebook";
import { NoteListResponse } from "./note";

export type Action = {
  type: string;
  payload: any;
};

export type State = Readonly<{
  notebooks: NotebooksResponse;
  noteList: NoteListResponse;
}>;
