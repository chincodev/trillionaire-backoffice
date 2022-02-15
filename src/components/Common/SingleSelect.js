import React from 'react'
import AsyncSelect  from 'react-select/async';
import _ from 'lodash';



class SingleSelect extends React.Component {
	constructor(props) {
		super(props);
		this.getOptions = _.debounce(this.getOptions.bind(this), 500);
	  }
	
	  handleChange = selectedOption => {
		  this.props.onChange(this.props.name, selectedOption);
	  };

	  handleBlur = () => {
	    this.props.onBlur(this.props.name, true);
		};
	
	  mapOptionsToValues = options => {
		return options
	  };
	
	  getOptions = (inputValue, callback) => {
		if (!inputValue && !this.props.fullLoad) {
		  return callback([]);
		}

		var endPointQuery=`?page=1&size=50&search_value=${inputValue}&search_fields[]=${this.props.searchField}&sort_field=${this.props.sortField ? this.props.sortField : 'name'}&sort_order=asc`

		if(this.props.extraQuery){
			endPointQuery += this.props.extraQuery;
		}

		if(this.props.extraFilter){
			endPointQuery += this.props.extraFilter;
		}

		this.props.endPoint(endPointQuery,inputValue).then(data => {
			const results = data.data;
			callback(this.mapOptionsToValues(results));
		 
		});
	  };
	
	  render() {
		const { defaultOptions, placeholder,  } = this.props;
		return (
			<div >
			
			{this.props.title?<label htmlFor="color">{this.props.title}</label>:""}
		    <AsyncSelect
				isMulti={this.props.isMulti}
		    	getOptionLabel={values => this.props.searchField ? values[this.props.searchField] : values.name}
		    	getOptionValue={values => this.props.slugOptionValue ? values.slug : values._id }
		    	cacheOptions={(this.props.extraQuery)?false:true}
		    	value={this.props.value}
		    	defaultOptions={defaultOptions}
		    	loadOptions={this.getOptions}
		    	onBlur={this.handleBlur}
		    	placeholder={this.props.placeholder}
		    	onChange={this.handleChange}
				placeholder={this.props.placeholder ? this.props.placeholder : 'Select...'}
		    />
			{this.props.smallMessage && (
			        <div style={{ marginTop: '.5rem' }}>{this.props.smallMessage}</div>
		        )}
		  {!!this.props.error && this.props.error.toLowerCase() && this.props.error.toLowerCase().includes(this.props.name.toLowerCase())  && (
			        <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
		        )}
		    </div>
		);
	  }
}

export { SingleSelect };