import { Dispatch } from "redux";
import { get } from "../../../utils/request";
import { GET_NOTEBOOKS_URL } from "../../../constants/urls";
import { GET_NOTEBOOKS } from "../../../constants/actions";
import { State, Action } from "../interface/types";
import { Notebook } from "../interface/notebook";

export function getNotebooks(param: any) {
  return (dispatch: Dispatch) => {
    get(GET_NOTEBOOKS_URL, param).then((res) => {
      dispatch({
        type: GET_NOTEBOOKS,
        payload: res.data,
      });
    });
  };
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case GET_NOTEBOOKS:
      let notebooks = action.payload as Notebook[] | undefined;
      var bookId = -1;
      if (notebooks !== undefined) {
        bookId = notebooks[0].id;
      }

      return {
        ...state,
        notebooks: notebooks,
        bookId: bookId,
        currentNotebook: bookId === -1 ? undefined : action.payload[0],
      };

    default:
      return state;
  }
}
