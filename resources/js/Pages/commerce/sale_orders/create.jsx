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


export default function createRecord(props) {
    const { sub_title, title, customers, brands, counts, brokers } = props;
    const { register, getValues,setValue,reset } = useForm();
    const { errors } = usePage().props
    const [customerID, setCustomerID] = useState()
    const [brandID, setBrandID] = useState()
    const [countID, setCountID] = useState()
    const [brokerID, setBrokerID] = useState()
    const [invoiceDate, setInvoiceDate] = useState(new Date());

    

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

        Inertia.post(route('commerce.sale_orders.store'), values,
            {
                onSuccess: response => {
                    if(values._action==2){
                        window.location.reload(); 
                    }
                    reset()
                    setCustomerID(0)
                    setBrandID(0)
                    setCountID(0)
                    setBrokerID(0)
                    
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
                                            type="submit" value="1" onClick={()=>setValue('_action',1)}
                                            className="btn btn-primary ladda-button example-button"
                                            id="form-submit">
                                            Save
                                        </button>
                                        <button
                                            type="submit"  value="2" onClick={()=>setValue('_action',2)}
                                            className="btn btn-secondary ml-2 ladda-button example-button"
                                            id="form-submit">
                                            Save & Create
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 ">
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
                                                        type="text"
                                                    />
                                            {errors.rate && <span className="text-danger">{errors.rate}</span>}
                                        </div>
                                 
                                        <div className="form-group mb-3">
                                            <label>Payment Term</label>
                                            <input
                                                className={errors.payment_term ? 'form-control is-invalid' : 'form-control'}
                                                {...register("payment_term")}
                                            />
                                            {errors.payment_term && <span className="text-danger">{errors.payment_term}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Remarks</label>
                                            <textarea
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
        </Layout3>
    );
};

