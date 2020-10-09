import React from "react";
import "./App.scss";
import NoteList from "./evernote/components/notelist";
import SideBar from "./evernote/components/sidebar";
import Note from "./evernote/components/note";

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
