import React from "react";
import "../App.scss";

const Note = () => {
  return (
    <div className="note-panel">
      <div className="header">
        <div className="category has-icon">
          <i className="iconfont icon-notebook"></i>
          {"currentNotebookName"}
        </div>
        <div className="title">
          <input type="text" value={"title"} name="title" />
        </div>
      </div>
      <div className="body">
        <div className="editor">
          <textarea name="body" value={"body"}></textarea>
        </div>
        <div className="preview markdown-body"></div>
      </div>
    </div>
  );
};

export default Note;
