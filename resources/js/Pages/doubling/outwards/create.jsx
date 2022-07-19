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
    const { sub_title, title, customers, brands, counts, purchase_orders, units } = props;
    const { register, getValues,setValue,reset } = useForm();
    const { errors } = usePage().props

    const [customerID, setCustomerID] = useState()
    const [brandID, setBrandID] = useState()
    const [countID, setCountID] = useState()
    const [poNo, setPoNo] = useState()
    const [deliveryCustomerID, setDeliveryCustomerID] = useState()
    const [deliveryUnitID, setDeliveryUnitID] = useState()
    const [balanceTxt, setBalanceTxt] = useState()
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

    const changeDeliveryCustomer = (event) => {
        if (event) {
            setDeliveryCustomerID(event.value)
            setDeliveryUnitID(0)
        }else{
            setDeliveryCustomerID('')
        }
    }
    const changeDeliveryUnit = (event) => {
        if (event) {
            setDeliveryUnitID(event.value)
            setDeliveryCustomerID(0)
        }else{
            setDeliveryUnitID('')
        }
    }



    const changePoNo = (event) => {
        if (event) {
            setPoNo(event.value)
            axios
                .post(route('doubling.outwards.get_purchase_order'), { po_no: event.value })
                .then(res => {
                    setBrandID(res.data.record.brand_id)
                    setCountID(res.data.record.count_id)
                    setBalanceTxt(res.data.balance)
                });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const values = getValues();
        values.customer_id = customerID;
        values.brand_id = brandID;
        values.count_id = countID;
        values.delivery_customer_id = deliveryCustomerID;
        values.delivery_unit_id = deliveryUnitID;
        values.po_no = poNo;
        values.invoice_date = invoiceDate.getFullYear()+'-'+(invoiceDate.getMonth()+1)+'-'+invoiceDate.getDate();

        Inertia.post(route('doubling.outwards.store'), values, {
            onSuccess: response => {
                console.log(response)
                if(values._action==2){
                    window.location.reload(); 
                }
                reset()
                setCustomerID(0)
                setBrandID(0)
                setCountID(0)
                setBrokerID(0)
                setPoNo(0)
                setDeliveryCustomerID(0)
                setDeliveryUnitID(0)
                setBalanceTxt('')
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
                                            <InertiaLink href={route('doubling.outwards.index')}>
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
                                                <label>Count <span className="text-danger">{balanceTxt}</span></label>
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
                                            <label>Challan #</label>
                                            <input type="text"
                                                className={errors.chalan_no ? 'form-control is-invalid' : 'form-control'}
                                                {...register("chalan_no")}
                                            />
                                            {errors.chalan_no && <span className="text-danger">{errors.chalan_no}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Vehicle #</label>
                                            <input type="text"
                                                className={errors.vehicle_no ? 'form-control is-invalid' : 'form-control'}
                                                {...register("vehicle_no")}
                                            />
                                            {errors.vehicle_no && <span className="text-danger">{errors.vehicle_no}</span>}
                                        </div>
                                        
                                    </div>



                                    <div className="col-md-6 ">
                                        

                                        
                                        


                                        
                                        <div className="row">

                                        
                                            <label  className="mb-0 col-md-12 bold">Delivered To</label>

                                                <div className="form-group mb-3 col-md-5">
                                                    <label>Unit</label>
                                                    <Select
                                                        onChange={changeDeliveryUnit}
                                                        isClearable
                                                        isSearchable
                                                        options={units}
                                                        value={units.filter(({ value }) => value === deliveryUnitID)}
                                                        styles={{
                                                            control: base => ({
                                                            ...base,
                                                            height: 35,
                                                            minHeight: 35
                                                            })
                                                        }}
                                                    />
                                                    {errors.delivery_unit_id && <span className="text-danger">{errors.delivery_unit_id}</span>}
                                                </div>
                                                <div className="mt-4 mb-3 col-md-1"><label>OR</label></div>
                                                <div className="form-group mb-3 col-md-6">
                                                    <label>Customer</label>
                                                    <Select
                                                        onChange={changeDeliveryCustomer}
                                                        isClearable
                                                        isSearchable
                                                        options={customers}
                                                        value={customers.filter(({ value }) => value === deliveryCustomerID)}
                                                        styles={{
                                                            control: base => ({
                                                            ...base,
                                                            height: 35,
                                                            minHeight: 35
                                                            })
                                                        }}
                                                    />
                                                    {errors.delivery_customer_id && <span className="text-danger">{errors.delivery_customer_id}</span>}
                                                </div>
                                            </div>


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
                                            <label>Remarks</label>
                                            <textarea
                                                className={errors.remarks ? 'form-control is-invalid' : 'form-control'}
                                                {...register("remarks")}
                                            />
                                            {errors.remarks && <span className="text-danger">{errors.remarks}</span>}
                                        </div>



                                     
                                        <div className="form-group mb-3">
                                            <label for="create_weaving_inward">
                                                <input type="checkbox" onClick={(e)=>console.log(e.target.value)}
                                                // {...register("create_weaving_inward")} 
                                                id="create_weaving_inward"
                                                />
                                                <span> Create Weaving Inward</span><span className="checkmark"></span>
                                            </label>
                                        </div>


                                        <div className="form-group mb-3">
                                            <label for="create_unit_2_inward">
                                                <input type="checkbox" onClick={(e)=>console.log(e.target.value)}
                                                // {...register("create_unit_2_inward")} 
                                                id="create_unit_2_inward"
                                                />
                                                <span> Create Unit-2 Inward</span><span className="checkmark"></span>
                                            </label>
                                        </div>


                                        <div className="form-group mb-3">
                                            <label for="create_unit_3_inward">
                                                <input type="checkbox" onClick={(e)=>console.log(e.target.value)}
                                                // {...register("create_unit_3_inward")} 
                                                id="create_unit_3_inward"
                                                />
                                                <span> Create Unit-3 Inward</span><span className="checkmark"></span>
                                            </label>
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
