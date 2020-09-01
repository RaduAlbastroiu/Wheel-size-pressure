import React, { Component } from 'react';

class Wheels extends Component {
  renderPressure = (pressure) => {
    if (pressure) {
      return (
        <div>
          <p>
            Pressure:
            {pressure.bar} bar
          </p>
          <p>
            Pressure:
            {pressure.psi} psi
          </p>
          <p>
            Pressure:
            {pressure.kPa} kPa
          </p>
        </div>
      );
    }
  };

  renderTireData = (tireData) => {
    return (
      <div>
        <p>Width: {tireData.tire_width}</p>
        <p>Aspect Ratio: {tireData.tire_aspect_ratio}</p>
        <p>Load index: {tireData.load_index}</p>
        <p>Speed index: {tireData.speed_index}</p>
        <p>Rim Diameter: R{tireData.rim_diameter}</p>
        <p>Rim Width: {tireData.rim_width}</p>
        <p>Rim Offset: {tireData.rim_offset}</p>
        {this.renderPressure(tireData.tire_pressure)}
      </div>
    );
  };

  renderFront = (front) => {
    return (
      <div
        className="card shadow"
        style={{ margin: 20, borderRadius: 10, padding: 10 }}
        key={Math.floor(Math.random() * 10000)}
      >
        <div className="card-body">
          <h4 className="card-title">
            Tire {front.tire_width}/{front.tire_aspect_ratio}/R
            {front.rim_diameter}
          </h4>
          {this.renderTireData(front)}
        </div>
      </div>
    );
  };

  renderFrontAndRear = (front, rear) => {
    return (
      <div
        className="card shadow"
        style={{ margin: 20, borderRadius: 10, padding: 10 }}
        key={Math.floor(Math.random() * 10000)}
      >
        <div className="card-body">
          <h4 className="card-title">
            Front Tire {front.tire_width}/{front.tire_aspect_ratio}/R
            {front.rim_diameter}
          </h4>
          {this.renderTireData(front)}
        </div>
        <div className="card-body">
          <h4 className="card-title">
            Rear Tire {front.tire_width}/{front.tire_aspect_ratio}/R
            {front.rim_diameter}
          </h4>
          {this.renderTireData(rear)}
        </div>
      </div>
    );
  };

  renderCard = (front, rear) => {
    if (rear.tire) {
      return this.renderFrontAndRear(front, rear);
    } else {
      return this.renderFront(front);
    }
  };

  renderCards = () => {
    let cards = [];
    let i = 0;
    this.props.data.forEach((element) => {
      i++;
      let { front, rear } = element;
      if (front && rear) {
        cards.push(this.renderCard(front, rear, i));
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
