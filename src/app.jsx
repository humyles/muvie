import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import SearchMusic from "./searchMusic.jsx"
import Movies from "./movies.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.setMovie = this.setMovie.bind(this);

  }

  setMovie(movie) {
    console.log('set state', movie);
    this.setState({
      movie : movie
    })
  }
  loadData() {
    }

  componentDidMount() {
    this.loadData()
  }

  render() {
    return (
      <div>
        <SearchMusic setMovie = {this.setMovie}/>
        <Movies movie = {this.state.movie}></Movies>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
