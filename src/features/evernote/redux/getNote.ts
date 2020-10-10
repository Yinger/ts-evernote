import { Dispatch } from "redux";
import _ from "lodash";
import { get } from "../../../utils/request";
import { GET_NOTEBOOKS_URL, GET_NOTELIST_URL } from "../../../constants/urls";
import { GET_NOTE } from "../../../constants/actions";
import { State, Action } from "../interface/types";
import { NoteInfo } from "../interface/note";
import { Notebook } from "../interface/notebook";

export function getNote(id: number) {
  return (dispatch: Dispatch) => {
    if (id === -1) {
      get(GET_NOTEBOOKS_URL, {}).then((res) => {
        let notebooks = res.data as Notebook[] | undefined;
        if (notebooks !== undefined) {
          get(GET_NOTELIST_URL, { bookId: notebooks[0].id }).then((ress) => {
            let noteList = ress.data as NoteInfo[] | undefined;
            if (noteList !== undefined) id = noteList[0].id;
            dispatch({
              type: GET_NOTE,
              payload: { id: id, notebooks: notebooks, noteList: noteList },
            });
          });
        }
      });
    }
    // else {
    dispatch({
      type: GET_NOTE,
      payload: { id: id },
    });
    // }
  };
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case GET_NOTE:
      let noteInfo = undefined;
      let noteList = undefined;
      if (action.payload.id !== -1) {
        if (state.noteList !== undefined) {
          noteList = [...(state.noteList as NoteInfo[])];
        } else noteList = action.payload.noteList as NoteInfo[] | undefined;

        if (noteList !== undefined) {
          let id = action.payload.id;
          let index = -1;
          // if (
          //   action.payload === -1 &&
          //   noteList !== undefined &&
          //   noteList.length > 0
          // ) {
          //   id = noteList[0].id;
          // }

          index = _.findIndex(noteList, {
            id: id,
          });
          if (index !== -1) {
            noteInfo = noteList[index];
          }
        }
      }
      // if (action.payload)
      //   if (state.noteList !== undefined) {
      //     noteList = [...(state.noteList as NoteInfo[])];
      //     let id = action.payload;
      //     let index = -1;
      //     if (
      //       action.payload === -1 &&
      //       noteList !== undefined &&
      //       noteList.length > 0
      //     ) {
      //       id = noteList[0].id;
      //     }

      //     index = _.findIndex(noteList, {
      //       id: id,
      //     });
      //     if (index !== -1) {
      //       noteInfo = noteList[index];
      //     }
      //   }
      return {
        ...state,
        note: noteInfo,
      };

    default:
      return state;
  }
}
