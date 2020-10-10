import React, { useEffect } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import NoteList from "./components/notelist";
import SideBar from "./components/sidebar";
import Note from "./components/note";
import {
  NotebooksRequest,
  NotebooksResponse,
  Notebook,
} from "./interface/notebook";
import { getNotebooks, getNoteList } from "./redux/actions";
import "./index.scss";
import {
  NoteListResponse,
  // NoteResponse,
  NoteListRequest,
} from "./interface/note";

interface Props {
  onGetNotebooks(param: NotebooksRequest): void;
  onGetNoteList(param: NoteListRequest): void;
  notebooks: NotebooksResponse;
  currentNotebook: Notebook;
  bookId: number;
  noteList: NoteListResponse;
}

const Evernote = (props: Props) => {
  const getNotebooks = (param: NotebooksRequest) => {
    props.onGetNotebooks(param);
  };

  const getNoteList = (param: NoteListRequest) => {
    props.onGetNoteList(param);
  };

  useEffect(
    () => {
      let param: NotebooksRequest = {};
      let param2: NoteListRequest = { bookId: props.bookId };
      getNotebooks(param);
      getNoteList(param2);
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="app">
      <SideBar
        notebooks={props.notebooks}
        currentNotebook={props.currentNotebook}
        getNotebook={props.onGetNoteList}
      ></SideBar>
      <NoteList
        noteList={props.noteList}
        currentNotebook={props.currentNotebook}
      ></NoteList>
      <Note></Note>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  notebooks: state.evernote.notebooks,
  currentNotebook: state.evernote.currentNotebook,
  bookId: state.evernote.bookId,
  noteList: state.evernote.noteList,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onGetNotebooks: getNotebooks,
      onGetNoteList: getNoteList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Evernote);
