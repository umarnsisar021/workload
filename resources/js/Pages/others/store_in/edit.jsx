import React, { useState } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import { useForm } from "react-hook-form";
import route from 'ziggy-js';
import { toast } from 'react-toastify';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import NumberFormat from "react-number-format";
import axios from "axios";


export default function editRecord(props) {

    const { sub_title, title, record_data, unit_departments,items } = props;
    const { register, getValues ,setValue} = useForm();
    const { errors } = usePage().props
    const [unitDepartmentID, setUnitDepartmentID] = useState(record_data.unit_department_id)
    const [qty, setQty] = useState(record_data.qty)
    const [rate, setRate] = useState(record_data.rate)
    const [invoiceDate, setInvoiceDate] = useState(new Date(record_data.invoice_date));
    const [itemsOptions, setItemsOptions] = useState(items)
    const [itemID, setItemID] = useState(record_data.item_id)

    const changeUnitDepartment = (event) => {
        if (event) {
            setUnitDepartmentID(event.value)
            axios
                .post(route('others.store_in.get_items_by_unit'), { department_id: event.value })
                .then(res => {
                    console.log(res.data)
                    setItemsOptions(res.data)
                });

        }else{
            setUnitDepartmentID('')
        }
    }

    const changeItem = (event) => {
        if (event) {
            setItemID(event.value)
        }else{
            setItemID('')
        }
    }


    


    function handleSubmit(event) {
        event.preventDefault();
        const values = getValues();
        values.unit_department_id = unitDepartmentID;
        values.item_id = itemID;
        values.invoice_date = invoiceDate.getFullYear()+'-'+(invoiceDate.getMonth()+1)+'-'+invoiceDate.getDate();

        if(!values.qty){
            values.qty=record_data.qty;
        }

        if(!values.rate){
            values.rate=record_data.rate;
        }
        Inertia.post(route('others.store_in.update', record_data.id), values,
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
                                            <InertiaLink href={route('others.store_in.index')}>
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
                                            <label>Department (Unit) </label>
                                            <Select
                                                onChange={changeUnitDepartment}
                                                isClearable
                                                isSearchable
                                                options={unit_departments}
                                                value={unit_departments.filter(({ value }) => value === unitDepartmentID)}
                                                styles={{
                                                    control: base => ({
                                                      ...base,
                                                      height: 34,
                                                      minHeight: 34
                                                    })
                                                  }}
                                            />
                                            {errors.unit_department_id && <span className="text-danger">{errors.unit_department_id}</span>}
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
                                            <label>P/O #</label>
                                            <input type="text" defaultValue={record_data.po_no}
                                                className={errors.po_no ? 'form-control is-invalid' : 'form-control'}
                                                {...register("po_no")}
                                            />
                                            {errors.po_no && <span className="text-danger">{errors.po_no}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Challan #</label>
                                            <input type="text" defaultValue={record_data.chalan_no}
                                                className={errors.chalan_no ? 'form-control is-invalid' : 'form-control'}
                                                {...register("chalan_no")}
                                            />
                                            {errors.chalan_no && <span className="text-danger">{errors.chalan_no}</span>}
                                        </div>


                                        

                                        <div className="form-group mb-3">
                                            <label>Item</label>
                                            <Select
                                                onChange={changeItem}
                                                isClearable
                                                isSearchable
                                                options={itemsOptions}
                                                value={itemsOptions.filter(({ value }) => value === itemID)}
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


                                        <div className="row">
                                            <div className="form-group mb-3 col-md-6">
                                                <label>Qty</label>
                                                 <NumberFormat
                                                    {...register("qty")}
                                                    thousandSeparator={false}
                                                    prefix=""
                                                    className={errors.qty ? 'form-control is-invalid' : 'form-control'}
                                                    inputMode="numeric"
                                                    allowNegative={false}
                                                    thousandsGroupStyle="thousand"
                                                    type="text"
                                                    value={qty}
                                                    onInput={(event) => setQty(event.target.value)}
                                                />
                                                {errors.qty && <span className="text-danger">{errors.qty}</span>}
                                            </div>


                                            <div className="form-group mb-3 col-md-6">
                                            <label  title="Unit of Measure">UOM </label>
                                                <select 
                                                    title="Unit of Measure"
                                                    // className='form-control'
                                                    className="custom-select"
                                                    {...register("unit")}>
                                                    {/* <option hidden values="">-- Select --</option> */}
                                                    <option value="Pcs" key={1}>Pcs</option>
                                                    <option value="Lbs" key={2}>Lbs</option>
                                                    <option value="Kgs" key={3}>Kgs</option>
                                                </select>
                                                {errors.unit && <span className="text-danger">{errors.unit}</span>}
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="form-group mb-3 col-md-6">
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
                                                    value={rate}
                                                    onInput={(event) => setRate(event.target.value)}
                                                />
                                                {errors.rate && <span className="text-danger">{errors.rate}</span>}
                                            </div>

                                            <div className="form-group mb-3 col-md-6">
                                                <label>Amount</label>
                                                <input type="number" readOnly
                                                    value={rate * qty}
                                                    className={errors.amount ? 'form-control is-invalid' : 'form-control'}
                                                    {...register("amount")}
                                                />
                                                {errors.amount && <span className="text-danger">{errors.amount}</span>}
                                            </div>
                                        </div>





                                        
                                    </div>



                                    <div className="col-md-6 ">


                                    <div className="form-group mb-3">
                                            <label>Received From</label>
                                            <input defaultValue={record_data.received_from}
                                                className={errors.pcs_b ? 'form-control is-invalid' : 'form-control'}
                                                {...register("received_from")}
                                            />
                                            {errors.received_from && <span className="text-danger">{errors.received_from}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Remarks</label>
                                            <textarea defaultValue={record_data.remarks}
                                                className={errors.remarks ? 'form-control is-invalid' : 'form-control'}
                                                {...register("remarks")}
                                            />
                                            {errors.remarks && <span className="text-danger">{errors.remarks}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Billed</label>
                                            <div className="">
                                                <label className="radio radio-outline-success ">
                                                    <input type="radio" name="billed"  value="1" defaultChecked={record_data.billed==1&&'defaultChecked'}  {...register("billed")} /><span>No</span><span className="checkmark"></span>
                                                </label>
                                                <label className="radio radio-outline-success ">
                                                    <input type="radio" name="billed"  value="2" defaultChecked={record_data.billed==2&&'defaultChecked'} {...register("billed")} /><span>Yes</span><span className="checkmark"></span>
                                                </label>
                                            </div> 
                                            {errors.billed && <span className="text-danger">{errors.billed}</span>}
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

