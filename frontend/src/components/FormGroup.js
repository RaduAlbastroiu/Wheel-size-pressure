import React, { Component } from 'react';

class Manufacturer extends Component {
  renderOptions() {
    let d = [];
    this.props.data.forEach((element) => {
      d.push(<option key={element}>{element}</option>);
    });
    return d;
  }

  renderForm() {
    return (
      <div className="form-group" style={{ marginTop: 20 }}>
        <select
          className="form-control"
          id={this.props.type}
          style={{ width: 250 }}
          onChange={this.props.onChange}
        >
          <option>{this.props.type}</option>
          {this.renderOptions()}
        </select>
      </div>
    );
  }

  render() {
    return (
      <div style={{}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 40,
            border: '2px solid green',
          }}
        >
          <h2>{this.props.label}</h2>
        </div>
        <div style={{ border: '2px solid blue' }}>
          <div>{this.renderForm()}</div>
        </div>
      </div>
    );
  }
}

export default Manufacturer;
