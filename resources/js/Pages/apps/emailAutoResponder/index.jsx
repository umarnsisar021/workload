import React, { useRef } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { Dropdown } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { InertiaLink } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import swal from '@sweetalert/with-react';
import { Inertia } from '@inertiajs/inertia';
import CustomDataTable from '../../../@gull/components/CustomDataTable';


const EmailAutoResponder = (props) => {

    const { sub_title, title, getPermission } = props;
    const customTableRef = useRef();


    //Get Permission from array
    const viewFound = getPermission.find(element => element == 'view');
    const editFound = getPermission.find(element => element == 'update');
    //Get Permission from array


    const alertDelete = (id) => {
        swal({
            title: "Delete Confirmation!",
            text: "Are you sure to DELETE this record?",
            icon: "error",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const formData = new FormData();
                    formData.append('_method', 'DELETE');
                    Inertia.post(route('email_responder.destroy', id), formData);
                    customTableRef.current.fetchData(1);
                }
            });
    }


    const alertRestore = (id) => {
        swal({
            title: "Restore Confirmation!",
            text: "Are you sure to RESTORE this record?",
            icon: "warning",
            buttons: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const formData = new FormData();
                    formData.append('_method', 'GET');
                    Inertia.post(route('email_responder.restore', id), formData);
                    customTableRef.current.fetchData(1);
                }
            });
    }




    const columns = [
        {
            name: 'Responder Name',
            selector: 'responder_name',
            sortable: true,
            left:true,
            cell:row => <label className="font-weight-bold">{row.responder_name}</label>
        },
        {
            name: 'From Email',
            selector: 'from_email',
            sortable: true,
            left:true,
            cell:row => <span>
                            <a href={'mailto:'+row.from_email}>{row.from_email}</a>
                        </span>
        },
        {
            name: 'From Name',
            selector: 'from_name',
            sortable: true,
            left:true,
        },
        {
            name: 'Status',
            selector: 'status',
            center:true,
            cell: row =>row.status==1 ? <span onClick={() => alertStats(row.id,row.status)} className="badge badge-success p-2 m-1" style={{fontSize:'14px'}}>Active</span> : <span className="badge badge-danger p-2 m-1" style={{fontSize:'14px'}}>Inactive</span>,
        },
        {
            selector: '',
            name: 'Action',
            center: true,
            cell: row =><div className="btn-group">
                            <Dropdown>

                                <DropdownToggle variant="btn" disabled={editFound ? false : true} className="btn btn-outline-primary dropdown-toggle">
                                    <i className=" fas fa-cog"></i>
                                </DropdownToggle>

                                {(row.deleted_at == null) &&
                                    <DropdownMenu>
                                        <InertiaLink href={route('email_responder.edit',row.id)} className={editFound ? "dropdown-item cursor-pointer" : "dropdown-item cursor-pointer disabled"} as="button">
                                            <i className="fa fa-edit"></i> Edit
                                        </InertiaLink>

                                        <React.Fragment>
                                            <div className="dropdown-divider"></div>
                                            <a href="#" onClick={() => alertDelete(row.id)} className="dropdown-item cursor-pointer">
                                                <i className="fa fa-trash"></i> Delete
                                            </a>
                                        </React.Fragment>

                                    </DropdownMenu>
                                }

                                {(row.deleted_at != null) &&
                                    <DropdownMenu>
                                        <a href="#" onClick={() => alertRestore(row.id)} className="dropdown-item cursor-pointer">
                                            <i className="fas fa-trash-restore"></i> Restore
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
                                <div className="col-md-8">
                                    <h4 className="card-title">
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
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">

                                <CustomDataTable
                                    columns={columns}
                                    ref={customTableRef}
                                    url='records_data'
                                    routeName='email_responder'
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout3>
    );
};

export default EmailAutoResponder;
