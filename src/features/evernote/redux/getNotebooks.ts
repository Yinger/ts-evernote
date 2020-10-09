import { Dispatch } from "redux";
import axios from 'axios';
import {GET_NOTEBOOKS_URL} from '../../../constants/urls'
import {GET_NOTEBOOKS} from '../../../constants/actions'
import {State,Action} from '../interface/types'

export function getNotebooks (param:any){
    return (dispatch: Dispatch) => {
        axios.get(GET_NOTEBOOKS_URL, param).then((res) => {
          // console.log(res.data);
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
        // console.log(action.type);
        return {
          ...state,
          notebooks: action.payload,
        };
  
      default:
        return state;
    }
  }