import React, { useState } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import { useForm } from "react-hook-form";
import route from 'ziggy-js';
import Select from 'react-select';
import axios from "axios";


export default function editRecord(props) {

    const { sub_title, title, record_data, unit_departments_options, countries } = props;
    const { register, getValues } = useForm();
    const { errors } = usePage().props

    const units_options=[{value:'Lbs',label:'Lbs'},{value:'Kgs',label:'Kgs'},{value:'Pcs',label:'Pcs'},{value:'Ltrs',label:'Ltrs'}]
    const [unit, setUnit] = useState(record_data.unit)
    const [unitDepartment, setUnitDepartment] = useState(record_data.unit_department_id)
    const [nameValidation, setNameValidation] = useState(false)
    const [name, setName] = useState(record_data.name)


    const changeUnitDepartment = (event) => {
        if (event) {
            setUnitDepartment(event.value)
            checkName(name,event.value)
        }
    }

    const changeUnit = (event) => {
        if (event) {
            setUnit(event.value)
        }
    }

    const changeName = (event) => {
    
        const val=event.target.value;
        setName(val)
        checkName(val,unitDepartment)
    }

    const checkName= (val,unit_department_id) => {
        setNameValidation(false)

        if (val) {
            axios
            .post(route('catalogs.items.check_name'), { name: val,id:record_data.id,unit_department_id:unit_department_id })
            .then(res => {
                if(res.data.length>0){
                    setNameValidation(true)
                }
                
            });
        }
    }



    function handleSubmit(event) {
        event.preventDefault();
        const values = getValues();
        values.unit_department_id = unitDepartment;
        values.unit=unit;
        Inertia.post(route('catalogs.items.update', record_data.id), values);
        setNameValidation(false)
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
                                            <InertiaLink href={route('catalogs.items.index')}>
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
                                    <div className="col-md-6 ">

                                        <input
                                            {...register("_method")}
                                            type="hidden"
                                            defaultValue={'PUT'}
                                        />
                                        
                                        <div className="form-group mb-3">
                                            <label>Item Code</label>
                                            <input
                                                readOnly
                                                className="form-control"
                                                defaultValue={record_data.id}
                                            />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Department</label>
                                            <Select
                                                onChange={changeUnitDepartment}
                                                isClearable={true}
                                                isSearchable
                                                options={unit_departments_options}
                                                value={unit_departments_options.filter(({ value }) => value === unitDepartment)}
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
                                            <label>Name</label>
                                            <input
                                                className={errors.name || nameValidation ? 'form-control is-invalid' : 'form-control'}
                                                {...register("name")}
                                                onChange={(e)=>changeName(e)}
                                                defaultValue={record_data.name}
                                            />
                                            {errors.name && <span className="text-danger">Item Already Exists!</span>}
                                            {nameValidation && <span className="text-danger">Item Already Exists!</span>}

                                        </div>

                                        <div className="form-group mb-3">
                                            <label title="Unit of Measure">UOM</label>
                                            <Select
                                                onChange={changeUnit}
                                                isClearable={true}
                                                isSearchable
                                                options={units_options}
                                                value={units_options.filter(({ value }) => value === unit)}
                                                styles={{
                                                    control: base => ({
                                                      ...base,
                                                      height: 34,
                                                      minHeight: 34
                                                    })
                                                  }}
                                            />
                                            {errors.unit && <span className="text-danger">{errors.unit}</span>}
                                        </div>



                                        <div className="form-group mb-3">
                                            <label>Description </label>
                                            <textarea
                                                className={errors.description ? 'form-control is-invalid' : 'form-control'}
                                                defaultValue={record_data.description}
                                                {...register("description")}
                                            />
                                            {errors.description && <span className="text-danger">{errors.description}</span>}
                                        </div>



                                        <div className="form-group mb-3">
                                            <label>Status</label>
                                            <div className="">
                                                <label className="radio radio-outline-success">
                                                    <input type="radio" name="status"  value="1" defaultChecked={record_data.status==1&&'defaultChecked'}  {...register("status")} /><span>Active</span><span className="checkmark"></span>
                                                </label>
                                                <label className="radio radio-outline-success">
                                                    <input type="radio" name="status"  value="0" defaultChecked={record_data.status==0&&'defaultChecked'} {...register("status")} /><span>In-Active</span><span className="checkmark"></span>
                                                </label>
                                            </div> 
                                            {errors.status && <span className="text-danger">{errors.status}</span>}
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

