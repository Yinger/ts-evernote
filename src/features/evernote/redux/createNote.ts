import { Dispatch } from "redux";
// import _ from "lodash";
import { CreateNoteRequest, NoteInfo } from "../interface/note";
import { post } from "../../../utils/request";
import { CREATE_NOTE_URL } from "../../../constants/urls";
import { CREATE_NOTE } from "../../../constants/actions";
import { Action, State } from "../interface/types";

export function createNote(param: CreateNoteRequest) {
  return (dispatch: Dispatch) => {
    post(CREATE_NOTE_URL, param).then((res) => {
      // console.log(res);
      dispatch({
        type: CREATE_NOTE,
        payload: res.data,
      });
    });
  };
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case CREATE_NOTE:
      let newList = [action.payload, ...(state.noteList as NoteInfo[])];
      return {
        ...state,
        noteList: newList,
        note: action.payload,
      };

    default:
      return state;
  }
}
