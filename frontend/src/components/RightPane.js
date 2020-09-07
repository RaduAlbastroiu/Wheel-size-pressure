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
      if (this.state.querryValues.length < 4) {
        this.prepareData(res.data);
      } else {
        res.data.sort((a, b) => {
          if (a.front && a.front.tire && b.front && b.front.tire) {
            if (a.front.tire < b.front.tire) {
              return -1;
            }
            if (a.front.tire > b.front.tire) {
              return 1;
            }
          }
          return 0;
        });
        this.setState({ data: res.data });
      }
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
      newData.sort((a, b) => {
        if (a.value < b.value) {
          return -1;
        }
        if (a.balue > b.value) {
          return 1;
        }
        return 0;
      });

      // filter duplicate values
      let filteredData = newData.filter((value, index, self) => {
        let keep = true;
        for (let i = 0; i <= index; i++) {
          if (value.value === newData[i].value && index != i) {
            keep = false;
          }
        }
        return keep;
      });

      this.setState({ data: filteredData });
    } else {
      let newData = data.map((element) => {
        return { key: element.toString(), value: element.toString() };
      });
      newData.sort();
      this.setState({ data: newData });
    }
  };

  onBackToMaker = async () => {
    this.setState(
      {
        querryValues: [],
        nextDisabled: true,
      },
      () => {
        this.fetchData();
      }
    );
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
          <Wheels
            data={this.state.data}
            onPrev={this.onPrev}
            onBackToMaker={this.onBackToMaker}
          ></Wheels>
        </div>
      );
    }
  };

  render() {
    return <div style={{}}>{this.renderFormGroup()}</div>;
  }
}

export default RightPane;
