import React from 'react';
import './UXTextBox.scss';

const UXTextBox = (props) => {
    return (
        <input
            id={props.id && props.id}
            name={props.name && props.name}
            type={props.type && props.type}
            value={props.value && props.value}
            placeholder={props.placeHolder && props.placeHolder}
            className={`form-control ${props.class ? props.class : ''}`}
            onChange={(e) => props.onEnter(e)}
            disabled={props.disabled && props.disabled}
        >
        </input>
    );
};

export default UXTextBox;