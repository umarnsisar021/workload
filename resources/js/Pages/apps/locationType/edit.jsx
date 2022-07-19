import React from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { InertiaLink , usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import { useForm } from "react-hook-form";
import route from 'ziggy-js';


export default function edit(props){

    const {sub_title,title,typeData}=props;
    const { register,getValues,setValue } = useForm();
    const { errors } = usePage().props

    function handleSubmit(event){
        event.preventDefault();
        setValue('_method','PUT');
        const values = getValues();
        Inertia.post(route('location_type.update',typeData.id),values);
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
                                            <InertiaLink href={route('location_type.index')}>
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
                                            <label>Type <span>*</span></label>
                                            <input
                                                className={errors.type?'form-control is-invalid' : 'form-control'}
                                                {...register("type")}
                                                defaultValue={typeData.type}
                                            />
                                            {errors.type && <span className="text-danger">{errors.type}</span>}
                                        </div>

                                        {/* <div className="col-md-6 form-group mb-3"></div> */}

                                        <div className="col-md-6 form-group mb-3">
                                            <label>Code <span>*</span></label>
                                            <input
                                                className={errors.type_code?'form-control is-invalid' : 'form-control'}
                                                {...register("type_code")}
                                                defaultValue={typeData.type_code}
                                            />
                                            {errors.type_code && <span className="text-danger">{errors.type_code}</span>}
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

