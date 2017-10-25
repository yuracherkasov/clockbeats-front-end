import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '../../../../components/Select';
import COUNTRIES from './COUNTRIES.json'

export default class SelectOpts extends Component {

  constructor(props) {
    super(props);
    this.options = COUNTRIES.map(item => item.name);
  }

  get field() {
    const {
      name,
      edit,
      value,
      handler,
    } = this.props;

    return edit
    ?  (<Select
        name={name}
        value={value}
        rootClasses="editable-group"
        selectClasses="setting-control"
        errorClasses="setting-error"
        handler={handler}
        options={this.options}
    />)
    : (<div className="editable-text">{value}</div>);
  }

  render() { 
    return (
      <div className="textedit-group">
        <div className="setting-caption">{this.props.caption}</div>
        <div className="setting-description">
          {this.field}
        </div>
      </div>
    );
  }
}
SelectOpts.propTypes = {
  edit: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  caption: PropTypes.string,
  handler: PropTypes.func,
};