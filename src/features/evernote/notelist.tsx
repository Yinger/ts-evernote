import React from "react";
import "../App.scss";

const NoteList = () => {
  return (
    <div className="notes-panel">
      <div className="header">{"currentNotebookName"}</div>
      <div className="body">
        <ul className="notes-list">
          {
            <li key={"note.id"}>
              <div className={"note-brief"}>
                <div className="box">
                  <div className="header">{"note.title"}</div>
                  <div className="body">{"note.body"}</div>
                </div>
                <div className="footer">
                  <div className="datetime">{"note.datetime"}</div>
                  <button className="trash button">
                    <i className="iconfont icon-trash"></i>
                  </button>
                </div>
              </div>
            </li>
          }
        </ul>
      </div>
    </div>
  );
};

export default NoteList;
