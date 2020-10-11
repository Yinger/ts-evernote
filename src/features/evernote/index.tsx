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
  const gettNotebooks = (param: NotebooksRequest) => {
    props.onGetNotebooks(param);
  };

  useEffect(
    () => {
      let paramBook: NotebooksRequest = {};
      gettNotebooks(paramBook);
    },
    // eslint-disable-next-line
    [],
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
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Evernote);
