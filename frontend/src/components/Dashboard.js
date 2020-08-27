import React, { Component } from 'react';
import MainCard from './MainCard';

class Dashboard extends Component {
  render() {
    return (
      <div className="col-md-10 offset-md-1" style={{ marginTop: 40 }}>
        <MainCard></MainCard>
      </div>
    );
  }
}

export default Dashboard;
