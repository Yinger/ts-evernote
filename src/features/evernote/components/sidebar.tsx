import React from "react";
import "../../App.scss";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="header">
        <button className="button adder">
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
              {
                <li key={"notebook.id"} className={"notebook-item"}>
                  <div className="title has-icon">
                    <i className="iconfont icon-book"></i>
                    {"notebook.name"}
                  </div>
                  <button className="button trash">
                    <i className="iconfont icon-trash"></i>
                  </button>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;