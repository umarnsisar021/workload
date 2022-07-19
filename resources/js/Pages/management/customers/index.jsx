import React, { useState, useRef,useEffect  } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import CustomDataTable from '../../../@gull/components/CustomDataTable';
import { useForm } from "react-hook-form";
import { Dropdown,Row,Col } from "react-bootstrap";

const RecordList = (props) => {
    const customTableRef = useRef();
    const { sub_title, title, getPermission } = props;
    const { register, getValues ,reset} = useForm();
    //Get Permission from array
    const viewFound = getPermission.find(element => element == 'view');
    const createFound = getPermission.find(element => element == 'create');
    const editFound = getPermission.find(element => element == 'update');
    const deleteFound = getPermission.find(element => element == 'delete');
    //Get Permission from array



    const handleFilter=()=>{
        let values=  getValues()
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
            name: '',
            selector: 'id',
            sortable: true,
            center: true,
            width: '60px',
        },

        {
            selector: 'company_name',
            name: 'Company Name',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Company Name</Col>
                 <Col sm={12} ><input type="text"  className="form-control" {...register("company_name")} /></Col>
             </Row>
            </div>,
            left: true,
         
            cell: row => 
            <InertiaLink href={route('management.customers.edit', row.id)} className="" >
                {row.company_name}
            </InertiaLink>
        },

        {
            selector: 'status',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Status</Col>
             </Row>
            </div>,
            width: '150px',
            sortable: true,
            center:true,
            class:'text-center"',
            cell: row => 
            (<span className={`badge badge-pill p-2 m-1 badge-outline-${row.status == 1?"primary":'danger'}`}>
              {(row.status == 1) ? 'Active' : 'In-Active'}</span>)
        },
        {
            selector: 'action',
            name: <div>
            <Row className="form-group ">
             <Col sm={12} className="mt-2 mb-2 text-center">Action</Col>
                 
             </Row>
            </div>,
             width:'190px',
            center: true,
            cell: row => <div className="btn-group" >
                <Dropdown>
                    <DropdownToggle variant="btn" disabled={(editFound || deleteFound) ? false : true} className='btn btn-outline-primary btn-sm'>
                        <i className="fas fa-cog"></i>
                    </DropdownToggle>
                    {(row.deleted_at == null) &&
                        <DropdownMenu>
                            {editFound &&
                                <InertiaLink href={route('management.customers.edit', row.id)} className="dropdown-item cursor-pointer" as="button">
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
                                                    <InertiaLink className="dropdown-item cursor-pointer" href={route('management.customers.create')}>
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
                                routeName='management.customers'
                            />

                        </div>
                    </div>
                </div>
            </div>
        </Layout3>
    );
};

export default RecordList;
