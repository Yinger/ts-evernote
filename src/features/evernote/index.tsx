import React, { useEffect } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import NoteList from "./components/notelist";
import SideBar from "./components/sidebar";
import Note from "./components/note";
import { NotebookRequest, NotebookResponse } from "./interface/notebook";
import { getNotebooks } from "./redux/actions";
import "./index.scss";

interface Props {
  onGetNotebooks(param: NotebookRequest): void;
  notebooks: NotebookResponse;
}

const Evernote = (props: Props) => {
  const getNotebooks = (param: NotebookRequest) => {
    props.onGetNotebooks(param);
  };

  useEffect(() => {
    let param: NotebookRequest = {};
    getNotebooks(param);
  }, []);

  return (
    <div className="app">
      <SideBar notebooks={props.notebooks}></SideBar>
      <NoteList></NoteList>
      <Note></Note>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  notebooks: state.evernote.notebooks,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onGetNotebooks: getNotebooks,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Evernote);
