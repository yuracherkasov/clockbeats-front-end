import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../components/Input';

export default class Passwordeditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
    };
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
      ? (<div className="passwds-group">
        <Input
          type={type}
          name={name}
          value={value}
          placeholder="Insert your new password"
          value={this.state.newPassword}
          rootClasses="editable-group clearfix"
          inputClasses="setting-control"
          errorClasses="setting-error"
          handler={this.insertHandler}
        />
        <Input
          type={type}
          name={name}
          placeholder="Repeat your new password"
          required={true}
          rootClasses="editable-group clearfix"
          inputClasses="setting-control"
          value={value}
          errorClasses="setting-error"
          handler={handler}
          validate={this.repeatPasswordValidator}
        />
      </div>)
      :
      (<div className="editable-text">**********</div>)

  }

  insertHandler = ({ value }) => {
    this.setState({
      newPassword: value,
    })
  }

  repeatPasswordValidator = (repeatpass) => {
    if (this.state.newPassword !== repeatpass) {
      return 'Password does not match';
    }
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
Passwordeditor.propTypes = {
  edit: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  caption: PropTypes.string,
  handler: PropTypes.func.isRequired,
};
