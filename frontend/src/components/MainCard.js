import React, { Component } from 'react';

class MainCard extends Component {
  render() {
    return (
      <div className="card">
        <div class="row" style={{ height: 150 }}>
          <div
            class="col-sm-6 col-md-4"
            style={{ border: '2px solid red' }}
          ></div>
          <div
            class="col-sm-6 col-md-8"
            style={{ border: '2px solid blue' }}
          ></div>
        </div>
      </div>
    );
  }
}

export default MainCard;
