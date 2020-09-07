import React, { Component } from 'react';

class Wheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: 'none',
      showDetailsText: 'Show more tire details',
    };
  }

  renderPressure = (pressure) => {
    if (pressure) {
      return (
        <div>
          <p>
            Pressure: {pressure.psi} psi, {pressure.bar} bar, {pressure.kPa} kPa
          </p>
        </div>
      );
    }
  };

  renderTireData = (tireData) => {
    return (
      <div>
        {this.renderPressure(tireData.tire_pressure)}

        <div
          className="card card-body"
          style={{ display: this.state.showDetails }}
        >
          <p>Width: {tireData.tire_width}</p>
          <p>Aspect Ratio: {tireData.tire_aspect_ratio}</p>
          <p>Load index: {tireData.load_index}</p>
          <p>Speed index: {tireData.speed_index}</p>
          <p>Rim Diameter: R{tireData.rim_diameter}</p>
          <p>Rim Width: {tireData.rim_width}</p>
          <p>Rim Offset: {tireData.rim_offset}</p>
        </div>
      </div>
    );
  };

  renderShowMoreButton = () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }}
      >
        <button
          className="btn btn-outline-primary"
          style={{
            width: 200,
          }}
          onClick={() => {
            if (this.state.showDetails === 'none') {
              this.setState({
                showDetails: '',
                showDetailsText: 'Hide tire details',
              });
            } else {
              this.setState({
                showDetails: 'none',
                showDetailsText: 'Show more tire details',
              });
            }
          }}
        >
          {this.state.showDetailsText}
        </button>
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
        <div className="row card-body">
          <div className="card-body">
            <h4 className="card-title">
              Front Tire {front.tire_width}/{front.tire_aspect_ratio}/R
              {front.rim_diameter}
            </h4>
            {this.renderTireData(front)}
          </div>
          <div className="card-body">
            <h4 className="card-title">
              Rear Tire {rear.tire_width}/{rear.tire_aspect_ratio}/R
              {front.rim_diameter}
            </h4>
            {this.renderTireData(rear)}
          </div>
        </div>
        {this.renderShowMoreButton()}
      </div>
    );
  };

  renderCard = () => {
    if (this.props.rear.tire) {
      if (this.props.rear.pressure) {
        return this.renderFrontAndRear(this.props.front, this.props.rear);
      } else {
        let rear = this.props.rear;
        rear.tire_pressure = {
          bar: 0,
          psi: 0,
          kPa: 0,
        };
        return this.renderFrontAndRear(this.props.front, this.props.rear);
      }
    } else {
      return this.renderFrontAndRear(this.props.front, this.props.front);
    }
  };

  render() {
    return <div>{this.renderCard()}</div>;
  }
}

export default Wheel;
