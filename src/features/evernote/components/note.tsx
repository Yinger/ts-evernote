import React, { useState, useEffect } from "react";
import { NoteInfo } from "../interface/note";
import { Notebook } from "../interface/notebook";
import marked from "marked";
import "github-markdown-css";

interface Props {
  currentNotebook: Notebook;
  note: NoteInfo;
  // getNote(id: number): void;
}
const Note = (props: Props) => {
  console.log(props.note !== undefined ? props.note.title : "");
  const [title, setTitle] = useState(
    props.note !== undefined ? props.note.title : ""
  );

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  // const getNote = (id: number) => {
  //   props.getNote(id);
  // };

  useEffect(
    () => {
      // getNote(-1);
      setTitle(props.note !== undefined ? props.note.title : "");
    },
    // eslint-disable-next-line
    []
  );
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
            // value={title}
            name="title"
            onChange={handleTitleChange}
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
