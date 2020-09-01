import React, { Component } from 'react';
import axios from 'axios';
import FormGroup from './FormGroup';

class RightPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      querryValues: [],
      stages: [
        {
          label: 'Choose car maker',
          type: 'Maker',
          param: 'make',
          endpoint: '/api/makes',
        },
        {
          label: 'Choose model',
          type: 'Model',
          param: 'model',
          endpoint: '/api/models',
        },
        {
          label: 'Choose year',
          type: 'Year',
          param: 'year',
          endpoint: '/api/years',
        },
        {
          label: 'Choose trim option',
          type: 'Trim',
          param: 'trim',
          endpoint: '/api/trim',
        },
      ],
      nextDisabled: true,
      data: [],
    };

    this.fetchData();
  }

  fetchData = async () => {
    if (this.state.querryValues.length <= 4) {
      let params = {};
      for (let i = 0; i < this.state.querryValues.length; i++) {
        params[this.state.stages[i].param] = this.state.querryValues[i];
      }

      try {
        const res = await axios.get(
          this.state.stages[this.state.querryValues.length].endpoint,
          {
            params: params,
          }
        );
        console.log(res);
        this.setState({ data: res.data });
      } catch (err) {
        console.log(err);
      }
    }
  };

  onPrev = async () => {
    this.setState(
      {
        querryValues: this.state.querryValues.slice(
          0,
          this.state.querryValues.length - 1
        ),
        nextDisabled: true,
      },
      () => {
        console.log('prev clicked');
        this.fetchData();
      }
    );
  };

  onNext = async (val) => {
    this.setState(
      {
        querryValues: [...this.state.querryValues, val],
        nextDisabled: true,
      },
      () => {
        console.log('next clicked');
        console.log(val);
        this.fetchData();
      }
    );
  };

  renderFormGroup = () => {
    if (this.state.querryValues.length < 4) {
      return (
        <FormGroup
          label={this.state.stages[this.state.querryValues.length].label}
          type={this.state.stages[this.state.querryValues.length].type}
          data={this.state.data}
          onNext={this.onNext}
          onPrev={this.onPrev}
          nextDisabled={this.state.nextDisabled}
        ></FormGroup>
      );
    } else {
      return (
        <div>
          <h3>{this.state.querryValues[0]}</h3>
          <h3>{this.state.querryValues[1]}</h3>
          <h3>{this.state.querryValues[2]}</h3>
          <h3>{this.state.querryValues[3]}</h3>
        </div>
      );
    }
  };

  render() {
    return <div style={{}}>{this.renderFormGroup()}</div>;
  }
}

export default RightPane;
