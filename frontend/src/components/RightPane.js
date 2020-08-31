import React, { Component } from 'react';

class RightPane extends Component {
  renderForm(label) {
    return (
      <div class="form-group" style={{ marginTop: 20 }}>
        <select class="form-control" id={label} style={{ width: 250 }}>
          <option>{label}</option>
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
          <h2>Choose car manufacturer</h2>
        </div>
        <div style={{ border: '2px solid blue' }}>
          <div>
            {this.renderForm('Make')}
            {this.renderForm('Model')}
            {this.renderForm('Year')}
            {this.renderForm('Trim')}
          </div>
        </div>
      </div>
    );
  }
}

export default RightPane;
