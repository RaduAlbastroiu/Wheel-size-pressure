import React, { Component } from 'react';
import LeftPane from './LeftPane';

class MainCard extends Component {
  render() {
    return (
      <div className="card">
        <div class="row" style={{ height: 550 }}>
          <div class="col-sm-6 col-md-4" style={{ backgroundColor: '#0275d8' }}>
            <LeftPane></LeftPane>
          </div>
          <div class="col-sm-6 col-md-8"></div>
        </div>
      </div>
    );
  }
}

export default MainCard;
