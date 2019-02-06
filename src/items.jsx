import React from "react";

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  makeList() {
    if (this.props.items !== undefined) {
      return this.props.items.map(item => {
        return (
          <div key={item.id} onClick = {e =>this.props.searchGenius(e, item.name, item.artists)}>
            <a href="">{item.name}</a>
          </div>
        );
      });
    }
  }
  render() {
    console.log(this.props);
    return <div>{this.makeList()}</div>;
  }
}

export default Items;
