import React, { Component } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import TextEditor from "./components/TextEditor";
import Question from "./components/Question";

class App extends Component {
  render() {
    // @todo marry TextEditor to State on keydown,
    // @todo on button submit -- send to firebase
    return (
      <div className="App">
        <Sidebar/>
        <div className="TextEditor-wrap">
          <Question/>
          <TextEditor/>
        </div>
      </div>
    );
  }
}

export default App;
