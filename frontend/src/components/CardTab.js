import React, { Component } from 'react';

class CardTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: 'card shadow',
      text: this.props.text ? this.props.text : 'By Vehicle',
    };
  }

  render() {
    return (
      <div
        className={this.state.hover}
        style={{ margin: 10 }}
        onMouseEnter={() => {
          this.setState({
            hover: 'card shadow-lg',
          });
        }}
        onMouseLeave={() => {
          this.setState({
            hover: 'card shadow',
          });
        }}
      >
        <div
          style={{
            marginTop: 30,
            marginBottom: 30,
            marginLeft: 30,
            marginRight: 30,
          }}
        >
          <h2>{this.state.text}</h2>
        </div>
      </div>
    );
  }
}

export default CardTab;
