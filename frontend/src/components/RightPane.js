import React, { Component } from 'react';
import FormGroup from './FormGroup';

class RightPane extends Component {
  renderNext() {
    console.log('next clicked');
  }

  renderPrev() {
    console.log('prev clicked');
  }

  onChange(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <div style={{}}>
        <FormGroup
          label="Chose car maker"
          type="Make"
          data={['Bmw', 'Audi', 'Mercedes-Benz']}
          onChange={this.onChange}
        ></FormGroup>
      </div>
    );
  }
}

export default RightPane;
