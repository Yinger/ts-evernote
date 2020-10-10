import React from "react";
import { NoteListResponse, NoteInfo } from "../interface/note";
import { Notebook } from "../interface/notebook";
import cx from "classnames";

interface Props {
  handleEditNote(id: number): void;
  // onGetNote(id: number): void;
  noteList: NoteListResponse;
  currentNotebook: Notebook;
  note: NoteInfo;
}

const NoteList = (props: Props) => {
  return (
    <div className="notes-panel">
      <div className="header">
        {props.currentNotebook !== undefined ? props.currentNotebook.name : ""}
      </div>
      <div className="body">
        <ul className="notes-list">
          {props.noteList !== undefined
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
                      <button className="trash button">
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
