import React, { Component } from 'react';
import FormGroup from './FormGroup';

class RightPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      querryValues: [],
      stages: [
        { label: 'Choose car maker', type: 'Maker' },
        { label: 'Choose model', type: 'Model' },
        { label: 'Choose year', type: 'Year' },
        { label: 'Choose trim option', type: 'Trim' },
      ],
    };
  }

  onPrev() {
    console.log('prev clicked');
  }

  onNext(val) {
    console.log('next clicked');
    console.log(val);
  }

  render() {
    return (
      <div style={{}}>
        <FormGroup
          label={this.state.stages[this.state.querryValues.length].label}
          type={this.state.stages[this.state.querryValues.length].type}
          data={['Bmw', 'Audi', 'Mercedes-Benz']}
          onNext={this.onNext}
          onPrev={this.onPrev}
        ></FormGroup>
      </div>
    );
  }
}

export default RightPane;
