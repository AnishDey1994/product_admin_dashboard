import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UXButton from '../UX-Button/UXButton';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './UXTable.scss';

const UXTable = props => {
    return (
        <div>
            <Table responsive bordered striped hover>
                <thead>
                    <tr className='toCenter'>
                        {
                            props.tableHeader.length > 0 && props.tableHeader.map((thItem, k) => (
                                <th key={k}>{thItem}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        props.tableBody.length > 0 && props.tableBody.map((trItem, k) => (
                            <tr key={k}>
                                <td id='tdImg' className='toMiddle'><img src={trItem.image} alt='img' className='thumbnail'></img></td>
                                <td id='tdTitle'>{trItem.title}</td>
                                <td id='tdDescription'>{trItem.description}</td>
                                <td id='tdPrice' className='toMiddle'>{trItem.price}</td>
                                <td className='toMiddle' id='tdAction'>
                                    <p>
                                        <FaEdit className='actionIcon toMiddle' onClick={() => props.onEdit(trItem)} />
                                        <UXButton type='button' class='btn btn-primary adminDashboardBtn2' onTap={() => props.onEdit(trItem)} value='Edit'></UXButton>
                                    </p>
                                    <p>
                                        <FaTrashAlt className='actionIcon' />
                                        <UXButton type='button' class='btn btn-danger adminDashboardBtn2' value='Delete' onTap={() => props.onDelete(trItem.id)}></UXButton>
                                    </p>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
};

UXTable.propTypes = {
    //list of heading, should be an array
    tableHeader: PropTypes.array.isRequired,

    //array of object. table data
    tableBody: PropTypes.array.isRequired,
};

export default UXTable;