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
    const { sub_title, title, customers, brokers, brands, counts, purchase_orders } = props;
    const { register, getValues,setValue ,reset} = useForm();
    const { errors } = usePage().props


    const [customerID, setCustomerID] = useState()
    const [brandID, setBrandID] = useState()
    const [countID, setCountID] = useState()
    const [brokerID, setBrokerID] = useState()
    const [paymentStatus, setPaymentStatus] = useState()
    const [poNo, setPoNo] = useState()
    const [invoiceDate, setInvoiceDate] = useState(new Date());
    const [qty, setQty] = useState('')
    
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

    const changeQty = (event) => {
        if (event) {
            setQty(event.value)
        }
    }
  


    const changePoNo = (event) => {
        if (event) {
            setPoNo(event.value)
            axios
                .post(route('doubling.inwards.get_purchase_order'), { po_no: event.value })
                .then(res => {
                    console.log(res.data)
                    setBrandID(res.data.brand_id)
                    setCountID(res.data.count_id)
                    setBrokerID(res.data.broker_id)
                });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const values = getValues();
        values.customer_id = customerID;
        values.brand_id = brandID;
        values.count_id = countID;
        values.broker_id = brokerID;
        values.payment_status = paymentStatus;
        values.po_no = poNo;
        values.invoice_date = invoiceDate.getFullYear()+'-'+(invoiceDate.getMonth()+1)+'-'+invoiceDate.getDate();

        Inertia.post(route('doubling.inwards.store'), values, {
            onSuccess: response => {
                console.log(response)
                if(values._action==2){
                    window.location.reload(); 
                }
                reset()
                setPoNo(0)
                setCustomerID(0)
                setBrandID(0)
                setCountID(0)
                setBrokerID(0)
                setQty('')
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
                                            <InertiaLink href={route('doubling.inwards.index')}>
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
                                            <label>P/O #</label>
                                            <Select
                                                onChange={changePoNo}
                                                

                                                
                                                isClearable={true}
                                                isSearchable
                                                options={purchase_orders}
                                                defaultValue={poNo}
                                                value={purchase_orders.filter(({ value }) => value === poNo)}
                                                styles={{
                                                    control: base => ({
                                                      ...base,
                                                      height: 34,
                                                      minHeight: 34
                                                    })
                                                  }}
                                            />
                                            {errors.po_no && <span className="text-danger">{errors.po_no}</span>}
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
                                        <div className="form-group mb-3">
                                            <label>Customer </label>
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
                                            <label>Challan #</label>
                                            <input type="text"
                                                className={errors.chalan_no ? 'form-control is-invalid' : 'form-control'}
                                                {...register("chalan_no")}
                                            />
                                            {errors.chalan_no && <span className="text-danger">{errors.chalan_no}</span>}
                                        </div>


                                      


                                        
                                    </div>



                                    <div className="col-md-6 ">


                                    <div className="form-group mb-3">
                                        <label>Vehicle #</label>
                                        <input type="text"
                                            className={errors.vehicle_no ? 'form-control is-invalid' : 'form-control'}
                                            {...register("vehicle_no")}
                                        />
                                        {errors.vehicle_no && <span className="text-danger">{errors.vehicle_no}</span>}
                                    </div>
                                    
                                    <div className="form-group mb-3">
                                            <label>Qty</label>
                                            <NumberFormat
                                                        {...register("qty")}
                                                        onChange={changeQty}
                                                        value={qty}
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
                                            <label>Remarks</label>
                                            <textarea
                                                className={errors.remarks ? 'form-control is-invalid' : 'form-control'}
                                                {...register("remarks")}
                                            />
                                            {errors.remarks && <span className="text-danger">{errors.remarks}</span>}
                                        </div>
                                      



                                        

                                        <div className="form-group mb-3">
                                            <div className="form-group">
                                            <label>Payment</label>
                                            <div className="">
                                                <label className="radio radio-outline-success">
                                                    <input type="radio" name="payment_status"  value="0" defaultChecked {...register("payment_status")} /><span>None</span><span className="checkmark"></span>
                                                </label>
                                                <label className="radio radio-outline-success">
                                                    <input type="radio" name="payment_status"  value="1"  {...register("payment_status")} /><span>Paid</span><span className="checkmark"></span>
                                                </label>
                                            </div> 
                                            {errors.payment_status && <span payment_status="text-danger">{errors.status}</span>}
                                            </div>
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

