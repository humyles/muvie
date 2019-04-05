import React from "react";

class Songs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  makeList() {
    if (this.props.items !== undefined) {
      return this.props.items.map(item => {
        return (
          <div key={item.id} onClick = {e =>(this.props.getMovie(e, item.name, item.artists, this.props.setMovie))}>
            <a href="">title:{item.name} artist:{item.artists[0].name}</a>
          </div>
        );
      });
    }
  }
  render() {
    return <div className = "musicList">{this.makeList()}</div>;
  }
}

export default Songs;
