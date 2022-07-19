import React,{ useState, useEffect } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { Dropdown } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { InertiaLink,usePage } from "@inertiajs/inertia-react";
import axios from "axios";
import route from "ziggy-js";
import swal from '@sweetalert/with-react';
import { Inertia } from '@inertiajs/inertia';

import CustomDataTable from '../../../@gull/components/CustomDataTable';



const UserList = (props) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const {sub_title,title,create_url}=props;
    const {base_url}=usePage().props;

    const fetchUsers = async (page, size = perPage) => {
        setLoading(true);

        const response = await axios.get(
            base_url+`/users/get_trash?page=${page}&per_page=${size}&delay=1`
          );


        setData(response.data.data);
        setTotalRows(response.data.total);
        setLoading(false);
      };

      useEffect(() => {
        fetchUsers(1);
      }, []);


    const handlePageChange = page => {
        fetchUsers(page);
        setCurrentPage(page);
      };

      const handlePerRowsChange = async (newPerPage, page) => {
        fetchUsers(page, newPerPage);
        setPerPage(newPerPage);
      };

    const alertBox = (id) => {
        swal({
            title: "Restore Confirmation!",
            text: "Are you sure to RESTORE this record?",
            icon: "warning",
            buttons: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                const formData =new FormData();
                formData.append('_method','GET');
                Inertia.post(route('users.restore',id),formData);
                fetchUsers(1);
            }
          });
    }


    const pageOtion = { noRowsPerPage: true };

    const columns = [
        {
         name: '',
         selector: 'id',
         sortable: true,
         center: true,
         width:'50px',
        },
        {
         selector: 'first_name',
         name: 'User Info',
         sortable: true,
         left:true,
         cell: row => <div className="mt-3 mb-3">
                        <h6 className="font-weight-bold">{row.first_name} {row.last_name}</h6>
                        <div className="my-2"></div>
                        <a href={'mailto:'+row.email} ><span style={{paddingBottom:"22px"}}><i className="fa fa-envelope"></i> {row.email}</span></a>
                        <div className="my-2"></div>
                        <a href="#"><span><i className="fa fa-phone-alt"> </i> {row.mobile_no}</span></a>
                      </div>,
        },
        {
            selector: 'address',
            name: 'Address',
            sortable: true,
        },
        {
            selector: 'action',
            name: 'Action',
            sortable: true,
            center: true,
            width: '10%',
            cell: row =><div className="btn-group">
                            <Dropdown>
                                <DropdownToggle variant="btn" className="btn btn-outline-primary dropdown-toggle">
                                <i className=" fas fa-cog"></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <a href="#" onClick={() => alertBox(row.id)} className="dropdown-item cursor-pointer">
                                        <i className="fas fa-trash-restore"></i> Restore
                                    </a>
                                </DropdownMenu>
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
                                <div className="col-md-4 text-right">
                                    <div className="btn-group dropleft">
                                        <Dropdown>
                                            <DropdownToggle variant="btn" className="btn btn-outline-primary dropdown-toggle">
                                                Action
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <InertiaLink className="dropdown-item cursor-pointer" href={create_url}>
                                                    Add
                                                </InertiaLink>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">

                                <CustomDataTable
                                    columns={columns}
                                    data={data}
                                    progressPending={loading}
                                    paginationComponentOptions={pageOtion}
                                    paginationTotalRows={totalRows}
                                    paginationDefaultPage={currentPage}
                                    handlePageChange={handlePageChange}
                                    handlePerRowsChange ={handlePerRowsChange }
                                />

                            </div>
                            <div>
                                <InertiaLink href={route('users.trashList')} className="pr-2">
                                    View Trash Records
                                </InertiaLink>
                                    |
                                <InertiaLink href={route('users.index')} className="pl-2">
                                    View Active Records
                                </InertiaLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout3>
    );
};

export default UserList;
