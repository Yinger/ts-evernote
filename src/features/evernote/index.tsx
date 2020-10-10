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
import { getNote, getNotebooks, getNoteList } from "./redux/actions";
import "./index.scss";
import { NoteListResponse, NoteListRequest, NoteInfo } from "./interface/note";

interface Props {
  onGetNotebooks(param: NotebooksRequest): void;
  onGetNoteList(param: NoteListRequest): void;
  onGetNote(id: number): void;
  notebooks: NotebooksResponse;
  currentNotebook: Notebook;
  noteList: NoteListResponse;
  note: NoteInfo;
}

const Evernote = (props: Props) => {
  const getNotebooks = (param: NotebooksRequest) => {
    props.onGetNotebooks(param);
  };

  const getNoteList = (param: NoteListRequest) => {
    props.onGetNoteList(param);
  };

  const getNote = (id: number) => {
    props.onGetNote(id);
  };

  useEffect(
    () => {
      let paramBook: NotebooksRequest = {};
      let paramNoteList: NoteListRequest = { bookId: -1 };
      getNotebooks(paramBook);
      getNoteList(paramNoteList);
      getNote(-1);
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
      />
      <NoteList
        noteList={props.noteList}
        currentNotebook={props.currentNotebook}
        note={props.note}
        handleEditNote={props.onGetNote}
      />
      <Note currentNotebook={props.currentNotebook} note={props.note} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  notebooks: state.evernote.notebooks,
  currentNotebook: state.evernote.currentNotebook,
  noteList: state.evernote.noteList,
  note: state.evernote.note,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onGetNotebooks: getNotebooks,
      onGetNoteList: getNoteList,
      onGetNote: getNote,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Evernote);
