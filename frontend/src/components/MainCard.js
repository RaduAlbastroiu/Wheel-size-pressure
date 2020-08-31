import React, { Component } from 'react';
import LeftPane from './LeftPane';
import RightPane from './RightPane';

class MainCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="row" style={{ height: 550 }}>
          <div
            className="col-sm-6 col-md-4"
            style={{ backgroundColor: '#0275d8' }}
          >
            <LeftPane></LeftPane>
          </div>
          <div className="col-sm-6 col-md-8">
            <RightPane></RightPane>
          </div>
        </div>
      </div>
    );
  }
}

export default MainCard;
