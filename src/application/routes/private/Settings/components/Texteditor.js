import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../components/Input';

export default class Texteditor extends Component {

  constructor(props) {
    super(props);
  }

  get field() {
    const {
      type,
      name,
      edit,
      value,
      required,
      handler,
    } = this.props;

    return edit
    ? (<Input
      type={type}
      name={name}
      value={value}
      required={required}
      rootClasses="editable-group clearfix"
      inputClasses="setting-control"
      errorClasses="setting-error"
      handler={handler}
    />)
    : (<div className="editable-text">{value}</div>);
  }

  render() {
    const {caption} = this.props;

    return (
      <div className="textedit-group">
        <div className="setting-caption">{caption}</div>
        <div className="setting-description">
          {this.field}
        </div>
      </div>
    );
  }
}
Texteditor.propTypes = {
  edit: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  caption: PropTypes.string,
  handler: PropTypes.func.isRequired,
};
