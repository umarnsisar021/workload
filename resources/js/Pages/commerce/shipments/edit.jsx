import React, { useState } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import { useForm } from "react-hook-form";
import route from 'ziggy-js';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import NumberFormat from "react-number-format";
import Select from 'react-select';


export default function editRecord(props) {

    const { sub_title, title, record_data, customers, items_options , counts } = props;
    const { register, getValues,setValue } = useForm();
    const { errors } = usePage().props



    const [customerID, setCustomerID] = useState(record_data.customer_id)
    const [itemID, setItemID] = useState(record_data.item_id)
    const [countPileID, setCountPileID] = useState(record_data.count_id_pile)
    const [countWeftID, setCountWeftID] = useState(record_data.count_id_weft)
    const [countGroundID, setCountGroundID] = useState(record_data.count_id_ground)
    const [invoiceDate, setInvoiceDate] = useState(new Date(record_data.invoice_date));
    const [shipDate, setShipDate] = useState(new Date(record_data.ship_date));


    const changeCustomer = (value) => {
        setCustomerID(value)
    }

 
    const changeItem = (event) => {
        if (event) {
            setItemID(event.value)
        }
    }

    const changeCountPile = (value) => {
        setCountPileID(value)
    }
    const changeCountWeft = (value) => {
        setCountWeftID(value)
    }

    const changeCountGround = (value) => {
        setCountGroundID(value)
    }

 
    
    function handleSubmit(event) {
        event.preventDefault();
        const values = getValues();
        values.customer_id = customerID;
        values.item_id = itemID;
        values.count_id_pile = countPileID;
        values.count_id_weft = countWeftID;
        values.count_id_ground = countGroundID;
        values.invoice_date = invoiceDate.getFullYear()+'-'+(invoiceDate.getMonth()+1)+'-'+invoiceDate.getDate();
        values.ship_date = shipDate.getFullYear()+'-'+(shipDate.getMonth()+1)+'-'+shipDate.getDate();


        if(!values.qty_pile){
            values.qty_pile=record_data.qty_pile;
        }
        if(!values.qty_weft){
            values.qty_weft=record_data.qty_weft;
        }
        if(!values.qty_ground){
            values.qty_ground=record_data.qty_ground;
        }
        if(!values.order_pcs){
            values.order_pcs=record_data.order_pcs;
        }


        Inertia.post(route('commerce.shipments.update', record_data.id), values,
            {
                onSuccess: response => {
                    console.log(response)

                },
                onError: error => {
                    Object.keys(error).map(function (key, index) {
                        console.log(error[key])
                        toast.error(error[key][0], {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    });
                }
            });

    };

    return (
        <Layout3 title={title}>
            <form onSubmit={handleSubmit} method="post">
                <div className="row mb-0">
                    <div className="col-md-12 mb-4">
                        <div className="card text-left">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4 className="card-title">
                                            <InertiaLink href={route('commerce.shipments.index')}>
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
                                        <button
                                            type="submit"
                                            className="btn btn-primary ladda-button example-button"
                                            id="form-submit">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">

                                    <input
                                        {...register("_method")}
                                        type="hidden"
                                        defaultValue={'PUT'}
                                    />

                                    <div className="col-md-6 ">
                                        <div className="form-group mb-3">
                                            <label>ID</label>
                                            <input defaultValue={record_data.id}
                                                className="form-control" readOnly
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Date</label>
                                            <div className="customDatePickerWidth">
                                                <DatePicker 
                                                className={errors.invoice_date ? 'form-control is-invalid' : 'form-control'}
                                                dateFormat="dd/MM/yyyy"
                                                selected={invoiceDate} onChange={(date) => setInvoiceDate(date)} />
                                                </div>

                                            {errors.invoice_date && <span className="text-danger">{errors.invoice_date}</span>}
                                        </div>
                                   

                                        <div className="form-group mb-3">
                                            <label>Party P/O #</label>
                                            <input type="text" defaultValue={record_data.party_po_no}
                                                className={errors.party_po_no ? 'form-control is-invalid' : 'form-control'}
                                                {...register("party_po_no")}
                                            />
                                            {errors.party_po_no && <span className="text-danger">{errors.party_po_no}</span>}
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>P/O #</label>
                                            <input type="text" defaultValue={record_data.po_no}
                                                className={errors.po_no ? 'form-control is-invalid' : 'form-control'}
                                                {...register("po_no")}
                                            />
                                            {errors.po_no && <span className="text-danger">{errors.po_no}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Item</label>
                                            <Select
                                                onChange={changeItem}
                                                isClearable={true}
                                                isSearchable
                                                options={items_options}
                                                value={items_options.filter(({ value }) => value === itemID)}
                                                styles={{
                                                    control: base => ({
                                                      ...base,
                                                      height: 34,
                                                      minHeight: 34
                                                    })
                                                  }}
                                            />
                                            {errors.item_id && <span className="text-danger">{errors.item_id}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Customer</label>
                                            <select
                                                onChange={(event) => changeCustomer(event.target.value)}
                                                value={customerID}
                                                className="custom-select">
                                                <option values="0">-- None --</option>
                                                {customers.map(function (customer, i) {
                                                    return (<option value={customer.id} key={i}>{customer.first_name} {customer.last_name}</option>)
                                                })}
                                            </select>
                                            {errors.customer_id && <span className="text-danger">{errors.customer_id}</span>}
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Order Pcs</label>
                                            <NumberFormat
                                                        {...register("order_pcs")}
                                                        thousandSeparator={false}
                                                        prefix=""
                                                        className={errors.order_pcs ? 'form-control is-invalid' : 'form-control'}
                                                        inputMode="numeric"
                                                        allowNegative={false}
                                                        thousandsGroupStyle="thousand"
                                                        defaultValue={record_data.order_pcs}
                                                        type="text"
                                                    />
                                            {errors.order_pcs && <span className="text-danger">{errors.order_pcs}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Pcs With B%</label>
                                            <NumberFormat
                                                        {...register("pcs_b")}
                                                        thousandSeparator={false}
                                                        prefix=""
                                                        className={errors.pcs_b ? 'form-control is-invalid' : 'form-control'}
                                                        inputMode="numeric"
                                                        allowNegative={false}
                                                        thousandsGroupStyle="thousand"
                                                        defaultValue={record_data.pcs_b}
                                                        type="text"
                                            />
                                            {errors.pcs_b && <span className="text-danger">{errors.order_pcs}</span>}
                                        </div>



                                        
                                    </div>



                                    <div className="col-md-6 ">
                                        

                                        

                                        <div className="form-group mb-3">

                                            <div className="row">
                                                <div className="col-md-9 ">
                                                    <div className="form-group">
                                                        <label>Pile Yarn</label>
                                                        <select
                                                            onChange={(event) => changeCountPile(event.target.value)}
                                                            value={countPileID}
                                                            className="custom-select">
                                                            <option values="0">-- None --</option>
                                                            {counts.map(function (count, i) {
                                                                return (<option value={count.id} key={i}>{count.name}</option>)
                                                            })}
                                                        </select>
                                                        {errors.count_id_pile && <span className="text-danger">{errors.count_id_pile}</span>}
                                                    </div>
                                                </div>
                                                <div className="col-md-3 ">
                                                    <div className="form-group">
                                                        <label>Qty</label>
                                                        <NumberFormat
                                                            {...register("qty_pile")}
                                                            thousandSeparator={false}
                                                            prefix=""
                                                            className={errors.qty_pile ? 'form-control is-invalid' : 'form-control'}
                                                            inputMode="numeric"
                                                            allowNegative={false}
                                                            thousandsGroupStyle="thousand"
                                                            defaultValue={record_data.qty_pile}
                                                            type="text"
                                                        />
                                                        {errors.qty_pile && <span className="text-danger">{errors.qty_pile}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group mb-3">

                                            <div className="row">
                                                <div className="col-md-9 ">
                                                    <div className="form-group">
                                                        <label>Weft Yarn</label>
                                                        <select
                                                            onChange={(event) => changeCountWeft(event.target.value)}
                                                            value={countWeftID}
                                                            className="custom-select">
                                                            <option values="0">-- None --</option>
                                                            {counts.map(function (count, i) {
                                                                return (<option value={count.id} key={i}>{count.name}</option>)
                                                            })}
                                                        </select>
                                                        {errors.count_id_weft && <span className="text-danger">{errors.count_id_weft}</span>}
                                                    </div>
                                                </div>
                                                <div className="col-md-3 ">
                                                    <div className="form-group">
                                                        <label>Qty</label>
                                                        <NumberFormat
                                                            {...register("qty_weft")}
                                                            thousandSeparator={false}
                                                            prefix=""
                                                            className={errors.qty_weft ? 'form-control is-invalid' : 'form-control'}
                                                            inputMode="numeric"
                                                            allowNegative={false}
                                                            thousandsGroupStyle="thousand"
                                                            defaultValue={record_data.qty_weft}
                                                            type="text"
                                                        />
                                                        {errors.qty_weft && <span className="text-danger">{errors.qty_weft}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>




                                        <div className="form-group mb-3">

                                            <div className="row">
                                                <div className="col-md-9 ">
                                                    <div className="form-group">
                                                        <label>Ground Yarn</label>
                                                        <select
                                                            onChange={(event) => changeCountGround(event.target.value)}
                                                            value={countGroundID}
                                                            className="custom-select">
                                                            <option values="0">-- None --</option>
                                                            {counts.map(function (count, i) {
                                                                return (<option value={count.id} key={i}>{count.name}</option>)
                                                            })}
                                                        </select>
                                                        {errors.count_id_ground && <span className="text-danger">{errors.count_id_ground}</span>}
                                                    </div>
                                                </div>
                                                <div className="col-md-3 ">
                                                    <div className="form-group">
                                                        <label>Qty</label>
                                                        <NumberFormat
                                                            {...register("qty_ground")}
                                                            thousandSeparator={false}
                                                            prefix=""
                                                            className={errors.qty_ground ? 'form-control is-invalid' : 'form-control'}
                                                            inputMode="numeric"
                                                            allowNegative={false}
                                                            thousandsGroupStyle="thousand"
                                                            defaultValue={record_data.qty_ground}
                                                            type="text"
                                                        />
                                                        {errors.qty_ground && <span className="text-danger">{errors.qty_ground}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                        <div className="form-group mb-3">
                                            <label>Ship Date</label>
                                            <div className="customDatePickerWidth">
                                                <DatePicker 
                                                className={errors.ship_date ? 'form-control is-invalid' : 'form-control'}
                                                dateFormat="dd/MM/yyyy"
                                                selected={shipDate} onChange={(date) => setShipDate(date)} />
                                                </div>
                                            {errors.ship_date && <span className="text-danger">{errors.ship_date}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Arrival Port</label>
                                            <input defaultValue={record_data.arrival_port}
                                                className={errors.arrival_port ? 'form-control is-invalid' : 'form-control'}
                                                {...register("arrival_port")}
                                            />
                                            {errors.arrival_port && <span className="text-danger">{errors.arrival_port}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Remarks</label>
                                            <textarea defaultValue={record_data.remarks}
                                                className={errors.remarks ? 'form-control is-invalid' : 'form-control'}
                                                {...register("remarks")}
                                            />
                                            {errors.remarks && <span className="text-danger">{errors.remarks}</span>}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Layout3 >
    );
};

