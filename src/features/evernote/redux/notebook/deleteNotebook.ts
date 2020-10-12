import { Dispatch } from "redux";
import _ from "lodash";
import { get, remove } from "../../../../utils/request";
import {
  DELETE_NOTEBOOK_URL,
  DELETE_NOTE_URL,
  GET_NOTELIST_URL,
} from "../../../../constants/urls";
import { DELETE_NOTEBOOK } from "../../../../constants/actions";
import { Action, State } from "../../interface/types";
import { Notebook } from "../../interface/notebook";
import { NoteListResponse } from "../../interface/note";

export function deleteNotebook(
  id: number,
  defaultId: number,
  isSelf: boolean,
  noteId: number
) {
  return (dispatch: Dispatch) => {
    let url = DELETE_NOTEBOOK_URL + `/${id}`;
    remove(url).then((res) => {
      get(GET_NOTELIST_URL, { bookId: id }).then((resnotelist) => {
        let notelist = resnotelist.data as NoteListResponse;
        if (notelist !== undefined && notelist.length > 0) {
          notelist.forEach((note) => {
            let deleteNoteUrl = DELETE_NOTE_URL + `/${note.id}`;
            remove(deleteNoteUrl);
          });
        }
        get(GET_NOTELIST_URL, { bookId: defaultId }).then((resnotelist) => {
          console.log(resnotelist.data);
          dispatch({
            type: DELETE_NOTEBOOK,
            payload: {
              id: id,
              defaultNoteList: resnotelist.data,
              defaultId: defaultId,
              isSelf: isSelf,
              noteId: noteId,
            },
          });
        });
      });
    });
  };
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case DELETE_NOTEBOOK:
      let reducedList = [...(state.notebooks as Notebook[])];
      _.remove(reducedList, (item: Notebook) => {
        return item.id === action.payload.id;
      });
      let index = _.findIndex(reducedList, {
        id: action.payload.defaultId,
      });

      let note = undefined;
      if (action.payload.isSelf) {
        note =
          action.payload.defaultNoteList.length > 0
            ? action.payload.defaultNoteList[0]
            : undefined;
      } else {
        let noteindex = _.findIndex(action.payload.defaultNoteList, {
          id: action.payload.noteId,
        });
        note = action.payload.defaultNoteList[noteindex];
      }

      return {
        ...state,
        notebooks: reducedList,
        currentNotebook: reducedList[index],
        noteList: action.payload.defaultNoteList,
        note: note,
      };

    default:
      return state;
  }
}
