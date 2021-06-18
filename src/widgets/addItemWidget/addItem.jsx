import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import UXForm from '../../components/UX-Form/UXForm';
import UXLoader from '../../components/UX-Loader/UXLoader';
import './addItem.scss';
import data from './addItemMock.json';
const configData = data;

const AddItem = (props) => {
    const [isLoading, setLoader] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (itemData, submitType) => {
        setLoader(true);
        if (submitType === 'add') {
            addNewProduct(itemData);
        } else {
            updateProduct(itemData);
        }
    }
    const addNewProduct = (payload) => {
        axios.post('https://fakestoreapi.com/products', payload).then(res => {
            handleSuccess();
        }).catch(err => {
            handleErr(err);
        }).finally(() => {
            setLoader(false);
        })
    }
    const updateProduct = (payload) => {
        axios.put(`https://fakestoreapi.com/products/${props.iteminfo.id}`, payload).then(res => {
            handleSuccess();
        }).catch(err => {
            handleErr(err);
        }).finally(() => {
            setLoader(false);
        })
    }
    const handleSuccess = () => {
        setSuccessMsg('Operation Successful');
        setTimeout(() => {
            setSuccessMsg(null);
            props.onHide();
        }, 2000);
    }
    const handleErr = (err) => {
        setError(err.message);
        setTimeout(() => {
            setError(null);
        }, 2000);
    }
    const resetFormData = () => {
        props.onCancel();
    }
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add new item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='progressAction'>
                        {
                            isLoading ? <UXLoader />
                                : successMsg ? <p id='successMsg'>{successMsg}</p>
                                    : error ? <p id='errMsg'>{error}</p>
                                        : null
                        }
                    </div>
                    <UXForm
                        id='addItemForm'
                        formHeading='Please enter all the bellow details'
                        inputArray={configData.addItemInputArray}
                        controlArray={configData.controlArray}
                        preFilledData={props.iteminfo && props.iteminfo}
                        onSubmit={(formData) => handleSubmit(formData, props.mode)}
                        onCancel={() => resetFormData()}
                    >
                    </UXForm>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default React.memo(AddItem);