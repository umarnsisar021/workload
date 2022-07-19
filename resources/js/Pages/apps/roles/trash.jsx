import React,{ useState, useEffect } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { Dropdown } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { InertiaLink,usePage } from "@inertiajs/inertia-react";
import DataTable, { defaultThemes } from 'react-data-table-component';
import axios from "axios";
import route from "ziggy-js";
import swal from '@sweetalert/with-react';
import { Inertia } from '@inertiajs/inertia';

const customStyles = {
    header: {
        style: {
            minHeight: '50px',
        },
    },
    headRow: {
        style: {
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            borderTopColor: defaultThemes.default.divider.default,
        },
    },
    headCells: {
        style: {
            '&:not(:first-of-type)': {
                borderRightStyle: 'solid',
                fontWeight: 'bold',
            },
            fontSize: '14px',
            borderRightWidth: '1px',
            borderRightColor: defaultThemes.default.divider.default,
        },
    },
    cells: {
        style: {
            '&:not(:last-of-type)': {
                '&:not(:first-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                },
                fontSize: '13px',
                borderRightColor: defaultThemes.default.divider.default,
            },
        },
    },
};

const RolesTrash = (props) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const {sub_title,title,create_url}=props;
    const {base_url}=usePage().props;

    const fetchRecords = async (page, size = perPage) => {
        setLoading(true);

        const response = await axios.get(
            base_url+`/roles/get_trash?page=${page}&per_page=${size}&delay=1`
          );


        setData(response.data.data);
        setTotalRows(response.data.total);
        setLoading(false);
      };

      useEffect(() => {
        fetchRecords(1);
      }, []);


    const handlePageChange = page => {
        fetchRecords(page);
        setCurrentPage(page);
      };

      const handlePerRowsChange = async (newPerPage, page) => {
        fetchRecords(page, newPerPage);
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
                Inertia.post(route('roles.restore',id),formData);
                fetchRecords(1);
            }
          });
    }



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
            width: '20%',
            left: true,
        },
        {
            selector: 'description',
            name: 'Description',
            sortable: true,
            left: true,
        },
        {
            selector: 'action',
            name: 'Action',
            width: '10%',
            center: true,
            cell: row => <div className="btn-group">
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
                                        <InertiaLink href={route('roles.index')}>
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

                                <DataTable
                                    columns={columns}
                                    data={data}
                                    customStyles={customStyles}
                                    progressPending={loading}
                                    pagination
                                    paginationServer
                                    paginationTotalRows={totalRows}
                                    paginationDefaultPage={currentPage}
                                    onChangeRowsPerPage={handlePerRowsChange}
                                    onChangePage={handlePageChange}
                                    selectableRows
                                    onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
                                />

                            </div>
                            <div>
                                <InertiaLink href={route('roles.trashList')} className="pr-2">
                                    View Trash Records
                                </InertiaLink>
                                    |
                                <InertiaLink href={route('roles.index')} className="pl-2">
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

export default RolesTrash;
