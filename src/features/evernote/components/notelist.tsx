import React from "react";
import { NoteListResponse, Note } from "../interface/note";
import { Notebook } from "../interface/notebook";

interface Props {
  noteList: NoteListResponse;
  currentNotebook: Notebook;
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
            ? props.noteList.map((note: Note, index: number) => (
                <li key={note.id}>
                  <div className={"note-brief"}>
                    <div className="box">
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
