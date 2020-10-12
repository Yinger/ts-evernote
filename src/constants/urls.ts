export const GET_NOTEBOOKS_URL = "api/evernote/notebooks";
export const GET_NOTELIST_URL = "api/evernote/notes";

//TODO:http-proxy-middleware not work when post&put
const targetUrl = "http://localhost:3030/";
export const UPDATE_NOTE_URL = targetUrl + "notes";
export const CREATE_NOTE_URL = targetUrl + "notes";
export const DELETE_NOTE_URL = targetUrl + "notes";

export const UPDATE_NOTEBOOK_URL = targetUrl + "notebooks";
export const CREATE_NOTEBOOK_URL = targetUrl + "notebooks";
export const DELETE_NOTEBOOK_URL = targetUrl + "notebooks";
