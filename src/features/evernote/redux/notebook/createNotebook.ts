import { Dispatch } from "redux";
// import _ from "lodash";
import { post } from "../../../../utils/request";
import {
  CREATE_NOTEBOOK_URL,
  CREATE_NOTE_URL,
} from "../../../../constants/urls";
import { CREATE_NOTEBOOK } from "../../../../constants/actions";
import { Action, State } from "../../interface/types";
import { CreateNotebookRequest, Notebook } from "../../interface/notebook";
import { CreateNoteRequest } from "../../interface/note";
import moment from "moment";

export function createNotebook(param: CreateNotebookRequest) {
  return (dispatch: Dispatch) => {
    post(CREATE_NOTEBOOK_URL, param).then((res) => {
      let bookId = res.data.id;
      let paramCreateDefaultNote: CreateNoteRequest = {
        title: "新建笔记",
        body: "",
        datetime: moment().format("DD/MM/YYYY HH:mm:ss"),
        bookId: bookId,
      };
      post(CREATE_NOTE_URL, paramCreateDefaultNote).then((resnote) => {
        dispatch({
          type: CREATE_NOTEBOOK,
          payload: { newBook: res.data, newNote: resnote.data },
        });
      });
    });
  };
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case CREATE_NOTEBOOK:
      let newList = [
        action.payload.newBook,
        ...(state.notebooks as Notebook[]),
      ];
      return {
        ...state,
        notebooks: newList,
        currentNotebook: action.payload.newBook,
        noteList: [action.payload.newNote],
        note: action.payload.newNote,
      };

    default:
      return state;
  }
}
