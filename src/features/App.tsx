import React from "react";
import "./App.scss";
import NoteList from "./evernote/notelist";
import SideBar from "./evernote/sidebar";
import Note from "./evernote/note";

function App() {
  return (
    <div className="app">
      <SideBar></SideBar>
      <NoteList></NoteList>
      <Note></Note>
    </div>
  );
}

export default App;
