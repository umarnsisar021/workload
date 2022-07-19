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


export default function createRecord(props) {
    const { sub_title, title, unit_departments } = props;
    const { register, getValues,setValue ,reset} = useForm();
    const { errors } = usePage().props
    const [unitDepartmentID, setUnitDepartmentID] = useState(0)
    const [invoiceDate, setInvoiceDate] = useState(new Date());
    


    const changeUnitDepartment = (event) => {
        if (event) {
            setUnitDepartmentID(event.value)
        }
    }
    function handleSubmit(event) {
        event.preventDefault();
        const values = getValues();
        values.unit_department_id = unitDepartmentID;
        values.invoice_date = invoiceDate.getFullYear()+'-'+(invoiceDate.getMonth()+1)+'-'+invoiceDate.getDate();

        Inertia.post(route('others.gate_passes.store'), values, {
            onSuccess: response => {
                console.log(response)
                if(values._action==2){
                    window.location.reload(); 
                }
                reset()
                setUnitDepartmentID(0)
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
                                            <label>In / Out</label>
                                            <div className="">
                                                <label className="radio radio-outline-success">
                                                    <input type="radio" name="type"  value="1" defaultChecked {...register("type")} /><span>IN</span><span className="checkmark"></span>
                                                </label>
                                                <label className="radio radio-outline-success">
                                                    <input type="radio" name="type"  value="2" {...register("type")} /><span>OUT</span><span className="checkmark"></span>
                                                </label>
                                            </div> 
                                            {errors.type && <span className="text-danger">{errors.type}</span>}
                                        </div>



                                        <div className="form-group mb-3">
                                            <label>Gate Pass #</label>
                                            <input type="text"
                                                className={errors.gp_no ? 'form-control is-invalid' : 'form-control'}
                                                {...register("gp_no")}
                                            />
                                            {errors.gp_no && <span className="text-danger">{errors.gp_no}</span>}
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Item</label>
                                            <input type="text"
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
                                                />
                                                {errors.qty && <span className="text-danger">{errors.qty}</span>}
                                            </div>


                                            <div className="form-group mb-3 col-md-5">
                                            <label  title="Unit of Measure">UOM</label>
                                                <select
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

                                    </div>



                                    <div className="col-md-6 ">

                                        

                                    <div className="form-group mb-3">
                                            <label>Vehicle #</label>
                                            <input
                                                className={errors.pcs_b ? 'form-control is-invalid' : 'form-control'}
                                                {...register("vehicle_no")}
                                            />
                                            {errors.vehicle_no && <span className="text-danger">{errors.vehicle_no}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Roll</label>
                                            <input
                                                className={errors.roll ? 'form-control is-invalid' : 'form-control'}
                                                {...register("roll")}
                                            />
                                            {errors.roll && <span className="text-danger">{errors.roll}</span>}
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

