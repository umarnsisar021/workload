import React, { useState, useEffect } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { Dropdown } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import DataTable, { defaultThemes } from 'react-data-table-component';
import axios from "axios";
import route from "ziggy-js";
import swal from '@sweetalert/with-react';
import { Inertia } from '@inertiajs/inertia';

import CustomDataTable from '../../../@gull/components/CustomDataTable';


export default function currencyTrash(props) {

    const { sub_title, title } = props;
    const { base_url, globalOpt } = usePage().props;


    const pageOtion = { noRowsPerPage: true };


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(globalOpt.no_of_items_per_page);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchUsers = async (page, size = perPage) => {
        setLoading(true);

        const response = await axios.get(
            base_url + `/currencies/currency_trash?page=${page}&per_page=${size}&delay=1`
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
                    const formData = new FormData();
                    formData.append('_method', 'GET');
                    Inertia.post(route('currencies.restore', id), formData);
                    fetchUsers(1);
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
            selector: 'code',
            name: 'Code',
            sortable: true,
        },
        {
            selector: 'symbol',
            name: 'Symbol',
            sortable: true,
        },
        {
            selector: 'exchange_rate',
            name: 'Exchange Rate',
            sortable: true,
        },
        {
            selector: 'action',
            name: 'Action',
            width: '10%',
            center: true,
            cell: row => <div className="btn-group">
                <Dropdown>
                    <DropdownToggle variant="btn" disabled={(editFound || deleteFound) ? false : true} className='btn btn-outline-primary btn-sm'>
                        <i className="fas fa-cog"></i>
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
                                    </h4></div>

                                <div className="col-md-4 text-right">
                                    <div className="btn-group dropleft">
                                        <Dropdown>
                                            <DropdownToggle variant="btn" className="btn btn-outline-primary dropdown-toggle">
                                                Action
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <InertiaLink className="dropdown-item cursor-pointer" href={route('currencies.create')}>
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
                                    handlePerRowsChange={handlePerRowsChange}
                                />

                                <div>
                                    <InertiaLink href={route('currencies.trashList')} className="pr-2">
                                        View Trash Records
                                    </InertiaLink>
                                    |
                                    <InertiaLink href={route('currencies.index')} className="pl-2">
                                        View Active Records
                                    </InertiaLink>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout3>
    );
};

