import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CATEGORIES } from './FAKE';

export default class Checkboxes extends Component {

  constructor(props) {
    super(props);
    // console.log(CATEGORIES);
  }

  render() {
    const props = this.props;
    const checkboxes = CATEGORIES.map((category, index) =>
      <label className={`editable-checkbox ${props.categories.indexOf(category) !== -1 ? 'active' : 'inactive'}`} key={index}>
        <input type="checkbox"
          checked={props.categories.indexOf(category) !== -1}
          onChange={(event) => props.handler(event, category)}
        />
        <i className="fa fa-check-square-o active" />
        <i className="fa fa-square-o inactive" />
        <p>{category}</p>
      </label>
      );

    const field = props.edit ?
      (<div className="setting-categories">
        <i className="fa fa-fw fa-pencil" />
        <div className="editable-categories">
          {checkboxes}
        </div>
      </div>) :
      (<div className="editable-text">{props.categories.join(', ')}</div>)
  
    return (
      <div className="textedit-group">
        <div className="setting-caption">{props.caption}</div>
        <div className="setting-description">
          {field}
        </div>
      </div>
    );
  }
}
Checkboxes.propTypes = {
  edit: PropTypes.bool,
  caption: PropTypes.string,
  handler: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
};