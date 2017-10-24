import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '../../../../components/Select';
import COUNTRIES from './COUNTRIES.json'

export default class SelectOpts extends Component {

  constructor(props) {
    super(props);
    this.options = COUNTRIES.map(item => item.name);
  }

  render() {
    const props = this.props;

    const field = props.edit ?
      (<Select
        name={props.name}
        value={props.value}
        rootClasses="editable-group"
        selectClasses="setting-control"
        icon="fa fa-fw fa-pencil"
        errorClasses="setting-error"
        handler={props.handler}
        options={this.options}
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
Select.propTypes = {
  edit: PropTypes.bool,
  name: PropTypes.string,
  rootClasses: PropTypes.string,
  value: PropTypes.string,
  caption: PropTypes.string,
  handler: PropTypes.func,
};