import React, { Component } from 'react';

class CardTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card shadow" style={{ margin: 10 }}>
        <div
          style={{
            marginTop: 30,
            marginBottom: 30,
            marginLeft: 30,
            marginRight: 30,
          }}
        >
          <h2>By Vehicle</h2>
        </div>
      </div>
    );
  }
}

export default CardTab;
