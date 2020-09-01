import React, { Component } from 'react';

class FormGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: '',
    };
  }

  renderOptions = () => {
    let d = [];
    this.props.data.forEach((element) => {
      d.push(<option key={element.key}>{element.value}</option>);
    });
    return d;
  };

  onChange = (event) => {
    this.setState({ formValue: event.target.value });
  };

  onClick = () => {
    let res = this.props.data.find(
      (element) => element.value === this.state.formValue
    );
    console.log(typeof this.props.data[0].value);
    console.log(typeof this.state.formValue);
    console.log(this.state.formValue);
    console.log(this.props.data);
    console.log(res);
    this.props.onNext(res.key);
  };

  renderForm = () => {
    return (
      <div className="form-group" style={{ marginTop: 20 }}>
        <select
          className="form-control"
          id={this.props.type}
          style={{ width: 250 }}
          onChange={this.onChange}
        >
          <option>{this.props.type}</option>
          {this.renderOptions()}
        </select>
      </div>
    );
  };

  render() {
    return (
      <div style={{}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 40,
            border: '2px solid green',
          }}
        >
          <h2>{this.props.label}</h2>
        </div>
        <div style={{ border: '2px solid blue' }}>
          <div>{this.renderForm()}</div>
        </div>
        <div>
          <button
            className="btn btn-outline-primary"
            style={{ margin: 10 }}
            onClick={this.props.onPrev}
          >
            Prev
          </button>
          <button
            className="btn btn-primary"
            style={{ margin: 10 }}
            onClick={this.onClick}
            disabled={!this.props.nextDisabled}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default FormGroup;
