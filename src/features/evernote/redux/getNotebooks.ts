import { Dispatch } from "redux";
import { get } from "../../../utils/request";
import { GET_NOTEBOOKS_URL, GET_NOTELIST_URL } from "../../../constants/urls";
import { GET_NOTEBOOKS } from "../../../constants/actions";
import { State, Action } from "../interface/types";
import { Notebook } from "../interface/notebook";
import { NoteInfo, NoteListRequest } from "../interface/note";

export function getNotebooks(param: any) {
  return (dispatch: Dispatch) => {
    get(GET_NOTEBOOKS_URL, param).then((res) => {
      let notebooks = res.data as Notebook[] | undefined;

      if (notebooks !== undefined && notebooks.length > 0) {
        let noooteList = undefined;
        let paramNoteList: NoteListRequest = { bookId: notebooks[0].id };
        get(GET_NOTELIST_URL, paramNoteList).then((ress) => {
          noooteList = ress.data;
          dispatch({
            type: GET_NOTEBOOKS,
            payload: { notebooks: res.data, noteList: noooteList },
          });
        });
      } else {
        dispatch({
          type: GET_NOTEBOOKS,
          payload: { notebooks: res.data, noteList: undefined },
        });
      }
    });
  };
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case GET_NOTEBOOKS:
      let notebooks = action.payload.notebooks as Notebook[] | undefined;
      let noooteList = action.payload.noteList as NoteInfo[] | undefined;
      // let bookId = -1;
      // if (notebooks !== undefined) {
      //   bookId = notebooks[0].id;
      // }

      return {
        ...state,
        notebooks: notebooks,
        // bookId: bookId,
        currentNotebook: notebooks !== undefined ? notebooks[0] : undefined,
        noteList: noooteList,
        note: noooteList !== undefined ? noooteList[0] : undefined,
      };

    default:
      return state;
  }
}
