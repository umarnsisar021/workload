import React, { useState } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import { useForm } from "react-hook-form";
import route from 'ziggy-js';
import { toast } from 'react-toastify';
import Select from 'react-select';
import axios from "axios";
import DatePicker from "react-datepicker";
import NumberFormat from "react-number-format";


export default function createRecord(props) {
    const { sub_title, title, brokers, brands, counts, purchase_orders } = props;
    const { register, getValues,setValue,reset} = useForm();
    const { errors } = usePage().props

    const [brandID, setBrandID] = useState()
    const [countID, setCountID] = useState()
    const [brokerID, setBrokerID] = useState()
    const [agNo, setAgNo] = useState()
    const [qty, setQty] = useState(0)
    const [rate, setRate] = useState(0)
    const [amount, setAmount] = useState(0)
    const [invoiceDate, setInvoiceDate] = useState(new Date());

    
    const changeBrand = (event) => {
        if (event) {
            setBrandID(event.value)
        }
    }

    const changeCount = (event) => {
        if (event) {
            setCountID(event.value)
        }
    }

    const changeBroker = (event) => {
        if (event) {
            setBrokerID(event.value)
        }
    }
   

    const changeAgNo = (event) => {
        if (event) {
            setAgNo(event.value)
            axios
                .post(route('doubling.broker_payments.get_purchase_order'), { ag_no: event.value })
                .then(res => {
                    console.log(res.data)
                    setBrandID(res.data.brand_id)
                    setCountID(res.data.count_id)
                    setBrokerID(res.data.broker_id)
                    setQty(res.data.qty)
                    setRate(res.data.rate)
                    setAmount(res.data.qty*res.data.rate);
                });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const values = getValues();
        values.brand_id = brandID;
        values.count_id = countID;
        values.broker_id = brokerID;
        values.ag_no = agNo;
        values.invoice_date = invoiceDate.getFullYear()+'-'+(invoiceDate.getMonth()+1)+'-'+invoiceDate.getDate();
        values.rate = rate;
        values.qty = qty;
        values.amount = amount;

        Inertia.post(route('doubling.broker_payments.store'), values, {
            onSuccess: response => {
                console.log(response)
                if(values._action==2){
                    window.location.reload(); 
                }
                reset()

                setBrandID(0)
                setCountID(0)
                setBrokerID(0)
                setQty(0)
                setRate(0)
                setAmount(0)
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

    }



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
                                            <InertiaLink href={route('doubling.broker_payments.index')}>
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
                                                selected={invoiceDate} onChange={(date) => setInvoiceDate(date)} 
                                                {...register("invoice_date")}
                                                />
                                                </div>

                                            {errors.invoice_date && <span className="text-danger">{errors.invoice_date}</span>}
                                        </div>



                                        <div className="form-group mb-3">
                                            <label>Purchase A/G #</label>
                                            <Select
                                                onChange={changeAgNo}
                                                isClearable={true}
                                                isSearchable
                                                options={purchase_orders}
                                                defaultValue={agNo}
                                                styles={{
                                                    control: base => ({
                                                      ...base,
                                                      height: 34,
                                                      minHeight: 34
                                                    })
                                                  }}
                                            />
                                            {errors.ag_no && <span className="text-danger">{errors.ag_no}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <div className="form-group">
                                                <label>Broker</label>
                                                <Select
                                                    onChange={changeBroker}
                                                    isClearable
                                                    isSearchable
                                                    name="broker_id"
                                                    options={brokers}
                                                    value={brokers.filter(({ value }) => value === brokerID)}
                                                    styles={{
                                                        control: base => ({
                                                          ...base,
                                                          height: 35,
                                                          minHeight: 35
                                                        })
                                                      }}
                                                />
                                                {errors.broker_id && <span className="text-danger">{errors.broker_id}</span>}
                                            </div>
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Brand</label>
                                            <Select
                                                onChange={changeBrand}
                                                isClearable
                                                isSearchable
                                                name="brand_id"
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
                                            <div className="form-group">
                                                <label>Count</label>
                                                {console.log(counts)}
                                                <Select
                                                    onChange={changeCount}
                                                    isClearable
                                                    isSearchable
                                                    name="count_id"
                                                    options={counts}
                                                    value={counts.filter(({ value }) => value === countID)}
                                                    styles={{
                                                        control: base => ({
                                                          ...base,
                                                          height: 35,
                                                          minHeight: 35
                                                        })
                                                      }}
                                                />
                                                {errors.count_id && <span className="text-danger">{errors.count_id}</span>}
                                            </div>
                                        </div>


                                        
                                    </div>



                                    <div className="col-md-6 ">


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
                                                    value={rate}
                                                    type="text"
                                                    onInput={(event) =>{
                                                        setRate(event.target.value)
                                                        setAmount(event.target.value*qty)
                                                    }}
                                                />
                                            {errors.rate && <span className="text-danger">{errors.rate}</span>}
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Qty</label>
                                          
                                             <NumberFormat
                                                        {...register("qty")}
                                                        thousandSeparator={false}
                                                        prefix=""
                                                        className={errors.qty ? 'form-control is-invalid' : 'form-control'}
                                                        inputMode="numeric"
                                                        allowNegative={false}
                                                        thousandsGroupStyle="thousand"
                                                        value={qty} 
                                                        onInput={(event) =>{
                                                            setQty(event.target.value)
                                                            setAmount(event.target.value*rate)
                                                        } }
                                                        type="text"
                                                    />
                                            {errors.qty && <span className="text-danger">{errors.qty}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Payment Amount</label>
                                            <input type="number" value={amount} readOnly
                                                className={errors.amount ? 'form-control is-invalid' : 'form-control'}
                                                {...register("amount")}
                                            />
                                            {errors.amount && <span className="text-danger">{errors.amount}</span>}
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

