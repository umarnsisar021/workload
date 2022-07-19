import React, {useState} from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { InertiaLink , usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import { useForm } from "react-hook-form";
import route from 'ziggy-js';
import Select, { createFilter } from 'react-select';


export default function create(props){

    const {sub_title,title,location,location_type}=props;
    const { register,getValues,control,setValue } = useForm();
    const { errors } = usePage().props;
    const [selectedOption, setSelectedOption] = useState(null);
    const optionLocation = [];
    const optionLocationType = [];

    Object.values(location).map(row=>{
        optionLocation.push({
            value: row.id,
            label:row.area
        });
    });

    Object.values(location_type).map(row=>{
        optionLocationType.push({
            value: row.id,
            label: row.type
        });
    });


    const changeLocation = (event) => {
        if(event!=null){
            setValue('location_id',event.value);
        }
        else{
            setValue('location_id','');
        }
    }

    const changeType = (event) => {
        if(event!=null){
            setValue('location_type_id',event.value);
        }
        else{
            setValue('location_type_id','');
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        const values = getValues();
        Inertia.post(route('branches.store'),values);
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
                                            <InertiaLink href={route('branches.index')}>
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
                                            id="form-submit"
                                            >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                    <div className="row">

                                        <div className="col-md-6 form-group mb-3">
                                            <label>Name <span className="text-danger font-weight-bold">*</span></label>
                                            <input
                                                className={errors.name?'form-control is-invalid' : 'form-control'}
                                                {...register("name")}
                                            />
                                            {errors.name && <span className="text-danger">{errors.name}</span>}
                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>Code <span className="text-danger font-weight-bold">*</span></label>
                                            <input
                                                className={errors.code?'form-control is-invalid' : 'form-control'}
                                                {...register("code")}
                                            />
                                            {errors.code && <span className="text-danger">{errors.code}</span>}
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Location <span className="text-danger font-weight-bold">*</span></label>

                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={changeLocation}
                                                options={optionLocation}
                                                isClearable
                                                isSearchable
                                                styles={{
                                                    control: base => ({
                                                      ...base,
                                                      height: 34,
                                                      minHeight: 34
                                                    })
                                                  }}
                                            />
                                            {errors.location_id && <span className="text-danger">{errors.location_id}</span>}
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Location Type <span className="text-danger font-weight-bold">*</span></label>

                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={changeType}
                                                options={optionLocationType}
                                                isClearable
                                                isSearchable
                                                name="location_type_id"
                                                styles={{
                                                    control: base => ({
                                                      ...base,
                                                      height: 34,
                                                      minHeight: 34
                                                    })
                                                  }}
                                            />
                                            {errors.location_type_id && <span className="text-danger">{errors.location_type_id}</span>}
                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>NTN/TIN #</label>
                                            <input
                                                className='form-control'
                                                {...register("ntn_tin")}
                                            />

                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>STRN #</label>
                                            <input
                                                className='form-control'
                                                {...register("strn")}
                                            />

                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>Provincial Tax #</label>
                                            <input
                                                className='form-control'
                                                {...register("provincial_tax")}
                                            />

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

