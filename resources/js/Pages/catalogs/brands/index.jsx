import React, { useState, useRef, useEffect } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { Dropdown } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import route from "ziggy-js";

import CustomDataTable from '../../../@gull/components/CustomDataTable';


const RecordList = (props) => {
    let { sub_title, title, getPermission } = props;
    const customTableRef = useRef();

    //Get Permission from array
    const viewFound = getPermission.find(element => element == 'view');
    const createFound = getPermission.find(element => element == 'create');
    const editFound = getPermission.find(element => element == 'update');
    const deleteFound = getPermission.find(element => element == 'delete');
    //Get Permission from array




    const columns = [
        {
            name: '',
            selector: 'id',
            sortable: true,
            center: true,
            width: '60px',
        },
        {
            selector: 'name',
            name: 'Name',
            sortable: true,
            left: true,

            cell:row=>
            <InertiaLink href={route('catalogs.brands.edit', row.id)} className="" >
                 {row.name}
            </InertiaLink>
        },
        {
            selector: 'status',
            name: 'Status',
            sortable: true,
            width: '8%',
            cell: row =>
            (<span className={`badge badge-pill p-2 m-1 badge-outline-${row.status == 1?"primary":'danger'}`}>
              {(row.status == 1) ? 'Active' : 'In-Active'}</span>)
        },
        {
            selector: 'action',
            name: 'Action',
            width: '10%',
            center: true,
            cell: row => <div className="btn-group" >
                <Dropdown>
                    <DropdownToggle variant="btn" disabled={(editFound || deleteFound) ? false : true} className='btn btn-outline-primary btn-sm'>
                        <i className="fas fa-cog"></i>
                    </DropdownToggle>
                    {(row.deleted_at == null) &&
                        <DropdownMenu>
                            {editFound &&
                                <InertiaLink href={route('catalogs.brands.edit', row.id)} className="dropdown-item cursor-pointer" as="button">
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
                                            <Dropdown>
                                                <DropdownToggle variant="btn" className="btn btn-outline-primary dropdown-toggle">
                                                    Action
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <InertiaLink className="dropdown-item cursor-pointer" href={route('catalogs.brands.create')}>
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
                                routeName='catalogs.brands'
                                subHeader={true}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </Layout3>
    );
};

export default RecordList;
