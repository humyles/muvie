import React from "react";

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  makeList() {
    if (this.props.movie !== undefined) {
      return this.props.movie.map(item => {
        return (
          <div key={item.id}>
            <a href="">title:{item.name}</a>
          </div>
        );
      });
    }
  }
  renderMovie() {
    if (this.props.movie !== undefined) {
      let item = this.props.movie.data;
      return (<div className = "movieMain" key = {item.id}>
      <div className = "movieThumb">
          <img src = {"https://image.tmdb.org/t/p/original/" + item.poster_path}>
          </img>
        </div>
      <div className = "movieText">
        <div className = "movieTitle">
          <a href = "">  title:{item.original_title}  </a>
        </div>
        <div className = "movieSummary">summary:{item.overview}
        </div>
      </div>
        
      
      </div>)
    }
  }
  render() {
    return <div className = "moviesList">{this.renderMovie()}</div>;
  }
}

export default Movies;
