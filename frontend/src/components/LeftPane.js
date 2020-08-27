import React, { Component } from 'react';
import tire from '../resources/tire.png';

class LeftPane extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            marginTop: 40,
          }}
        >
          <img
            src={tire}
            alt="Tire"
            style={{
              maxHeight: '60%',
              maxWidth: '80%',
              paddingRight: 20,
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}
        >
          <h2 style={{ color: 'white' }}>Tire Pressure</h2>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p style={{ color: 'white' }}>Find tire pressure for your car.</p>
        </div>
      </div>
    );
  }
}

export default LeftPane;