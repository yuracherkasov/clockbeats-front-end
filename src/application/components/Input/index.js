import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';

class InputValidation extends Component {

	constructor(props) {
		super(props);

		this.state = {
			value: '',
			valid: false,
			errors: [],
			validators: [],
			showErrors: false,
			hiddenPassword: true,
		};
	}

	componentWillMount() {
		const {value, range, type, strict} = this.props;

		this.setState({
			value,
			validators: [...this._validatorHandler()],
		});

		if (strict && !Array.isArray(range)) {
			console.warn('You should provide "range" property on component.');
		}

		if (type === 'email' && Array.isArray(range)) {
			console.warn('Email already listed min and max range in regular expressions. You don\'t need explicitly specify range');
		}
	}

	componentWillReceiveProps(nextProps) {
		const {value: propsValue} = nextProps;
		const {value: stateValue} = this.state;

		if (!Object.is(propsValue, null) && propsValue !== stateValue) {
			const errors = this.validate(propsValue);
			const valid = !(errors.length > 0);

			this.setState({
				...this.state,
				value: propsValue,
				valid,
				errors
			}, () => console.log(propsValue !== stateValue, `propsValue: ${propsValue}`, `stateValue: ${stateValue}`));
		}
	}

	componentWillUpdate(nextProps, nextState) {

		const {reset: nextReset} = nextProps;
		const {handler, name, reset: prevReset} = this.props;
		const {value: prevValue} = this.state;
		const {value: nextValue, valid: nextValid} = nextState;

		if (prevReset !== nextReset) {
			this._resetField(nextReset);
		}

		if (prevValue !== nextValue) {
			handler({value: nextValue, valid: nextValid, name});
		}
	}

	validate(value) {
		const errors = [];
		const {validators} = this.state;

		validators.forEach(validator => {
			const error = validator(value);

			if (typeof error === 'string') {
				errors.push(error);
			}
		});

		return errors;
	}

	hints() {
		const {value, range, hintClasses, hintText} = this.props;
		const [min, max] = range;

		return <div className={hintClasses}>{value.length}/{max} {hintText}</div>
	}

	errors() {
		const {errors} = this.state;
		const {errorClasses} = this.props;

		if (errors.length > 0) {
			return (
				<ul className={`input-errors ${errorClasses}`}>
					{errors.map((error, index) => <li key={index} className="error-entity">{error}</li>)}
				</ul>
			);
		} else {
			return null;
		}
	};

	_validatorHandler() {
		const {validate, type, range, required} = this.props;
		const validators = [];

		if (required) {
			validators.push(this._requireValidate);
		}

		if (Array.isArray(range)) {
			validators.push(this._lengthValidate);
		}

		// If component should be validated
		// and `validate` is not custom validator
		if (validate && typeof validate !== 'function') {
			switch (type) {
				case 'tel':
					// TODO: create telephone validation
					validators.push(this._telValidate);
					break;

				case 'text':
					validators.push(this._textValidate);
					break;

				case 'email':
					validators.push(this._emailValidate);
					break;

				case 'password':
					validators.push(this._passwordValidate);
					break;

				default:
					break;
			}
		} else if (typeof validate === 'function') {
			validators.push(validate);
		}

		return validators;
	}

	_requireValidate = (value) => {
		if (!value) {
			return 'Field is required';
		}
	};

	_lengthValidate = (value) => {
		const [min, max] = this.props.range;

		if (value.length < min) {
			return `Must be at least ${min} characters`;
		}

		if (max && value.length > max) {
			return `Must be no more than ${max} characters`;
		}
	};

	_telValidate = (value) => {
		const valid = /^[0-9-]+$/.test(value);

		if (!valid && value) {
			return 'Can contain only numbers and character -';
		}
	}

	_textValidate = (value) => {
		const valid = /^[a-zA-Z0-9_-]+$/.test(value);

		if (!valid && value) {
			return 'Can contain letters, numbers and characters _-';
		}
	};

	_emailValidate = (value) => {
		const valid = isEmail(value);

		if (!valid && value) {
			return 'Please enter a valid e-mail';
		}
	};

	_passwordValidate = (value) => {
		const valid = /^([a-zA-Z0-9@_*#-]+)$/.test(value);

		if (!valid && value) {
			return 'Can contain letters, numbers and characters @_*#-';
		}
	};

	_checkStrict = (value) => {
		const {strict, range} = this.props;

		if (Array.isArray(range) && strict) {
			const [min, max] = range;

			return value.substring(0, max);
		}

		return value;
	};

	_onChange = (event) => {
		const value = this._checkStrict(event.target.value);
		const errors = this.validate(value);
		const valid = !(errors.length > 0);

		this.setState({
			...this.state,
			value,
			valid,
			errors
		});
	};

	_showErrors = (event) => {
		if (event.currentTarget.value) {
			this.setState({
				...this.state,
				showErrors: true,
			});
		}
	};

	_showPassword = () => {
		this.setState({
			...this.state,
			hiddenPassword: !this.state.hiddenPassword
		})
	};

	_resetField = (bool) => {
		if (bool) {
			this.setState({
				...this.state,
				value: '',
				valid: false,
			});
		}
	};


	// TODO: Popovers to show some inputs tips
	render() {
		const {
			value,
			showErrors,
			hiddenPassword
		} = this.state;

		const {
			type,
			name,
			label,
			strict,
			icon,
			placeholder,
			disabled,
			rootClasses,
			inputClasses,
		} = this.props;

		return (
			<div className={rootClasses}>
				{icon && 
				  <i className={icon} /> }
				{label &&
					<label htmlFor={`${name}_input`}>{label}</label>
				}

				<input
					id={`${name}_input`}
					type={hiddenPassword ? type : 'text'}
					name={name}
					value={value}
					disabled={disabled}
					placeholder={placeholder}
					onBlur={this._showErrors}
					onChange={this._onChange}
					className={inputClasses}
				/>

				{strict && this.hints()}
				{showErrors && this.errors()}
			</div>
		);
	}
}

InputValidation.propTypes = {
	type: PropTypes.string,
	icon: PropTypes.string,
	label: PropTypes.string,
	range: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.number),
		PropTypes.bool,
	]),
	value: PropTypes.string,
	reset: PropTypes.bool,
	strict: PropTypes.bool,
	handler: PropTypes.func.isRequired,
	validate: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.func
	]),
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	hintText: PropTypes.string,
	hintClasses: PropTypes.string,
	rootClasses: PropTypes.string,
	inputClasses: PropTypes.string,
	errorClasses: PropTypes.string,
};

InputValidation.defaultProps = {
	name: 'text',
	type: 'text',
	value: '',
	reset: false,
	range: false,
	strict: false,
	validate: true,
	hintText: null,
};

export default InputValidation;