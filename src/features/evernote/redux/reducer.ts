import { reducer as getNotebooksReducer } from "./notebook/getNotebooks";
import { reducer as getNoteListReducer } from "./note/getNoteList";
import { reducer as getNoteReducer } from "./note/getNote";
import { reducer as updateNoteReducer } from "./note/updateNote";
import { reducer as createNoteReducer } from "./note/createNote";
import { reducer as deleteNoteReducer } from "./note/deleteNote";
import { reducer as updateNotebookReducer } from "./notebook/updateNotebook";
import { reducer as createNotebookReducer } from "./notebook/createNotebook";
import { State, Action } from "../interface/types";
import {
  GET_NOTEBOOKS,
  GET_NOTELIST,
  GET_NOTE,
  UPDATE_NOTE,
  CREATE_NOTE,
  DELETE_NOTE,
  UPDATE_NOTEBOOK,
  CREATE_NOTEBOOK,
} from "../../../constants/actions";

const initialState: State = {
  notebooks: undefined,
  noteList: undefined,
};

export default function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case GET_NOTEBOOKS:
      return getNotebooksReducer(state, action);
    case GET_NOTELIST:
      return getNoteListReducer(state, action);
    case GET_NOTE:
      return getNoteReducer(state, action);
    case UPDATE_NOTE:
      return updateNoteReducer(state, action);
    case CREATE_NOTE:
      return createNoteReducer(state, action);
    case DELETE_NOTE:
      return deleteNoteReducer(state, action);
    case UPDATE_NOTEBOOK:
      return updateNotebookReducer(state, action);
    case CREATE_NOTEBOOK:
      return createNotebookReducer(state, action);
    default:
      return { ...state };
  }
}
