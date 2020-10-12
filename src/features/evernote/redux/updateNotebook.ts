import { Dispatch } from "redux";
import _ from "lodash";
import { put } from "../../../utils/request";
import { UPDATE_NOTEBOOK_URL } from "../../../constants/urls";
import { UPDATE_NOTEBOOK } from "../../../constants/actions";
import { Action, State } from "../interface/types";
import { Notebook } from "../interface/notebook";

export function updateNotebook(param: Notebook) {
  return (dispatch: Dispatch) => {
    let url = UPDATE_NOTEBOOK_URL + `/${param.id}`;
    put(url, param).then((res) => {
      dispatch({
        type: UPDATE_NOTEBOOK,
        payload: param,
      });
    });
  };
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case UPDATE_NOTEBOOK:
      let updatedList = [...(state.notebooks as Notebook[])];
      let item: Notebook = action.payload;
      let index = _.findIndex(updatedList, {
        id: item.id,
      });
      updatedList[index] = {
        id: item.id,
        name: item.name,
      };
      return {
        ...state,
        notebooks: updatedList,
      };

    default:
      return state;
  }
}
