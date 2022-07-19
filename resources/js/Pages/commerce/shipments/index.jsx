import React, { useState, useRef,useEffect } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { Dropdown,Col,Row } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import CustomDataTable from '../../../@gull/components/CustomDataTable';
import {dbToDisplayDateFormat,displayToDBDateFormat} from '../../../@gull/@utils';
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";


const RecordList = (props) => {
    const customTableRef = useRef();
    const { sub_title, title, getPermission } = props;
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [shipFromDate, setShipFromDate] = useState();
    const [shipToDate, setShipToDate] = useState();
    const { register, getValues ,reset} = useForm();

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

        values.ship_from_date = displayToDBDateFormat(shipFromDate);
        values.ship_to_date = displayToDBDateFormat(shipToDate);
        
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
                    <Col sm={12} className=" mt-1">
                    <DatePicker  placeholderText="To Date"
                        className="form-control" 
                        dateFormat="dd/MM/yyyy" selected={toDate} onChange={(date) => setToDate(date)} />
                    </Col>
                </Row>
            </div>,
            width:'140px',
            // sortable: true,
            selector: 'invoice_date',
            center: true,
            cell:row =>
            (row.action=="footer") ?
            '':
            (dbToDisplayDateFormat(row.invoice_date))
        },
        {
            selector: 'party_po_no',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Party P/O #</Col>
                 <Col sm={12}><input type="text" className="form-control"  {...register("party_po_no")}/></Col>
             </Row>
            </div>,
            center: true,
            width:'150px',
            cell: row => 
            (row.action=="footer") ?
            '':
            <InertiaLink href={route('commerce.shipments.edit', row.id)} className="" >
                {row.party_po_no}
            </InertiaLink>
        },


        {
            selector: 'po_no',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">P/O #</Col>
                 <Col sm={12}><input type="text" className="form-control" {...register("po_no")} /></Col>
             </Row>
            </div>,
            center: true,
            width:'150px',
            cell: row =>
            (row.action=="footer") ?
            '':
            <div className="btn-group">
                {row.po_no}
            </div>
        },

        {
            selector: 'customer_name',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Customer Name</Col>
                 <Col sm={12}><input type="text" className="form-control " {...register("customer_name")} /></Col>
             </Row>
            </div>,
            left: true,
            width:'170px',
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="btn-group">
                {row.customer_name}
            </div>

        },
        {
            selector: 'item_name',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Item</Col>
                 <Col sm={12}><input type="text" className="form-control "  {...register("item_name")} /></Col>
             </Row>
            </div>,
            left: true,
            width:'170px',
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="btn-group">
                {row.item_name}
            </div>
        },
        {
            selector: 'order_pcs',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Order Pcs</Col>
                 <Col sm={12}><input type="text" className="form-control " {...register("order_pcs")} /></Col>
             </Row>
            </div>,
            width:'120px',
            right: true,
            cell: row => 
            (row.action=="footer") ?
            <b>{row.total_order_pcs}</b>:
            <div className="btn-group">
                {row.order_pcs}
            </div>
        },

        {
            selector: 'pcs_b',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Pcs with B%</Col>
                 <Col sm={12}><input type="text" className="form-control " {...register("pcs_b")} /></Col>
             </Row>
            </div>,
            right: true,
            width:'120px',
            cell: row => 
            (row.action=="footer") ?
            <b className="text-center">{row.total_pcs_b}</b>:
            <div className="btn-group">
                {row.pcs_b}
            </div>
        },
        {
            selector: 'pile_name',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Pile</Col>
                 <Col sm={12}><input type="text" className="form-control " {...register("pile_name")} /></Col>
             </Row>
            </div>,
            left: true,
            width:'180px',
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="">
                <span>{row.pile_name}</span>
                <br />
                <span title="Qty">{row.qty_pile}</span>
            </div>
        },
        {
            selector: 'weft_name',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Weft</Col>
                 <Col sm={12}><input type="text" className="form-control " {...register("weft_name")} /></Col>
             </Row>
            </div>,
            left: true,
            width:'140px',
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="">
                <span>{row.weft_name}</span>
                <br />
                <span title="Qty">{row.qty_weft}</span>
            </div>
        },

        {
            selector: 'ground_name',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Ground</Col>
                 <Col sm={12}><input type="text" className="form-control " {...register("ground_name")} /></Col>
             </Row>
            </div>,
            left: true,
            width:'140px',
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="">
                <span>{row.ground_name}</span>
                <br />
                <span title="Qty">{row.qty_ground}</span>
            </div>
        },


        {
            selector: 'arrival_port',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Arrival Port</Col>
                 <Col sm={12}><input type="text" className="form-control " {...register("arrival_port")} /></Col>
             </Row>
            </div>,
            left: true,
            width:'120px',
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="btn-group">
                {row.arrival_port}
            </div>
        },
        {
            selector: 'ship_date',
            name: <div>
               <Row className="form-group ">
                    <Col sm={12} className="mt-2 mb-2 text-center">Ship Date</Col>
                    <Col sm={12}>
                        <DatePicker  placeholderText="From Date"
                        className="form-control"
                        dateFormat="dd/MM/yyyy" selected={shipFromDate} onChange={(date) => setShipFromDate(date)} />
                        </Col>
                    <Col sm={12} className=" mt-1">
                    <DatePicker  placeholderText="To Date"
                        className="form-control"
                        dateFormat="dd/MM/yyyy" selected={shipToDate} onChange={(date) => setShipToDate(date)} />
                    </Col>
                </Row>
            </div>,
            center: true,
            width:'140px',
            cell: row => 
            (row.action=="footer") ?
            '':
            <div className="btn-group">
                {dbToDisplayDateFormat(row.ship_date)}
            </div>
        },
        
        {
            selector: 'action',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Action</Col>
             </Row>
            </div>,
            minWidth:'150px',
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
                                <InertiaLink href={route('commerce.shipments.edit', row.id)} className="dropdown-item cursor-pointer" as="button">
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
                <div className="col-md-12 ">
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
                                                    <InertiaLink className="dropdown-item cursor-pointer" href={route('commerce.shipments.create')}>
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
                                routeName='commerce.shipments'
                            />

                        </div>
                    </div>
                </div>
            </div>
        </Layout3>
    );
};

export default RecordList;
