import React, { Component, PropTypes } from "react";

import "./NewChart.css";

export default class NewChart extends Component {
  static propTypes = { createChart: PropTypes.func.isRequired };

  constructor( props ) {
    super( props );

    this.state = {
      labels: [],
      name: '',
      newLabel: ''
    };

    this.handleChange = this.handleChange.bind( this );
    this.addLabel = this.addLabel.bind( this );
  }

  handleChange(field, val) {
    this.setState({ [field]: val });
  }
  
  addLabel(event) {
    event.preventDefault();
    this.setState({
      labels: [ ...this.state.labels, this.state.newLabel ],
      newLabel: ''
    });
  }

  render() {
    const {
      labels,
      name,
      newLabel
    } = this.state;
    return (
      <div className="new-chart">
        <div className="new-chart__form-group">
          <label className="new-chart__label">Chart Name:</label>
          <input
            className="new-chart__name new-chart__input"
            type="text"
            onChange={ (e) => this.handleChange("name", e.target.value) }
            value={ name }
          />
        </div>
        <form className="new-chart__form-group" onSubmit={ this.addLabel }>
          <label className="new-chart__label">Add Label:</label>
          <input
            className="new-chart__category new-chart__input"
            required
            type="text"
            onChange={ (e) => this.handleChange("newLabel", e.target.value) }
            value={ newLabel }
          />
        </form>

        <div className="new-chart__labels-wrapper">
          <label className="new-chart__label">Labels:</label>
          <span className="new-chart__labels">[ { labels.join(', ') } ] (Min. 3)</span>
        </div>

        <button className="new-chart__submit">
          Submit
        </button>
      </div>
    );
  }
}
