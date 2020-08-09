import React, { Component } from 'react';
import CardTab from './CardTab';
import FormControl from './FormControl';

class Dashboard extends Component {
  render() {
    return (
      <div className="col-md-8 offset-md-2">
        <h2 style={{ marginTop: 40, marginBottom: 40, textAlign: 'center' }}>
          Tyre pressure finder
        </h2>
        <div
          className="row"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <CardTab text="By Vehicle"></CardTab>
          <CardTab text="By Tire Size"></CardTab>
          <CardTab text="By Rim Size"></CardTab>
        </div>
      </div>
    );
  }
}

export default Dashboard;
