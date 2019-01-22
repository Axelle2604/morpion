import React, { Component } from 'react';
import './box.css';

const defaultBoxState = {
  className: 'box',
  clicked: false,
  idPlayer: null,
};

class Box extends Component {
  constructor(props) {
    super(props);

    this.state = defaultBoxState;
  }

  onClick() {
    if (!this.state.clicked) {
      this.setState(
        {
          className: this.state.className + ' ' + this.props.color,
          clicked: true,
        },
        this.props.changePlayer(this.props.box, this.props.idPlayer)
      );
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.restart) {
      this.setState(defaultBoxState);
    }
  }

  render() {
    return (
      <div className={this.state.className} onClick={this.onClick.bind(this)} />
    );
  }
}

export default Box;
