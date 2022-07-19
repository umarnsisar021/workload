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


export default function editRecord(props) {

    const { sub_title, title, record_data, unit_departments } = props;
    const { register, getValues ,setValue} = useForm();
    const { errors } = usePage().props
    const [unitDepartmentID, setUnitDepartmentID] = useState(record_data.unit_department_id)
    const [invoiceDate, setInvoiceDate] = useState(new Date(record_data.invoice_date));
    const changeUnitDepartment = (event) => {
        if (event) {
            setUnitDepartmentID(event.value)
        }else{
            setUnitDepartmentID('')
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const values = getValues();
        values.unit_department_id = unitDepartmentID;
        values.invoice_date = invoiceDate.getFullYear()+'-'+(invoiceDate.getMonth()+1)+'-'+invoiceDate.getDate();

        if(!values.qty){
            values.qty=record_data.qty;
        }

        Inertia.post(route('others.gate_passes.update', record_data.id), values,
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
                                            <InertiaLink href={route('others.gate_passes.index')}>
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
                                            <label>In / Out</label>
                                            <div className="">
                                                <label className="radio radio-outline-success ">
                                                    <input type="radio" name="type"  value="1" defaultChecked={record_data.type==1&&'defaultChecked'}  {...register("type")} /><span>IN</span><span className="checkmark"></span>
                                                </label>
                                                <label className="radio radio-outline-success ">
                                                    <input type="radio" name="type"  value="2" defaultChecked={record_data.type==2&&'defaultChecked'} {...register("type")} /><span>OUT</span><span className="checkmark"></span>
                                                </label>
                                            </div> 
                                            {errors.type && <span className="text-danger">{errors.type}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Gate Pass #</label>
                                            <input type="text" defaultValue={record_data.gp_no}
                                                className={errors.gp_no ? 'form-control is-invalid' : 'form-control'}
                                                {...register("gp_no")}
                                            />
                                            {errors.gp_no && <span className="text-danger">{errors.gp_no}</span>}
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Item</label>
                                            <input type="text" defaultValue={record_data.item}
                                                className={errors.item ? 'form-control is-invalid' : 'form-control'}
                                                {...register("item")}
                                            />
                                            {errors.item && <span className="text-danger">{errors.item}</span>}
                                        </div>


                                        <div className="row">
                                            <div className="form-group mb-3 col-md-7">
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
                                                    defaultValue={record_data.qty}
                                                />
                                                {errors.qty && <span className="text-danger">{errors.qty}</span>}
                                            </div>


                                            <div className="form-group mb-3 col-md-5">
                                            <label  title="Unit of Measure">UOM </label>
                                                <select
                                                    // className='form-control'
                                                    className="custom-select"
                                                    {...register("unit")}
                                                    defaultValue={record_data.unit}
                                                >
                                                    {/* <option hidden values="">-- Select --</option> */}
                                                    <option value="Pcs" key={1}>Pcs</option>
                                                    <option value="Lbs" key={2}>Lbs</option>
                                                    <option value="Kgs" key={3}>Kgs</option>
                                                </select>
                                                {errors.unit && <span className="text-danger">{errors.unit}</span>}
                                            </div>

                                        </div>



                                        
                                    </div>



                                    <div className="col-md-6 ">

                                    <div className="form-group mb-3">
                                            <label>Vehicle #</label>
                                            <input defaultValue={record_data.vehicle_no}
                                                className={errors.pcs_b ? 'form-control is-invalid' : 'form-control'}
                                                {...register("vehicle_no")}
                                            />
                                            {errors.vehicle_no && <span className="text-danger">{errors.vehicle_no}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Roll</label>
                                            <input defaultValue={record_data.roll}
                                                className={errors.roll ? 'form-control is-invalid' : 'form-control'}
                                                {...register("roll")}
                                            />
                                            {errors.roll && <span className="text-danger">{errors.roll}</span>}
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

