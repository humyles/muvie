import React from "react";
import axios from "axios";
import Songs from "./songs.jsx"

class SearchMusic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getMovie(event, title, artists, cb)  {
      axios.get('/name/' + title + '/artist/' + artists[0].name).then(res => {
        console.log('getmovie', res);
        cb(res)
      }).catch(err => {
          console.log(err);
      })
      event.preventDefault()
  }
  handleChange(event) {
      this.setState({value:event.target.value})
  }
  handleSubmit(event) {
      axios.get('/search/' + this.state.value).then((res) => {
          this.setState({
              tracks : res.data.body.tracks.items
          })
      }).catch((err)=> {
          console.log(err);
      })
      event.preventDefault();
  }
  render() {
    return (
      <div>
          <form  onSubmit = {this.handleSubmit}>
              <label >
                  <input className ="searchBar" type="text" name="search" placeholder = " Search for a song/artist" onChange = {this.handleChange}/>
              </label>
              <input type ="submit" value ="Submit" />
          </form>
        <Songs items = {this.state.tracks} setMovie = {this.props.setMovie} getMovie = {this.getMovie}/>

      </div>
    );
  }
}

export default SearchMusic