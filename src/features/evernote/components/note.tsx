import React from "react";
import { NoteInfo } from "../interface/note";
import { Notebook } from "../interface/notebook";
import marked from "marked";
import "github-markdown-css";

interface Props {
  currentNotebook: Notebook;
  note: NoteInfo;
}
const Note = (props: Props) => {
  return (
    <div className="note-panel">
      <div className="header">
        <div className="category has-icon">
          <i className="iconfont icon-notebook"></i>
          {props.currentNotebook !== undefined
            ? props.currentNotebook.name
            : ""}
        </div>
        <div className="title">
          <input
            type="text"
            value={props.note !== undefined ? props.note.title : ""}
            name="title"
          />
        </div>
      </div>
      <div className="body">
        <div className="editor">
          <textarea
            name="body"
            value={props.note !== undefined ? props.note.body : ""}
          ></textarea>
        </div>
        <div className="preview markdown-body">
          <div
            dangerouslySetInnerHTML={{
              __html: marked(props.note !== undefined ? props.note.body : ""),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Note;
