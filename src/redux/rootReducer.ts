import { combineReducers } from "redux";
import evernote from "../features/evernote/redux/reducer";

const reducers = {
    evernote,
};

export default combineReducers(reducers);