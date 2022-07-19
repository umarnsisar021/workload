import React, { useState } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import { useForm } from "react-hook-form";
import route from 'ziggy-js';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import NumberFormat from "react-number-format";


export default function editRecord(props) {

    const { sub_title, title, record_data, customers, brands, counts, brokers } = props;
    const { register, getValues } = useForm();
    const { errors } = usePage().props

    const [customerID, setCustomerID] = useState(record_data.customer_id)
    const [brandID, setBrandID] = useState(record_data.brand_id)
    const [countID, setCountID] = useState(record_data.count_id)
    const [brokerID, setBrokerID] = useState(record_data.broker_id)
    const [invoiceDate, setInvoiceDate] = useState(new Date(record_data.invoice_date));


    const changeCustomer = (event) => {
        if (event) {
            setCustomerID(event.value)
        }else{
            setCustomerID('')
        }
    }

    const changeBrand = (event) => {
        if (event) {
            setBrandID(event.value)
        }else{
            setBrandID('')
        }
    }
    const changeCount = (event) => {
        if (event) {
            setCountID(event.value)
        }else{
            setCountID('')
        }
    }

    const changeBroker = (event) => {
        if (event) {
            setBrokerID(event.value)
        }else{
            setBrokerID('')
        }
    }


    function handleSubmit(event) {
        event.preventDefault();
        const values = getValues();
        values.customer_id = customerID;
        values.brand_id = brandID;
        values.count_id = countID;
        values.broker_id = brokerID;
        values.invoice_date = invoiceDate.getFullYear()+'-'+(invoiceDate.getMonth()+1)+'-'+invoiceDate.getDate();


        if(!values.qty){
            values.qty=record_data.qty;
        }

        if(!values.rate){
            values.rate=record_data.rate;
        }
        
        Inertia.post(route('commerce.sale_orders.update', record_data.id), values,
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
                                            <InertiaLink href={route('commerce.sale_orders.index')}>
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
                                            <label>A/G Sale #</label>
                                            <input defaultValue={record_data.ag_no}
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
                                            <label>Customer Name</label>
                                            <Select
                                                onChange={changeCustomer}
                                                isClearable
                                                isSearchable
                                                options={customers}
                                                value={customers.filter(({ value }) => value === customerID)}
                                                styles={{
                                                    control: base => ({
                                                      ...base,
                                                      height: 34,
                                                      minHeight: 34
                                                    })
                                                  }}
                                            />
                                            {errors.customer_id && <span className="text-danger">{errors.customer_id}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Broker Name</label>
                                            <Select
                                                onChange={changeBroker}
                                                isClearable
                                                isSearchable
                                                options={brokers}
                                                value={brokers.filter(({ value }) => value === brokerID)}
                                                styles={{
                                                    control: base => ({
                                                      ...base,
                                                      height: 34,
                                                      minHeight: 34
                                                    })
                                                  }}
                                            />
                                            {errors.broker_id && <span className="text-danger">{errors.broker_id}</span>}
                                        </div>
                                
                                        <div className="form-group mb-3">
                                            <label>Brand Name</label>
                                            <Select
                                                onChange={changeBrand}
                                                isClearable
                                                isSearchable
                                                options={brands}
                                                value={brands.filter(({ value }) => value === brandID)}
                                                styles={{
                                                    control: base => ({
                                                      ...base,
                                                      height: 34,
                                                      minHeight: 34
                                                    })
                                                  }}
                                            />
                                            {errors.brand_id && <span className="text-danger">{errors.brand_id}</span>}
                                        </div>
                            
                                     
                                
                                        <div className="form-group mb-3">
                                            <label>Count Name</label>
                                            <Select
                                                onChange={changeCount}
                                                isClearable
                                                isSearchable
                                                options={counts}
                                                value={counts.filter(({ value }) => value === countID)}
                                                styles={{
                                                    control: base => ({
                                                      ...base,
                                                      height: 34,
                                                      minHeight: 34
                                                    })
                                                  }}
                                            />
                                            {errors.count_id && <span className="text-danger">{errors.count_id}</span>}
                                        </div>
                                    </div>

                                    <div className="col-md-6 ">

                                  
                                    <div className="form-group mb-3">
                                            <label>Qty (Lbs)</label>
                                            <NumberFormat
                                                        {...register("qty")}
                                                        thousandSeparator={false}
                                                        prefix=""
                                                        className={errors.qty ? 'form-control is-invalid' : 'form-control'}
                                                        inputMode="numeric"
                                                        allowNegative={false}
                                                        thousandsGroupStyle="thousand"
                                                        defaultValue={record_data.qty}
                                                        type="text"
                                                    />
                                            {errors.qty && <span className="text-danger">{errors.qty}</span>}
                                        </div>
                              
                                        <div className="form-group mb-3">
                                            <label>Rate</label>
                                            <NumberFormat
                                                        {...register("rate")}
                                                        thousandSeparator={false}
                                                        prefix=""
                                                        className={errors.rate ? 'form-control is-invalid' : 'form-control'}
                                                        inputMode="numeric"
                                                        allowNegative={false}
                                                        thousandsGroupStyle="thousand"
                                                        defaultValue={record_data.rate}
                                                        type="text"
                                                    />
                                            {errors.rate && <span className="text-danger">{errors.rate}</span>}
                                        </div>
                              
                                        <div className="form-group mb-3">
                                            <label>Payment Term</label>
                                            <input defaultValue={record_data.payment_term}
                                                className={errors.payment_term ? 'form-control is-invalid' : 'form-control'}
                                                {...register("payment_term")}
                                            />
                                            {errors.payment_term && <span className="text-danger">{errors.payment_term}</span>}
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

