import { reducer as getNotebooksReducer } from "./getNotebooks";
import { reducer as getNoteListReducer } from "./getNoteList";
import { State, Action } from "../interface/types";
import { GET_NOTEBOOKS, GET_NOTELIST } from "../../../constants/actions";

const initialState: State = {
    notebooks: undefined,
    bookId:-1,
    noteList:undefined,
  };

export default function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case GET_NOTEBOOKS:
      return getNotebooksReducer(state, action);
    case GET_NOTELIST:
      return getNoteListReducer(state,action);
    default:
      return { ...state };
  }
}