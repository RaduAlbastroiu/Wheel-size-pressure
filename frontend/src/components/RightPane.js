import React, { Component } from 'react';
import axios from 'axios';
import FormGroup from './FormGroup';
import Wheels from './Wheels';

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
        {
          label: 'Wheels',
          type: 'Wheel',
          param: 'wheels',
          endpoint: '/api/wheels',
        },
      ],
      data: [],
    };

    this.fetchData();
  }

  fetchData = async () => {
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
      console.log(res.data);
      this.prepareData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  prepareData = (data) => {
    if (
      this.state.querryValues.length <= 1 ||
      this.state.querryValues.length === 3
    ) {
      let newData = data.map((element) => {
        return { key: element.slug, value: element.name };
      });
      this.setState({ data: newData });
    } else {
      let newData = data.map((element) => {
        return { key: element.toString(), value: element.toString() };
      });
      this.setState({ data: newData });
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
          showPrev={this.state.querryValues.length > 0}
        ></FormGroup>
      );
    } else {
      return (
        <div>
          <h3>{this.state.querryValues[0]}</h3>
          <h3>{this.state.querryValues[1]}</h3>
          <h3>{this.state.querryValues[2]}</h3>
          <h3>{this.state.querryValues[3]}</h3>
          <Wheels data={this.state.data}></Wheels>
        </div>
      );
    }
  };

  render() {
    return <div style={{}}>{this.renderFormGroup()}</div>;
  }
}

export default RightPane;
