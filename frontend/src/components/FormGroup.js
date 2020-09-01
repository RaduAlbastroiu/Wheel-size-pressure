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
      d.push(<option key={element.name}>{element.name}</option>);
    });
    return d;
  };

  onChange = (event) => {
    this.setState({ formValue: event.target.value });
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
            onClick={() => {
              this.props.onNext(this.state.formValue);
            }}
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
