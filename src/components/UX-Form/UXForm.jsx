import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UXTextBox from '../UX-TextBox/UXTextBox';
import UXButton from '../UX-Button/UXButton';
import UXSelect from '../UX-Select/UXSelect';
import UXTextArea from '../UX-TextArea/UXTextArea';
import './UXForm.scss';

const UXForm = props => {
    const { inputArray, controlArray, formHeading, preFilledData } = props;
    const [formData, updateFormData] = useState({});

    useEffect(() => {
        setInitialData('new');
    }, []);
    const checkPreFilledData = (filledName) => {
        let preFilledValue = preFilledData && preFilledData[filledName.toString().toLowerCase()];
        if (preFilledValue) {
            return preFilledValue;
        } else {
            return '';
        }
    }
    const setInitialData = (mode) => {
        let initFormData = {};
        if (inputArray && inputArray.length > 0) {
            inputArray.forEach(inputArrayElement => {
                initFormData[inputArrayElement.name] = {
                    value: mode !== 'reset' ? checkPreFilledData(inputArrayElement.name) : '',
                    validationSchema: inputArrayElement.validation.schema,
                    errorMsg: []
                }
            })
        }
        updateFormData(initFormData);
    }
    const handleChange = (e, schema) => {
        updateFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: {
                value: e.target.value,
                validationSchema: schema,
                errorMsg: []
            }
        }))
    };
    const formReset = () => {
        setInitialData('reset');
        props.onCancel();
    };
    const handleFormSubmit = () => {
        if (validateForm(formData) === 0) {
            props.onSubmit(reStructureFormData(formData));
        }
    };
    const reStructureFormData = (formData) => {
        let newFormDataObj = {};
        Object.keys(formData).forEach(key => {
            newFormDataObj[key] = formData[key].value;
        });
        return newFormDataObj;
    }
    const validateForm = (form) => {
        let submittedData = form;
        let invalidCount = 0;
        Object.keys(submittedData).forEach(formElement => {
            submittedData[formElement].validationSchema.forEach(schema => {
                switch (schema) {
                    case 'required':
                        if (submittedData[formElement] && submittedData[formElement].value === '') {
                            submittedData[formElement].errorMsg.push('Please enter value');
                            invalidCount++;
                        }
                        break;
                    case 'isString':
                        if (typeof submittedData[formElement].value !== 'string') {
                            submittedData[formElement].errorMsg.push('Please string value');
                            invalidCount++;
                        }
                        break;
                    case 'isNumber':
                        let numberReg = /\d+(\.\d{1,2})?/;
                        if (!numberReg.test(submittedData[formElement].value)) {
                            submittedData[formElement].errorMsg.push('Please number value');
                            invalidCount++;
                        }
                        break;
                }
            })
        });
        updateFormData({ ...submittedData });
        return invalidCount;
    }

    return (
        <div className='card-wrapper boxShadow uxForm'>
            <div className='card-head bold c-mb-0'>
                <h5>{formHeading}</h5>
            </div>
            <div className='card-content'>
                <form>
                    {inputArray.length > 0 && inputArray.map((input, k) => (
                        <Row key={k} className='c-mb-2'>
                            {input.type === 'select' ?
                                <Col md={12} sm={12}>
                                    <UXSelect
                                        key={k}
                                        name={input.name}
                                        id={input.name + k}
                                        value={formData[input.name] ? formData[input.name].value : ''}
                                        optionArray={input.optionArray}
                                        onSelect={(e) => handleChange(e, input.validation.schema)}
                                    />
                                    {
                                        formData[input.name] && formData[input.name].errorMsg.length > 0 ?
                                            <span className='fDanger toLeft'>{formData[input.name].errorMsg[0]}</span>
                                            : null
                                    }
                                </Col>
                                :
                                input.type === 'textArea' ?
                                    <Col md={12} sm={12}>
                                        <UXTextArea
                                            key={k}
                                            name={input.name}
                                            rows={5}
                                            id={input.name + k}
                                            value={formData[input.name] ? formData[input.name].value : ''}
                                            placeHolder={input.placeHolder ? input.placeHolder : input.name}
                                            onEnter={(e) => handleChange(e, input.validation.schema)}
                                        />
                                        {
                                            formData[input.name] && formData[input.name].errorMsg.length > 0 ?
                                                <span className='fDanger toLeft'>{formData[input.name].errorMsg[0]}</span>
                                                : null
                                        }
                                    </Col>
                                    :
                                    <Col md={12} sm={12}>
                                        <UXTextBox
                                            key={k}
                                            name={input.name}
                                            type={input.type}
                                            id={input.name + k}
                                            value={input.type !== 'file' ? formData[input.name] ? formData[input.name].value : '' : ''}
                                            placeHolder={input.placeHolder ? input.placeHolder : input.name}
                                            onEnter={(e) => handleChange(e, input.validation.schema)}
                                        />
                                        {
                                            formData[input.name] && formData[input.name].errorMsg.length > 0 ?
                                                <span className='fDanger toLeft'>{formData[input.name].errorMsg[0]}</span>
                                                : null
                                        }
                                    </Col>

                            }
                        </Row>
                    ))}

                    <div className='c-mb-1 actionBlock'>
                        <div className='actionLeft'></div>
                        <div className='actionRight'>
                            {controlArray.length > 0 && controlArray.map((control, k) => (
                                control.type === 'button' || control.type === 'submit' ?
                                    <div key={k} className='btnBlock'>
                                        <UXButton
                                            key={k}
                                            class={`c-mb-1 btn adminDashboardBtn1 ${control.type === 'submit' ? 'btn-primary' : 'btn-danger'}`}
                                            type='button'
                                            value={control.name}
                                            onTap={
                                                control.type === 'submit' ?
                                                    () => handleFormSubmit() : () => formReset()
                                            }
                                        />
                                    </div>
                                    : null
                            ))}
                        </div>
                    </div>
                </form>
            </div>
        </div >
    );
};

UXForm.propTypes = {
    //String which will be set as form heading
    formHeading: PropTypes.string.isRequired,

    //array of object. First value should be filed name and second value should be input type
    inputArray: PropTypes.array.isRequired,

    //array of object. First value should be action name and second value should be action type       
    controlArray: PropTypes.array.isRequired,

    //function for submitting the form 
    onSubmit: PropTypes.func,

    //function for reseting the form 
    onCancel: PropTypes.func
};

export default UXForm;