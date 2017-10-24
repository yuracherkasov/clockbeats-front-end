import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Select extends Component {

	constructor(props) {
		super(props);

		this.state = {
      value: '',
      showerror: false
		};
	}

	componentWillMount() {
		this.setState({
			value: this.props.value
		});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
      showerror: nextProps.value === '' ? true : false,
		});
	}

  // showError() {
	// 	const {errorClasses, errorText} = this.props;
	// 	if (this.state.showerror) {
	// 		return (
	// 			<div className={`input-errors ${errorClasses}`}>
	// 			  {errorText}
	// 			</div>
	// 		);
	// 	} else {
	// 		return null;
	// 	}
  // };

  _onChange = (e) => {
    const target = e.target;
    const valid = target.value !== '';
    this.props.handler({value: target.value, valid, name: target.name});
  }

	render() {
		const {
			value,
		} = this.state;

		const {
			name,
      label,
      icon,
      required,
      disabled,
			rootClasses,
      selectClasses,
      options,
    } = this.props;
    
    const opts = options.map((option, i) =>
      (<option key={i} value={option}>{option}</option>)
    );

		return (
			<div className={rootClasses}>
      {icon && 
				  <i className={icon} /> }
				{label &&
					<label htmlFor={`${name}_select`}>{label}</label>
				}
        <div className="select_custom">
          <i className="fa fa-angle-down" />
          <select
            id={`${name}_select`}
            name={name}
            value={value}
            disabled={disabled}
            onChange={this._onChange}
            className={selectClasses}>
            {opts}
          </select>
        </div>
        {/*required && this.showError()*/}
			</div>
		);
	}
}

Select.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	errorText: PropTypes.string,
	errorClasses: PropTypes.string,
	rootClasses: PropTypes.string,
  selectClasses: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
};

Select.defaultProps = {
	value: '',
};

export default Select;