import React, { useState } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import { useForm } from "react-hook-form";
import route from 'ziggy-js';


export default function editRecord(props) {

    const { sub_title, title, record_data } = props;
    const { register, getValues } = useForm();
    const { errors } = usePage().props




    function handleSubmit(event) {
        event.preventDefault();
        const values = getValues();
        Inertia.post(route('management.brokers.update', record_data.id), values);
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
                                            <InertiaLink href={route('management.brokers.index')}>
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
                                            <label> Name</label>
                                            <input
                                                className={errors.name ? 'form-control is-invalid' : 'form-control'}
                                                {...register("name")}
                                                defaultValue={record_data.name}
                                            />
                                            {errors.name && <span className="text-danger">{errors.name}</span>}
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
                                            <label>Opening Balance</label>
                                            <input defaultValue={record_data.opening_balance}
                                                className={errors.opening_balance ? 'form-control is-invalid' : 'form-control'}
                                                {...register("opening_balance")}
                                            />
                                            {errors.opening_balance && <span className="text-danger">{errors.opening_balance}</span>}
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

