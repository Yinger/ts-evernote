import { Dispatch } from "redux";
import _ from "lodash";
import { NoteInfo } from "../interface/note";
import { remove } from "../../../utils/request";
import { DELETE_NOTE_URL } from "../../../constants/urls";
import { DELETE_NOTE } from "../../../constants/actions";
import { Action, State } from "../interface/types";

export function deleteNote(id: number) {
  return (dispatch: Dispatch) => {
    let url = DELETE_NOTE_URL + `/${id}`;
    remove(url).then((res) => {
      dispatch({
        type: DELETE_NOTE,
        payload: id,
      });
    });
  };
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case DELETE_NOTE:
      let reducedList = [...(state.noteList as NoteInfo[])];
      _.remove(reducedList, (item: NoteInfo) => {
        return item.id === action.payload;
      });
      return {
        ...state,
        noteList: reducedList,
        note: reducedList.length > 0 ? reducedList[0] : undefined,
      };

    default:
      return state;
  }
}
