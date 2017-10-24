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

  insertHandler = (data) => {
    this.setState({
      newPassword: data.value,
    })
  }

  repeatPasswordValidator = (repeatpass) => {
    if (this.state.newPassword !== repeatpass) {
			return 'Password does not match';
		}
  }

  _textValidate = (value) => {
		const valid = /^[a-zA-Z0-9_-]+$/.test(value);

		if (!valid && value) {
			return 'Can contain letters, numbers and characters _-';
		}
	};

  render() {
    const { type, name, value, handler, caption, edit } = this.props;
    const field = edit ?
      (<div className="passwds-group">
        <Input
          type={type}
          name={name}
          value={value}
          placeholder="Insert your new password"
          value={this.state.newPassword}
          rootClasses="editable-group clearfix"
          inputClasses="setting-control"
          errorClasses="setting-error"
          icon="fa fa-fw fa-pencil"
          handler={(data) => this.insertHandler(data)}
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
        </div>
        ) :
      (<div className="editable-text">**********</div>)
    return (
      <div className="textedit-group">
        <div className="setting-caption">{caption}</div>
        <div className="setting-description">
          {field}
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
