import { Dispatch } from "redux";
import _ from "lodash";
import { NoteInfo, UpdateNoteRequest } from "../interface/note";
import { put } from "../../../utils/request";
import { UPDATE_NOTE_URL } from "../../../constants/urls";
import { UPDATE_NOTE } from "../../../constants/actions";
import { Action, State } from "../interface/types";

export function updateNote(param: UpdateNoteRequest) {
  return (dispatch: Dispatch) => {
    let url = UPDATE_NOTE_URL + `/${param.id}`;
    put(url, param).then((res) => {
      dispatch({
        type: UPDATE_NOTE,
        payload: param,
      });
    });
  };
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case UPDATE_NOTE:
      let updatedList = [...(state.noteList as NoteInfo[])];
      let item: UpdateNoteRequest = action.payload;
      let index = _.findIndex(updatedList, {
        id: item.id,
      });
      updatedList[index] = {
        id: item.id,
        title: item.title,
        body: item.body,
        datetime: item.datetime,
        bookId: item.bookId,
      };
      return {
        ...state,
        noteList: updatedList,
        note: item,
      };

    default:
      return state;
  }
}
