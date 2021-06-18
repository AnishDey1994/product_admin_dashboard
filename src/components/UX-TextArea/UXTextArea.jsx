import React from 'react';
import './UXTextArea.scss';

const UXTextArea = (props) => {
    return (
        <textarea
            id={props.id && props.id}
            name={props.name && props.name}
            rows={props.rows} 
            cols={props.cols}
            value={props.value && props.value}
            placeholder={props.placeHolder && props.placeHolder}
            className={`form-control ${props.class ? props.class : ''}`}
            onChange={(e) => props.onEnter(e)}
            disabled={props.disabled && props.disabled}
        >
        </textarea>
    );
};

export default UXTextArea;