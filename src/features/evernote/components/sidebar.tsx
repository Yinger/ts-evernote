import React, { useState } from "react";
import { NoteListRequest, NoteResponse } from "../interface/note";
import {
  CreateNotebookRequest,
  Notebook,
  NotebooksResponse,
} from "../interface/notebook";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Props {
  getNotebook(param: NoteListRequest): void;
  createNotebook(param: CreateNotebookRequest): void;
  deleteNotebook(
    id: number,
    defaultId: number,
    isSelf: boolean,
    noteId: number
  ): void;
  notebooks: NotebooksResponse;
  currentNotebook: Notebook;
  note: NoteResponse;
}

const SideBar = (props: Props) => {
  const [isOnRemoving, setIsOnRemoving] = useState(false);
  const MySwal = withReactContent(Swal);

  const handleBookSelect = (bookId: number) => {
    // console.log("select: " + bookId);
    if (!isOnRemoving) {
      let param: NoteListRequest = { bookId: bookId };
      props.getNotebook(param);
    }
  };

  const handleNotebookCreate = () => {
    let param: CreateNotebookRequest = {
      name: "新建笔记本",
    };
    props.createNotebook(param);
  };

  const handleDeleteNotebook = (id: number) => {
    let defaultId = -1;
    let isSelf = false;
    let noteId = props.note !== undefined ? props.note.id : -1;
    setIsOnRemoving(true);
    if (props.currentNotebook !== undefined)
      defaultId = props.currentNotebook.id;
    if (id === defaultId) {
      isSelf = true;
      noteId = -1;
      if (props.notebooks !== undefined) {
        if (props.notebooks[0].id !== id) defaultId = props.notebooks[0].id;
        else defaultId = props.notebooks[1].id;
      }
    }

    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteNotebook(id, defaultId, isSelf, noteId);
        if (!isSelf) {
          handleBookSelect(defaultId);
        }
      }
      setIsOnRemoving(false);
    });
  };

  return (
    <div className="sidebar">
      <div className="header">
        <button className="button adder" onClick={handleNotebookCreate}>
          <i className="iconfont icon-add"></i>
          新建笔记本
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
                      {notebook.name !== "默认笔记本" ? (
                        <button
                          className="button trash"
                          onClick={(e) => handleDeleteNotebook(notebook.id)}
                        >
                          <i className="iconfont icon-trash"></i>
                        </button>
                      ) : (
                        ""
                      )}
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
