import { Dispatch } from "redux";
import _ from "lodash";
import { get } from "../../../utils/request";
import { GET_NOTELIST_URL, GET_NOTEBOOKS_URL } from "../../../constants/urls";
import { GET_NOTELIST } from "../../../constants/actions";
import { State, Action } from "../interface/types";
import { Notebook, NotebooksRequest } from "../interface/notebook";
import { NoteListResponse } from "../interface/note";

export function getNoteList(param: any) {
  return (dispatch: Dispatch) => {
    if (param.bookId !== -1) {
      get(GET_NOTELIST_URL, param).then((res) => {
        dispatch({
          type: GET_NOTELIST,
          payload: res.data,
        });
      });
    } else {
      let paramNotebook: NotebooksRequest = {};
      get(GET_NOTEBOOKS_URL, paramNotebook).then((resbook) => {
        if (resbook.data) {
          param.bookId = (resbook.data as Notebook[])[0].id;
          get(GET_NOTELIST_URL, param).then((res) => {
            dispatch({
              type: GET_NOTELIST,
              payload: res.data,
            });
          });
        }
      });
    }
  };
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case GET_NOTELIST:
      let noteList = action.payload as NoteListResponse;
      let newCurrentNotebook = undefined;
      if (noteList !== undefined) {
        if (noteList.length > 0) {
          let oldBookList = [...(state.notebooks as Notebook[])];
          let index = _.findIndex(oldBookList, {
            id: noteList[0].bookId,
          });
          if (index !== -1) newCurrentNotebook = oldBookList[index];
        }
      }
      return {
        ...state,
        noteList: noteList,
        currentNotebook: newCurrentNotebook,
        note:
          noteList !== undefined && noteList.length > 0
            ? noteList[0]
            : undefined,
      };

    default:
      return state;
  }
}
