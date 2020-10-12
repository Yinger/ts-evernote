import { Notebook, NotebooksResponse } from "./notebook";
import { NoteInfo, NoteListResponse } from "./note";

export type Action = {
  type: string;
  payload: any;
};

export type State = Readonly<{
  notebooks: NotebooksResponse;
  noteList: NoteListResponse;
  currentNotebook: Notebook | undefined;
  note: NoteInfo | undefined;
}>;
