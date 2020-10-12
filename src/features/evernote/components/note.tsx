import React, { useState, useEffect } from "react";
import { NoteInfo, UpdateNoteRequest } from "../interface/note";
import { Notebook } from "../interface/notebook";
import marked from "marked";
import "github-markdown-css";
import moment from "moment";

interface Props {
  currentNotebook: Notebook;
  note: NoteInfo;
  onChangeSave(param: UpdateNoteRequest): void;
}
const Note = (props: Props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    let newnote = props.note;
    newnote.title = e.currentTarget.value;
    newnote.datetime = moment().format("DD/MM/YYYY HH:mm:ss");
    props.onChangeSave(newnote);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.currentTarget.value);
    let newnote = props.note;
    newnote.body = e.currentTarget.value;
    newnote.datetime = moment().format("DD/MM/YYYY HH:mm:ss");
    props.onChangeSave(newnote);
  };

  useEffect(() => {
    setTitle(props.note !== undefined ? props.note.title : "");
    setBody(props.note !== undefined ? props.note.body : "");
  }, [props.note]);

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
            value={title !== undefined ? title : ""}
            name="title"
            onChange={handleTitleChange}
            readOnly={props.note === undefined ? true : false}
          />
        </div>
      </div>
      <div className="body">
        <div className="editor">
          <textarea
            name="body"
            value={body !== undefined ? body : ""}
            onChange={handleBodyChange}
            readOnly={props.note === undefined ? true : false}
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
