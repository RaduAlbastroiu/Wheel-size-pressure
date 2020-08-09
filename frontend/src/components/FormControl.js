import React, { Component } from 'react';

class FormControl extends Component {
  render() {
    return (
      <div
        style={{
          marginTop: 30,
          marginBottom: 30,
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        <select className="from-control">
          <option>First</option>
          <option>Second</option>
        </select>
      </div>
    );
  }
}

export default FormControl;
