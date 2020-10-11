import React from "react";
import { NoteListRequest, CreateNoteRequest } from "../interface/note";
import { Notebook, NotebooksResponse } from "../interface/notebook";
import moment from "moment";

interface Props {
  getNotebook(param: NoteListRequest): void;
  createNote(param: CreateNoteRequest): void;
  notebooks: NotebooksResponse;
  currentNotebook: Notebook;
}

const SideBar = (props: Props) => {
  const handleBookSelect = (bookId: number) => {
    let param: NoteListRequest = { bookId: bookId };
    props.getNotebook(param);
  };

  const handleNoteCreate = () => {
    let param: CreateNoteRequest = {
      title: "新建笔记",
      body: "",
      datetime: moment().format("DD/MM/YYYY HH:mm:ss"),
      bookId: props.currentNotebook.id,
    };
    props.createNote(param);
  };

  return (
    <div className="sidebar">
      <div className="header">
        <button className="button adder" onClick={handleNoteCreate}>
          <i className="iconfont icon-add"></i>
          新建笔记
        </button>
      </div>
      <div className="body">
        <div className="notebooks">
          <div className="header has-icon">
            <i className="iconfont icon-books"></i>
            笔记本
          </div>
          <div className="body">
            <ul className="notebooks-list">
              {props.notebooks !== undefined
                ? props.notebooks.map((notebook: Notebook) => (
                    <li
                      key={notebook.id}
                      className={
                        "notebook-item" +
                        (props.currentNotebook.id === notebook.id
                          ? " active"
                          : "")
                      }
                      onClick={() => handleBookSelect(notebook.id)}
                    >
                      <div className="title has-icon">
                        <i className="iconfont icon-book"></i>
                        {notebook.name}
                      </div>
                      <button className="button trash">
                        <i className="iconfont icon-trash"></i>
                      </button>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
