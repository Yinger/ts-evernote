import React from "react";
import { NoteListResponse, NoteInfo } from "../interface/note";
import { Notebook } from "../interface/notebook";
import cx from "classnames";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Props {
  handleEditNote(id: number): void;
  onNoteDelete(id: number): void;
  // onGetNote(id: number): void;
  noteList: NoteListResponse;
  currentNotebook: Notebook;
  note: NoteInfo;
}

const NoteList = (props: Props) => {
  const MySwal = withReactContent(Swal);
  const handleDeleteNote = (id: number) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        props.onNoteDelete(id);
      }
    });
  };

  return (
    <div className="notes-panel">
      <div className="header">
        {props.currentNotebook !== undefined ? props.currentNotebook.name : ""}
      </div>
      <div className="body">
        <ul className="notes-list">
          {props.noteList !== undefined && props.noteList.length > 0
            ? props.noteList.map((note: NoteInfo, index: number) => (
                <li key={note.id}>
                  <div
                    className={cx("note-brief", {
                      active:
                        props.note !== undefined && props.note.id === note.id,
                    })}
                  >
                    <div
                      className="box"
                      onClick={() => {
                        props.handleEditNote(note.id);
                      }}
                    >
                      <div className="header">{note.title}</div>
                      <div className="body">{note.body}</div>
                    </div>
                    <div className="footer">
                      <div className="datetime">{note.datetime}</div>
                      <button
                        className="trash button"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        <i className="iconfont icon-trash"></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default NoteList;
