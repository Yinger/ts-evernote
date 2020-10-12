import { Dispatch } from "redux";
import _ from "lodash";
import { get } from "../../../../utils/request";
import { GET_NOTELIST_URL } from "../../../../constants/urls";
import { GET_NOTELIST } from "../../../../constants/actions";
import { State, Action } from "../../interface/types";
import { Notebook } from "../../interface/notebook";
import { NoteListResponse } from "../../interface/note";

export function getNoteList(param: any) {
  return (dispatch: Dispatch) => {
    get(GET_NOTELIST_URL, param).then((res) => {
      dispatch({
        type: GET_NOTELIST,
        payload: { noteList: res.data, bookId: param.bookId },
      });
    });
  };
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case GET_NOTELIST:
      let noteList = action.payload.noteList as NoteListResponse;
      let newCurrentNotebook = undefined;
      let oldBookList = [...(state.notebooks as Notebook[])];
      let index = _.findIndex(oldBookList, {
        id: action.payload.bookId,
      });
      if (index !== -1) newCurrentNotebook = oldBookList[index];
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
