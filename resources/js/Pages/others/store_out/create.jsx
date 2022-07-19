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


export default function createRecord(props) {
    const { sub_title, title, unit_departments } = props;
    const { register, getValues,setValue,reset } = useForm();
    const { errors } = usePage().props
    const [unitDepartmentID, setUnitDepartmentID] = useState(0)
    const [issueUnitDepartmentID, setIssueUnitDepartmentID] = useState(0)

    const [qty, setQty] = useState(0)
    const [rate, setRate] = useState(0)
    const [invoiceDate, setInvoiceDate] = useState(new Date());

    const [itemsOptions, setItemsOptions] = useState([])
    const [itemID, setItemID] = useState()

    

    const changeUnitDepartment = (event) => {
        if (event) {
            setUnitDepartmentID(event.value)
            axios
                .post(route('others.store_out.get_items_by_unit'), { department_id: event.value })
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

    const changeIssueUnitDepartment = (event) => {
        if (event) {
            setIssueUnitDepartmentID(event.value)
        }else{
            setIssueUnitDepartmentID('')
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const values = getValues();
        values.unit_department_id = unitDepartmentID;
        values.item_id = itemID;
        values.invoice_date = invoiceDate.getFullYear()+'-'+(invoiceDate.getMonth()+1)+'-'+invoiceDate.getDate();
        values.issue_unit_department_id = issueUnitDepartmentID;

        Inertia.post(route('others.store_out.store'), values, {
            onSuccess: response => {
                console.log(response)
                if(values._action==2){
                    window.location.reload(); 
                }
                reset()
                setUnitDepartmentID(0)
                setIssueUnitDepartmentID(0)
                setQty(0)
                setRate(0)
                setItemID(0)
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
                                            <InertiaLink href={route('others.store_out.index')}>
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
                                            <label>Department (Unit) </label>
                                            <Select
                                                onChange={changeUnitDepartment}
                                                isClearable
                                                isSearchable
                                                options={unit_departments}
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
                                            <input type="text"
                                                className={errors.po_no ? 'form-control is-invalid' : 'form-control'}
                                                {...register("po_no")}
                                            />
                                            {errors.po_no && <span className="text-danger">{errors.po_no}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Req. Slip #</label>
                                            <input type="text"
                                                className={errors.slip_no ? 'form-control is-invalid' : 'form-control'}
                                                {...register("slip_no")}
                                            />
                                            {errors.slip_no && <span className="text-danger">{errors.slip_no}</span>}
                                        </div>


                                        
                                        <div className="form-group mb-3">
                                            <label>Item</label>
                                            <Select
                                                onChange={changeItem}
                                                isClearable
                                                isSearchable
                                                options={itemsOptions}
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
                                            <label  title="Unit of Measure">UOM</label>
                                                <select 
                                                    title="Unit of Measure"
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
                                            <label>Issue Deparment </label>
                                            <Select
                                                onChange={changeIssueUnitDepartment}
                                                isClearable
                                                isSearchable
                                                options={unit_departments}
                                                styles={{
                                                    control: base => ({
                                                      ...base,
                                                      height: 34,
                                                      minHeight: 34
                                                    })
                                                  }}
                                            />
                                            {errors.issue_unit_department_id && <span className="text-danger">{errors.issue_unit_department_id}</span>}
                                        </div>

                                    <div className="form-group mb-3">
                                            <label>Issue To</label>
                                            <input
                                                className={errors.pcs_b ? 'form-control is-invalid' : 'form-control'}
                                                {...register("issue_to")}
                                            />
                                            {errors.issue_to && <span className="text-danger">{errors.issue_to}</span>}
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
