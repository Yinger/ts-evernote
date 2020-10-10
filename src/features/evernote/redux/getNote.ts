import { Dispatch } from "redux";
import _ from "lodash";
import { GET_NOTE } from "../../../constants/actions";
import { State, Action } from "../interface/types";
import { NoteInfo } from "../interface/note";

export function getNote(id: number) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: GET_NOTE,
      payload: id,
    });
  };
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case GET_NOTE:
      let noteInfo = undefined;
      let noteList = undefined;
      if (state.noteList !== undefined) {
        noteList = [...(state.noteList as NoteInfo[])];
        let id = action.payload;
        let index = -1;
        if (
          action.payload === -1 &&
          noteList !== undefined &&
          noteList.length > 0
        ) {
          id = noteList[0].id;
        }

        index = _.findIndex(noteList, {
          id: id,
        });
        if (index !== -1) {
          noteInfo = noteList[index];
        }
      }
      return {
        ...state,
        note: noteInfo,
      };

    default:
      return state;
  }
}
