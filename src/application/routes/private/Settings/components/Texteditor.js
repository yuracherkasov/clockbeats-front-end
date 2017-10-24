import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../components/Input';

export default class Texteditor extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    const field = props.edit ?
      (<Input
        type={props.type}
        name={props.name}
        value={props.value}
        required={props.required}
        rootClasses="editable-group clearfix"
        inputClasses="setting-control"
        icon="fa fa-fw fa-pencil"
        errorClasses="setting-error"
        handler={props.handler}
      />) :
      (<div className="editable-text">{props.value}</div>)
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
Texteditor.propTypes = {
  edit: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  caption: PropTypes.string,
  handler: PropTypes.func.isRequired,
};
