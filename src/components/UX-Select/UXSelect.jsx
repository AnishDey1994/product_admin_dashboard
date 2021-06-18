import React from 'react';
import PropTypes from 'prop-types';

const UXSelect = (props) => {
    return (
        <select
            id={props.id && props.id}
            name={props.name && props.name}
            value={props.value && props.value}
            className={`form-control ${props.class ? props.class : ''}`}
            onChange={(e) => props.onSelect(e)}
            disabled={props.disabled && props.disabled}
            multiple={props.multiple && props.multiple}
        >
            <option value=''> --- Select ---</option>
            {props.optionArray.length > 0 && props.optionArray.map((option, k) => (
                <option key={k} value={option.value}>{option.name}</option>
            ))}
        </select>
    );
};

UXSelect.prototype = {
    //ID require field
    id: PropTypes.isRequired,

    //Name require field
    name: PropTypes.string.isRequired,

    //object of array. First value should be filed name and second value should be input value
    optionArray: PropTypes.array.isRequired,

    //disable flag       
    disabled: PropTypes.bool,

    //function for select value 
    onSelect: PropTypes.func,

    //multiple flag
    multiple: PropTypes.bool
}
export default UXSelect;