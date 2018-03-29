/* eslint-disable react/no-multi-comp */

import React, { Component } from "react";

import MyComponent from "./myComponent";
import names from "./names";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { theCount: 0 };

    this.myList = names;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.myList.unshift({
      firstname: `Bill${this.state.theCount}`,
      lastname: `Smithe${this.state.theCount}`
    });

    this.setState(prevState => {
      return { theCount: prevState.theCount + 1 };
    });
  }

  render() {
    // console.log("this.state.theCount", this.state.theCount);
    return (
      <div>
        <MyComponent
          numClicks={this.state.theCount}
          nameList={[].concat(this.myList)}
        />
        <button style={{ marginTop: "20px" }} onClick={this.handleClick}>
          Click Me
        </button>
      </div>
    );
  }
}

export default App;
