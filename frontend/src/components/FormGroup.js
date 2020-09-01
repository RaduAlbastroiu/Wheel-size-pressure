import React, { Component } from 'react';

class FormGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: '',
      nextDisabled: true,
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
    let disabled = true;
    if (
      event.target.value !== 'Maker' &&
      event.target.value !== 'Model' &&
      event.target.value !== 'Year' &&
      event.target.value !== 'Trim'
    ) {
      disabled = false;
    }
    this.setState({ formValue: event.target.value, nextDisabled: disabled });
  };

  onClick = () => {
    let res = this.props.data.find(
      (element) => element.value === this.state.formValue
    );
    this.setState({ nextDisabled: true });
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

  renderNext = () => {
    return (
      <button
        className="btn btn-primary"
        style={{ margin: 10 }}
        onClick={this.onClick}
        disabled={this.state.nextDisabled}
      >
        Next
      </button>
    );
  };

  renderPrev = () => {
    return (
      <button
        className="btn btn-outline-primary"
        style={{ margin: 10 }}
        onClick={this.props.onPrev}
        disabled={!this.props.showPrev}
      >
        Prev
      </button>
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
            marginTop: 60,
          }}
        >
          <h2>{this.props.label}</h2>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <div>{this.renderForm()}</div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 50,
          }}
        >
          {this.renderPrev()}
          {this.renderNext()}
        </div>
      </div>
    );
  }
}

export default FormGroup;
