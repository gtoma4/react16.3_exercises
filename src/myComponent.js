/* eslint-disable react/no-multi-comp */
import React, { Component } from "react";
import PropTypes from "prop-types";

class ScrollingList extends React.Component {
  listRef = null;
  previousScrollHeight = null;

  //////////////////////////////////////////////////////////
  // TODO refactor to eliminate use of componentWillUpdate

  componentWillUpdate(nextProps, nextState) {
    // Are we adding new items to the list?
    // Capture the current height of the list so we can adjust scroll later.

    if (this.props.list.length !== nextProps.list.length) {
      this.previousScrollHeight = this.listRef.scrollHeight;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // If previousScrollHeight is set, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    if (this.previousScrollHeight !== null) {
      this.listRef.scrollTop +=
        this.listRef.scrollHeight - this.previousScrollHeight;
      this.previousScrollHeight = null;
    }
  }

  render() {
    let myList = this.props.list.map((item, index) => {
      return (
        <div key={index} className="listItem">{`${item.firstname} ${
          item.lastname
        }`}</div>
      );
    });

    return (
      <div
        ref={this.setListRef}
        style={{
          backgroundColor: "lightyellow",
          height: "75px",
          width: "200px",
          overflow: "auto"
        }}
      >
        {myList}
      </div>
    );
  }

  setListRef = ref => {
    this.listRef = ref;
  };
}

class MyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickCount: this.props.numClicks
    };
  }

  static propTypes = {
    numClicks: PropTypes.number,
    nameList: PropTypes.array
  };

  ///////////////////////////////////////////////////////////////
  // TODO refactor so we don't need componentWillReceiveProps
  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty("numClicks")) {
      this.setState(prevState => {
        return { ...prevState, clickCount: nextProps.numClicks };
      });
    }
  }

  render() {
    return (
      <div className="myComponent">
        Click Count is: {this.state.clickCount}
        <ScrollingList list={this.props.nameList} />
      </div>
    );
  }
}

export default MyComponent;
