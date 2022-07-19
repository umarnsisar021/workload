import React, { useState, useRef,useEffect  } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import CustomDataTable from '../../../@gull/components/CustomDataTable';
import {dbToDisplayDateFormat,displayToDBDateFormat} from '../../../@gull/@utils';
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { Dropdown,Row,Col } from "react-bootstrap";

const RecordList = (props) => {
    const customTableRef = useRef();
    const { sub_title, title, getPermission } = props;
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const { register, getValues,reset } = useForm();

    //Get Permission from array
    const viewFound = getPermission.find(element => element == 'view');
    const createFound = getPermission.find(element => element == 'create');
    const editFound = getPermission.find(element => element == 'update');
    const deleteFound = getPermission.find(element => element == 'delete');
    //Get Permission from array

    const handleFilter=()=>{

        let values=  getValues()
        
        values.from_date = displayToDBDateFormat(fromDate);
        values.to_date = displayToDBDateFormat(toDate);
        customTableRef.current.searchFetchData(values);
    }



    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleFilter();
        }
    }
    
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
    }, []);

    const columns = [
        {
            name: <div>
               <Row className="form-group ">
                    <Col sm={12} className="mt-2 mb-2 text-center">Date</Col>
                    <Col sm={12}>
                        <DatePicker  placeholderText="From Date"
                        className="form-control"
                        dateFormat="dd/MM/yyyy" selected={fromDate} onChange={(date) => setFromDate(date)} />
                        </Col>
                    <Col sm={12} className="mt-1">
                    <DatePicker  placeholderText="To Date"
                        className="form-control"
                        dateFormat="dd/MM/yyyy" selected={toDate} onChange={(date) => setToDate(date)} />
                    </Col>
                </Row>
            </div>,
            width:'140px',
            selector: 'invoice_date',
            center: true,
            
            cell:row =>
            (row.action=="footer") ?
            '':
            (dbToDisplayDateFormat(row.invoice_date))
        },

        {
            selector: 'chalan_no',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Challan #</Col>
                 <Col sm={12} ><input type="text"  className="form-control" {...register("chalan_no")} /></Col>
             </Row>
            </div>,
            width: '140px',
            left: true,
            cell: row => 
            (row.action=="footer") ?
            '':
            <InertiaLink href={route('doubling.inwards.edit', row.id)} className="" >
                {row.chalan_no}
            </InertiaLink>

        },
        {
            selector: 'brand_name',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Brand</Col>
                 <Col sm={12} ><input type="text"  className="form-control" {...register("brand_name")} /></Col>
             </Row>
            </div>,
            width: '140px',
            left: true,
            
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="btn-group">
                {row.brand_name}
            </div>
        },

        {
            selector: 'count_name',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Count</Col>
                 <Col sm={12} ><input type="text"  className="form-control" {...register("count_name")} /></Col>
             </Row>
            </div>,
            width: '140px',
            left: true,
            
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="btn-group">
                {row.count_name}
            </div>
        },

        {
            selector: 'customer_name',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Customer Name</Col>
                 <Col sm={12} ><input type="text"  className="form-control" {...register("customer_name")} /></Col>
             </Row>
            </div>,
            width: '140px',
            left: true,
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="btn-group">
                {row.customer_name}
            </div>
        },
        {
            selector: 'qty',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Qty (Lbs)</Col>
                 <Col sm={12} ><input type="text"  className="form-control" {...register("qty")} /></Col>
             </Row>
            </div>,
            width: '140px',
            right: true,
            cell: row => 
            (row.action=="footer") ?
            <b>{row.total_qty}</b>:
            <div className="btn-group">
                {row.qty}
            </div>
        },
        {
            selector: 'vehicle_no',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Veh #</Col>
                 <Col sm={12} ><input type="text"  className="form-control" {...register("vehicle_no")} /></Col>
             </Row>
            </div>,
            width: '140px',
            left: true,
            
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="btn-group">
                {row.vehicle_no}
            </div>
        },

        {
            selector: 'broker_name',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Broker</Col>
                 <Col sm={12} ><input type="text"  className="form-control" {...register("broker_name")} /></Col>
             </Row>
            </div>,
            width: '140px',
            left: true,
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="btn-group">
                {row.broker_name}
            </div>

        },


        {
            selector: 'remarks',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Remarks</Col>
                 <Col sm={12} ><input type="text"  className="form-control" {...register("remarks")} /></Col>
             </Row>
            </div>,
            width: '140px',
            left: true,
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="btn-group">
                {row.remarks}
            </div>

        },

        {
            selector: 'po_no',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">PO #</Col>
                 <Col sm={12} ><input type="text"  className="form-control" {...register("po_no")} /></Col>
             </Row>
            </div>,
            width: '140px',
            left: true,
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="btn-group">
                {row.po_no}
            </div>

        },
        {
            selector: 'action',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Action</Col>
             </Row>
            </div>,
             width:'180px',
            center: true,
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="btn-group" >
                <Dropdown>
                    <DropdownToggle variant="btn" disabled={(editFound || deleteFound) ? false : true} className='btn btn-outline-primary btn-sm'>
                        <i className="fas fa-cog"></i>
                    </DropdownToggle>
                    {(row.deleted_at == null) &&
                        <DropdownMenu>
                            {editFound &&
                                <InertiaLink href={route('doubling.inwards.edit', row.id)} className="dropdown-item cursor-pointer" as="button">
                                    <i className="fa fa-edit"></i> Edit
                                </InertiaLink>
                            }
                        {deleteFound &&
                            <React.Fragment>
                                <div className="dropdown-divider"></div>
                                <a href="#" onClick={() => customTableRef.current.multiDelete(row.id)} className="dropdown-item cursor-pointer">
                                    <i className="fa fa-trash"></i> Delete
                                </a>
                            </React.Fragment>
                            }
                        </DropdownMenu>
                    }

                    {(row.deleted_at != null) &&
                        <DropdownMenu>
                            <a href="#" onClick={() => customTableRef.current.multiRestore(row.id)} className="dropdown-item cursor-pointer">
                                <i className="fas fa-trash-restore"></i> Restore
                            </a>
                            <a href="#" onClick={() => customTableRef.current.multiPurge(row.id)} className="dropdown-item cursor-pointer">
                                <i className="fas fa-trash"></i> Purge
                            </a>
                        </DropdownMenu>
                        
                    }
                </Dropdown>
            </div>,

        },
    ];




    return (
        <Layout3 title={title}>
            <div className="row mb-4">
                <div className="col-md-12 mb-4">
                    <div className="card text-left">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-md-8"><h4 className="card-title">
                                    <InertiaLink href={route('home')}>
                                        <span
                                            className="font-weight-bold"
                                            style={{ fontSize: "22px" }}
                                        >
                                            {title}{" "}
                                        </span>
                                    </InertiaLink>
                                    / {sub_title}
                                </h4>
                                </div>
                                {createFound &&
                                    <div className="col-md-4 text-right">
                                        <div className="btn-group dropleft">
                                            <div className="text-center mr-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary ladda-button example-button"
                                                    onClick={()=>handleFilter()}>
                                                    Filter
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary ml-2 ladda-button example-button"
                                                    onClick={()=>{
                                                        reset()
                                                        handleFilter()
                                                    }}>
                                                    Clear
                                                </button>
                                            </div>
                                            <Dropdown>
                                                <DropdownToggle variant="btn" className="btn btn-outline-primary dropdown-toggle">
                                                    Action
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <InertiaLink className="dropdown-item cursor-pointer" href={route('doubling.inwards.create')}>
                                                        Add
                                                    </InertiaLink>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                        <div className="card-body">
                            <CustomDataTable
                                columns={columns}
                                ref={customTableRef}
                                url='records_data'
                                routeName='doubling.inwards'
                            />

                        </div>
                    </div>
                </div>
            </div>
        </Layout3>
    );
};

export default RecordList;
