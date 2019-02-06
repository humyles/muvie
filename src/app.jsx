import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import SearchMusic from "./searchMusic.jsx"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  loadData() {
    }

  componentDidMount() {
    this.loadData()
  }

  render() {
    return (
      <div>AAAAAAAAAAAAAAAAAAAAAA
        <SearchMusic/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
