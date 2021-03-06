import React, { useState, useEffect } from "react";
import {
  NoteListResponse,
  NoteInfo,
  CreateNoteRequest,
  NoteResponse,
} from "../interface/note";
import { Notebook } from "../interface/notebook";
import cx from "classnames";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment";

interface Props {
  handleEditNote(id: number): void;
  onNoteDelete(id: number): void;
  onNotebookEdit(param: Notebook): void;
  createNote(param: CreateNoteRequest): void;
  // onGetNote(id: number): void;
  noteList: NoteListResponse;
  currentNotebook: Notebook;
  note: NoteInfo;
}

const NoteList = (props: Props) => {
  const [bookName, setBookName] = useState("");
  const [notelist, setNotelist] = useState<NoteInfo[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteResponse>(undefined);
  // const [notelist] = useState<NoteInfo[]>([]);
  const MySwal = withReactContent(Swal);
  const handleNotebookNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setBookName(e.currentTarget.value);
    let notebook = props.currentNotebook;
    notebook.name = e.currentTarget.value;
    props.onNotebookEdit(notebook);
  };

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

  const handleNoteCreate = () => {
    let param: CreateNoteRequest = {
      title: "新建笔记",
      body: "",
      datetime: moment().format("YYYY/MM/DD HH:mm:ss"),
      bookId: props.currentNotebook.id,
    };
    props.createNote(param);
  };

  useEffect(() => {
    setBookName(
      props.currentNotebook !== undefined ? props.currentNotebook.name : ""
    );
    setNotelist(props.noteList !== undefined ? props.noteList : []);
    setSelectedNote(props.note);
  }, [props.currentNotebook, props.noteList, props.note]);

  return (
    <div className="notes-panel">
      <div className="header">
        <div className="note-adder">
          <button className="button adder" onClick={handleNoteCreate}>
            <i className="iconfont icon-add"></i>
            新建笔记
          </button>
        </div>

        <input
          type="text"
          value={bookName !== undefined ? bookName : ""}
          name="bookName"
          readOnly={
            bookName !== undefined && bookName === "默认笔记本" ? true : false
          }
          onChange={handleNotebookNameChange}
        />

        {/* {props.currentNotebook !== undefined ? props.currentNotebook.name : ""} */}
      </div>
      <div className="body">
        <ul className="notes-list">
          {notelist !== undefined && notelist.length > 0
            ? notelist.map((note: NoteInfo, index: number) => (
                <li key={note.id}>
                  <div
                    className={cx("note-brief", {
                      active:
                        selectedNote !== undefined &&
                        selectedNote.id === note.id,
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
