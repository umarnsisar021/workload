import React, { useState, useRef,useEffect  } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { Dropdown,Col,Row } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import swal from '@sweetalert/with-react';
import CustomDataTable from '../../../@gull/components/CustomDataTable';
import axios from "axios";
import {dbToDisplayDateFormat,displayToDBDateFormat} from '../../../@gull/@utils';
import DatePicker from "react-datepicker";
import { useForm,Controller } from "react-hook-form";

const RecordList = (props) => {
    const customTableRef = useRef();
    const { sub_title, title, getPermission,status } = props;
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const { register, getValues,reset } = useForm();
    //Get Permission from array
    const viewFound = getPermission.find(element => element == 'view');
    const createFound = getPermission.find(element => element == 'create');
    const editFound = getPermission.find(element => element == 'update');
    const deleteFound = getPermission.find(element => element == 'delete');
    //Get Permission from array


  const  updateStatus=(id,_status)=> {

        let msg='';
        let icon='error';
        if(_status==2){
            msg='Cancel'
            icon='error';
        }else{
            msg='Approve'
            icon='info';
        }

        swal({
            title: msg+" Confirmation!",
            text: "Are you sure to "+msg+" this record?",
            icon: icon,
            buttons: true,
            dangerMode: true,
        })
        .then((willDo) => {
            if (willDo) {
                axios.post(
                    route('commerce.purchase_orders.update_status', { id: id,status:_status }))
                    .then((willDo) => {
                        customTableRef.current.fetchData(1);
                    });
                  
            }
        });
    }


    
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
            cell: row => 
            (row.action=="footer") ?
            '':
            <InertiaLink href={route('commerce.purchase_orders.edit', row.id)} className="" >
                {(dbToDisplayDateFormat(row.invoice_date))}
            </InertiaLink>
            
        },
        {
            selector: 'po_no',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">(A/G #) P/O</Col>
                 <Col sm={12} ><input type="text" placeholder="AG" className="form-control" {...register("ag_no")} /></Col>
                 <Col sm={12} className="mt-1"><input type="text" placeholder="PO" className="form-control" {...register("po_no")} /></Col>
             </Row>
            </div>,
            width: '140px',
            left: true,
            cell: row => 
           (row.action=="footer") ?
            '':
            <div className="btn-group">
                    ({row.ag_no})
                    <br />
                    {row.po_no}
            </div>
        },
        {
            selector: 'supplier_name',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Supplier (Brand - Count)</Col>
                 <Col sm={12} ><input type="text" placeholder="Supplier" className="form-control" {...register("supplier_name")} /></Col>
                 <Col sm={6} className="mt-1"><input type="text" placeholder="Brand"  className="form-control" {...register("brand_name")} /></Col>
                 <Col sm={6} className="mt-1"><input type="text" placeholder="Count"  className="form-control" {...register("count_name")} /></Col>
             </Row>
            </div>,
            left: true,
            width: '240px',
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="btn-group">
                {row.supplier_name}
                <br />
                ({row.brand_name} - {row.count_name})
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
            width:'160px',
            left: true,
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="btn-group">
                {row.broker_name}
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
            width:'120px',
            left: true,
            cell: row => 
            (row.action=="footer") ?
            <b>{row.total_qty}</b>:
            <div className="btn-group">
                {row.qty}
            </div>
            
        },
        {
            selector: 'rate',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Rate / Lbs</Col>
                 <Col sm={12} ><input type="text"  className="form-control" {...register("rate")} /></Col>
             </Row>
            </div>,
            width:'120px',
            left: true,
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="btn-group">
                {row.rate}
            </div>
            
        },

        {
            selector: 'qty',
            name: 'Receivable Lbs',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Receivable Lbs</Col>
                 <Col sm={12} >
                    <input type="checkbox" onClick={(e)=>console.log(e.target.value)}
                     {...register("receivable_lbs")} 
                    />
                    <span> Only None Zero</span><span className="checkmark"></span>
                </Col>
             </Row>
            </div>,
            width:'140px',
            left: true,
            cell: row => 
            (row.action=="footer") ?
            <b>{row.grand_total_qty_balance}</b>:
            <div className="btn-group">
                {row.total_qty_balance}
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
                            <React.Fragment>
                                <InertiaLink href={route('commerce.purchase_orders.edit', row.id)} className="dropdown-item cursor-pointer" as="button">
                                    <i className="fa fa-edit"></i> Edit
                                </InertiaLink>
                                {row.status==1?
                                <a href="#" onClick={() => updateStatus(row.id,2)} className="dropdown-item cursor-pointer">
                                    <i className="fa fa-times"></i> Cancel
                                </a>
                                :
                                <a href="#" onClick={() => updateStatus(row.id,1)} className="dropdown-item cursor-pointer">
                                    <i className="fa fa-check"></i> Approve
                                </a>
                                }
                            </React.Fragment>
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
            </div>
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
                                                    <InertiaLink className="dropdown-item cursor-pointer" href={route('commerce.purchase_orders.create')}>
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
                                routeName='commerce.purchase_orders'
                                specificSearch={{status:status}}
                                Flinks={<span> | <InertiaLink href={route('commerce.purchase_orders.index',{status:2})} className="pl-2">Cancelled</InertiaLink></span>}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </Layout3>
    );
};

export default RecordList;
