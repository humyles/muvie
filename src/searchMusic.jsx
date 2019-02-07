import React from "react";
import axios from "axios";
import Items from "./items.jsx"

class SearchMusic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  searchGenius(event, title, artists) {
      axios.get('/name/' + title + '/artist/' + artists[0].name).then(res => {
          console.log(res.data);
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
          console.log(res);
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
          <form onSubmit = {this.handleSubmit}>
              <label>Search:
                  <input type="text" name="search" onChange = {this.handleChange}/>
              </label>
              <input type ="submit" value ="Submit" />
          </form>
        <Items items = {this.state.tracks} searchGenius = {this.searchGenius}/>
      </div>
    );
  }
}

export default SearchMusic