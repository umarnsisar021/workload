import React, {useState} from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { InertiaLink , usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import { useForm } from "react-hook-form";
import route from 'ziggy-js';


export default function createCurrency(props){

    const {sub_title,title}=props;
    const { register,getValues } = useForm();
    const { errors } = usePage().props;

    function handleSubmit(event){
        event.preventDefault();
        const values = getValues();
        Inertia.post(route('currencies.store'),values);
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
                                            <InertiaLink href={route('currencies.index')}>
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
                                            <label>Name</label>
                                            <input
                                                className={errors.name?'form-control is-invalid' : 'form-control'}
                                                {...register("name")}
                                            />
                                            {errors.name && <span className="text-danger">{errors.name}</span>}
                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>Code</label>
                                            <input
                                                className={errors.code?'form-control is-invalid' : 'form-control'}
                                                {...register("code")}
                                            />
                                            {errors.code && <span className="text-danger">{errors.code}</span>}
                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>Symbol</label>
                                            <input
                                                className={errors.symbol?'form-control is-invalid' : 'form-control'}
                                                {...register("symbol")}
                                            />
                                            {errors.symbol && <span className="text-danger">{errors.symbol}</span>}
                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>Exchange Rate</label>
                                            <input
                                                className={errors.exchange_rate?'form-control is-invalid' : 'form-control'}
                                                {...register("exchange_rate")}
                                            />
                                            {errors.exchange_rate && <span className="text-danger">{errors.exchange_rate}</span>}
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

