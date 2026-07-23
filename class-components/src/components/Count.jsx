import { Component } from 'react';

class Count extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <p>Number of todos: {this.props.todoCount}</p>
      </>
    );
  }
}

export default Count;
