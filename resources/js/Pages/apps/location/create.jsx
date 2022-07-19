import React from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { InertiaLink , usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import { useForm } from "react-hook-form";
import route from 'ziggy-js';


export default function createCurrency(props){

    const {sub_title,title}=props;
    const { register,getValues } = useForm();
    const { errors } = usePage().props

    function handleSubmit(event){
        event.preventDefault();
        const values = getValues();
        console.log(values);
        Inertia.post(route('locations.store'),values);
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
                                            <InertiaLink href={route('locations.index')}>
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
                                            <label>Area <span>*</span></label>
                                            <input
                                                className={errors.area?'form-control is-invalid' : 'form-control'}
                                                {...register("area")}
                                            />
                                            {errors.area && <span className="text-danger">{errors.area}</span>}
                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>Area Code <span>*</span></label>
                                            <input
                                                className={errors.area_code?'form-control is-invalid' : 'form-control'}
                                                {...register("area_code")}
                                            />
                                            {errors.area_code && <span className="text-danger">{errors.area_code}</span>}
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

