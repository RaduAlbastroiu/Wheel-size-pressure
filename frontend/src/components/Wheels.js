import React, { Component } from 'react';
import Wheel from './Wheel';

class Wheels extends Component {
  renderCards = () => {
    let cards = [];
    let i = 0;
    this.props.data.forEach((element) => {
      i++;
      let { front, rear } = element;
      if (front && rear) {
        cards.push(<Wheel front={front} rear={rear} key={i}></Wheel>);
      }
    });

    return cards;
  };

  renderPrevButton = () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 50,
        }}
      >
        <button
          className="btn btn-outline-primary"
          style={{ margin: 10 }}
          onClick={this.props.onPrev}
        >
          Prev
        </button>
      </div>
    );
  };

  renderBackToMaker = () => {
    return (
      <div style={{ marginTop: 50 }}>
        <h4 className="text-center">Choose another car</h4>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <button
            className="btn btn-primary"
            style={{ margin: 10 }}
            onClick={this.props.onBackToMaker}
          >
            Home
          </button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div style={{ margin: 10 }}>
        {this.renderBackToMaker()}
        {this.renderCards()}
        {this.renderPrevButton()}
      </div>
    );
  }
}

export default Wheels;
