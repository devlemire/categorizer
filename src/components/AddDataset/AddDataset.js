import React, { Component, PropTypes } from "react";

import "./AddDataset.css";

export default class AddDataset extends Component {
  static propTypes = {
      addDataset: PropTypes.func.isRequired
    , labels: PropTypes.arrayOf( PropTypes.string ).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      label: '',
      data: new Array( props.labels.length ).fill(0)
    }
  }

  render() {
    const { labels } = this.props;
    const { data } = this.state;
    return (
      <form className="add-dataset">
        <h3 className="add-dataset__header">Add Dataset</h3>
        <div className="add-dataset__form-group">
          <label className="add-dataset__label">Dataset Label:</label>
          <input
            className="add-dataset__input"
            required
            type="text"
          />
        </div>
        {
          labels.map( ( label, index ) => (
            <div className="add-dataset__form-group" key={ label }>
              <label className="add-dataset__label">{ label }:</label>
              <input
                className="add-dataset__input"
                max="100"
                min="0"
                onChange={ this.handleDataChange.bind( this, index ) }
                required
                type="number"
                value={ data[ index ] }
              />
            </div>
          ))
        }
        <button className="add-dataset__submit" type="submit">
          Submit
        </button>
      </form>
    );
  }
}
