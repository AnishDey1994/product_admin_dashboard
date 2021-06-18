import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import {FaUserAlt} from 'react-icons/fa';
import UXTable from '../../components/UX-Table/UXTable';
import UXButton from '../../components/UX-Button/UXButton';
import UXLoader from '../../components/UX-Loader/UXLoader';
import AddItem from '../addItemWidget/addItem';
import logo from '../../assets/Images/ShopBridge.png';
import './adminDashboard.scss';
import data from './adminDashboardMock.json';
const mockData = data.productData;

const AdminDashboard = () => {
    const [modalshow, toogleModalShow] = useState(false);
    const [operationType, setOperationType] = useState(null);
    const [isLoading, setLoader] = useState(false);
    const [productData, setProductData] = useState(null);
    const [itemInfo, setItemInfo] = useState(null);
    const [fetchErr, setFetchErr] = useState(null);
    const [deleteStatus, setDelStatus] = useState(null);

    const getProductData = () => {
        setLoader(true);
        axios.get('https://fakestoreapi.com/products').then(res => {
            setProductData(res.data);
        }).catch(err => {
            setFetchErr(err.message);
        }).finally(() => {
            setLoader(false);
        })
    }
    const deleteProduct = (productID) => {
        axios.delete(`https://fakestoreapi.com/products/${productID}`).then(res => {
            setDelStatus('Successfully Deleted');
        }).catch(err => {
            setDelStatus('error!!' + err.message);
        }).finally(() => {
            setTimeout(() => {
                setDelStatus(null);
                getProductData();
            }, 2000)
        })
    }
    const hideConfirm = () => {
        setDelStatus(null);
    }
    const handleOpenModal = (type) => {
        setOperationType(type);
        toogleModalShow(true);
    }
    const handleEditItem = (itemData) => {
        setItemInfo({ ...itemData });
        handleOpenModal('edit');
    }
    const modalCancel = () => {
        setItemInfo(null);
        toogleModalShow(false);
    }
    const handleAddSuccess = () => {
        getProductData();
        modalCancel();
    }
    useEffect(() => {
        getProductData();
    }, []);
    return (
        <div className='mainWrapper'>
            <div className='headerWrapper'>
                <div className='logoSection'>
                    <img className='logoImg' src={logo} alt='logo'></img>
                </div>
                <div className='textSection'>
                    <p>Welcome, Admin &nbsp;&nbsp;<FaUserAlt /></p>
                </div>
            </div>

            <div className='itemManageWrapper'>
                <UXButton type='button' class='btn btn-primary' value='+ Add Item' onTap={() => handleOpenModal('add')}></UXButton>
            </div>
            <div className='tableWrapper'>
                {
                    isLoading ? <UXLoader /> :
                        productData ?
                            <UXTable
                                tableHeader={mockData.tableHeader}
                                tableBody={productData}
                                onEdit={(itemData) => handleEditItem(itemData)}
                                onDelete={(id) => deleteProduct(id)}
                            ></UXTable>
                            : fetchErr ? <p>{fetchErr}</p>
                                : <h3>Sorry, No record found</h3>
                }

            </div>

            <AddItem
                show={modalshow}
                mode={operationType}
                iteminfo={itemInfo}
                onHide={() => handleAddSuccess()}
                onCancel={() => modalCancel()}
            />

            <SweetAlert show={deleteStatus ? true : false} onConfirm={() => hideConfirm()}>
                {deleteStatus}
            </SweetAlert>
        </div>
    );
};

export default AdminDashboard;