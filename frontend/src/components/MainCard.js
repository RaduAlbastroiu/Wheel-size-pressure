import React, { Component } from 'react';
import LeftPane from './LeftPane';
import RightPane from './RightPane';

class MainCard extends Component {
  render() {
    return (
      <div className="card" style={{ borderRadius: 15 }}>
        <div className="row" style={{}}>
          <div
            className="col-sm-4 col-lg-3"
            style={{ backgroundColor: '#0275d8', borderRadius: 15 }}
          >
            <LeftPane></LeftPane>
          </div>
          <div className="col-sm-8 col-lg-9">
            <RightPane></RightPane>
          </div>
        </div>
      </div>
    );
  }
}

export default MainCard;
