import DataTable, { defaultThemes } from 'react-data-table-component';
import React, { useState, useEffect,useRef } from 'react';
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import axios from "axios";
import "./style.css";
import HorizontalScroll from 'react-scroll-horizontal'
import swal from '@sweetalert/with-react';

const { forwardRef, useImperativeHandle } = React;


const customStyles = {
    header: {
        style: {
            minHeight: '50px',           
        },
    },
    
    table:{
        style: {
            // overflowX: 'scroll !important',
        },
    },
    headRow: {
        style: {
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            borderTopColor: defaultThemes.default.divider.default,
            marginRight:'15px',
        },
    },
    headCells: {
        style: {
            borderRightStyle: 'solid',
            fontWeight: 'bold',
            fontSize: '12px',
            borderRightWidth: '1px',
            borderRightColor: defaultThemes.default.divider.default,
            // color: '#878484',
        },
    },
    rows:{
        style: {
            minHeight:'auto !important',
        },
    },
    cells: {
        style: {
            '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',            
                fontSize: '12px',
                borderRightColor: defaultThemes.default.divider.default,
                // minHeight: '50px',
                display: 'block',
                lineHeight: '20px',
                marginTop: '8px',
                marginBottom: '8px',
                minHeight:'auto !important',
                

            },
            ':first-of-type': {
                display: 'flex'
            }
        },
    },


};


const CustomDataTable = forwardRef(({ columns, url, routeName,Flinks ,specificSearch,subHeader=false}, ref) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { no_of_items_per_page, deleted } = usePage().props;



    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(no_of_items_per_page);
    const [filterSearch, setFilterSearch] = useState('');
    const pageOtion = { noRowsPerPage: true };
    const [tableSelectedRows, setTableSelectedRows] = useState('');


    const handleSelectRows = (rows) => {
        let ary = [];
        rows.map(function (row, index) {
            ary.push(row.id);
        });
        setTableSelectedRows(ary);
    }

    useImperativeHandle(ref, () => ({
        fetchData(page) {
            fetchData(page)
        }
        ,
         searchFetchData(filter_columns){
            const page=1, 
            size = perPage;
            setLoading(true);
            const response =  axios.get(
                route(routeName + '.' + url)
                , { params: { deleted: deleted, page: page, per_page: size, search: filterSearch,filter_columns:{...filter_columns}} }
            ).then((response) => {
                setData(response.data.data);
                setTotalRows(response.data.total);
                setLoading(false);
            })
         
        }
        ,
        multiDelete(id) {
            let ids = [];
            if (id == 0) {
                ids = tableSelectedRows;
            } else {
                ids.push(id)
            }
            swal({
                title: "Delete Confirmation!",
                text: "Are you sure to Delete this record?",
                icon: "error",
                buttons: true,
                dangerMode: true,
            })
                .then((willDo) => {
                    if (willDo) {
                        axios.post(
                            route(routeName + '.multi_delete', { ids: ids }));
                        fetchData(1);
                    }
                });
        }
        ,
        multiRestore(id) {
            let ids = [];
            if (id == 0) {
                ids = tableSelectedRows;
            } else {
                ids.push(id)
            }
            swal({
                title: "Restore Confirmation!",
                text: "Are you sure to Restore this record?",
                icon: "error",
                buttons: true,
                dangerMode: true,
            })
            .then((willDo) => {
                if (willDo) {
                    axios.post(
                    route(routeName + '.multi_restore', { ids: ids }));
                    fetchData(1);
                }
            });
        }

        ,
        multiPurge(id) {
            let ids = [];
            if (id == 0) {
                ids = tableSelectedRows;
            } else {
                ids.push(id)
            }
            swal({
                title: "Purge Confirmation!",
                text: "Are you sure to purge this record?",
                icon: "error",
                buttons: true,
                dangerMode: true,
            })
            .then((willDo) => {
                if (willDo) {
                    axios.post(
                    route(routeName + '.multi_purge', { ids: ids }));
                    fetchData(1);
                }
            });
        }
        
    }));




    const fetchData = async (page, size = perPage) => {
        setLoading(true);
        const response = await axios.get(
            route(routeName + '.' + url)
            , { params: { deleted: deleted, page: page, per_page: size, search: filterSearch,...specificSearch} }
        );
        setData(response.data.data);
        setTotalRows(response.data.total);
        setLoading(false);
    }

    useEffect(() => {
        fetchData(1);
    }, [filterSearch])

    const handleChangeSearch = (value) => {
        setFilterSearch(value);
    }

    const handleResetSearch = () => {
        let element = document.querySelector('#search')
        element.value=""
        setFilterSearch();

    }

    const handlePageChange = page => {
        fetchData(page);
        setCurrentPage(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        fetchData(page, newPerPage);
        setPerPage(newPerPage);
    };


    const FilterComponent = () => {
        return (<span className="clearable">
        <input id="search" type="text" placeholder="Search" aria-label="Search Input" className="form-control"
            onKeyPress={(ev) => {
                console.log(`Pressed keyCode ${ev.key}`);
                if (ev.key === 'Enter') {
                    handleChangeSearch(ev.target.value)
                    ev.preventDefault();
                }
            }}
        />
        <i className="clearable__clear" onClick={()=>handleResetSearch()}>&times;</i>
        </span>
        )
    }


    const scrollRef = useRef(null);
    const onWheel = (e) => {
//         window.onscroll = function () {
//             window.scrollTo(0,window.scrollY);
//             return true;
//    }
document.body.style.overflowY = "scroll";
        const container = scrollRef.current;
        const containerScrollPosition = scrollRef.current.scrollLeft;

        container.scrollTo({
            top: 0,
            left: containerScrollPosition + e.deltaY
        });
    }
  
        
    return (
        <div ref={scrollRef} className="responsivex" id="responsive"
        //onWheel={(e)=>onWheel(e)} 
         >
            <div>
                <DataTable 
                   customStyles={customStyles}
                    highlightOnHover={true}
                    striped={true}
                    noHeader={true}
                    subHeader={subHeader}
                    subHeaderComponent={FilterComponent()}
                    dense={true}
                    columns={columns}
                    data={data}
                    progressPending={loading}
                    paginationComponentOptions={pageOtion}
                    paginationTotalRows={totalRows}
                    paginationDefaultPage={currentPage}
                    paginationPerPage={(parseInt(perPage))}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    pagination
                    paginationServer
                    selectableRows
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                    persistTableHead={true}
                    onSelectedRowsChange={({ selectedRows }) => handleSelectRows(selectedRows)}
                />
            </div>
            <div>
          

           
                {deleted==0&&(
                <button className="btn btn-danger btn-icon m-1" type="button"
                style={{position:"absolute"}}
                ref={(el) => {
                    if (el) {
                      el.style.setProperty('margin-top', "-45px", 'important');
                    }
                  }}
                  onClick={() =>ref.current.multiDelete(0)}
                >
                    <span className="ul-btn__icon"><i className="fa fa-trash"></i></span>
                </button>
                )}

                {deleted==1&&(
                <button className="btn btn-danger btn-icon m-1" type="button"
                style={{position:"absolute"}}
                ref={(el) => {
                    if (el) {
                      el.style.setProperty('margin-top', "-45px", 'important');
                    }
                  }}
                  onClick={() =>ref.current.multiPurge(0)}
                >
                    <span className="ul-btn__icon"><i className="fa fa-trash"></i></span>
                </button>
                )}


                <InertiaLink href={route(routeName + '.trash_index')} className="pr-2">
                    View Trash Records
                </InertiaLink>
                |
                <InertiaLink href={route(routeName + '.index')} className="pl-2">
                    View Active Records
                </InertiaLink>

                {Flinks}

                <br />
                <br />
            </div>
        </div>
    )

});
export default CustomDataTable;
