import React from 'react';
import './UXButton.scss';
const UXButton = (props) => {
    return (
        <button
            id={props.id && props.id}
            type={props.type && props.type}
            className={`btn ${props.class ? props.class : ''}`}
            onClick={props.onTap && props.onTap}
            disabled={props.disabled && props.disabled}
        >
            {props.value && props.value}
        </button>
    );
};

export default UXButton;