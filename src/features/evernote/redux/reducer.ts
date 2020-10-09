import { reducer as getNotebooksReducer } from "./getNotebooks";
import { State, Action } from "../interface/types";
import { GET_NOTEBOOKS } from "../../../constants/actions";

const initialState: State = {
    notebooks: undefined,
  };

export default function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case GET_NOTEBOOKS:
      return getNotebooksReducer(state, action);
    default:
      return { ...state };
  }
}