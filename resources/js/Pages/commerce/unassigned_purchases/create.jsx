import React, { useState } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import { useForm } from "react-hook-form";
import route from 'ziggy-js';
import { toast } from 'react-toastify';


export default function createRecord(props) {
    const { sub_title, title, suppliers, brands, counts, brokers } = props;
    const { register, getValues } = useForm();
    const { errors } = usePage().props
    const [supplierID, setSupplierID] = useState(0)
    const [brandID, setBrandID] = useState(0)
    const [countID, setCountID] = useState(0)
    const [brokerID, setBrokerID] = useState(0)


    const changeSupplier = (value) => {
        setSupplierID(value)
    }

    const changeBrand = (value) => {
        setBrandID(value)
    }
    const changeCount = (value) => {
        setCountID(value)
    }

    const changeBroker = (value) => {
        setBrokerID(value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        const values = getValues();
        values.supplier_id = supplierID;
        values.brand_id = brandID;
        values.count_id = countID;
        values.broker_id = brokerID;
        Inertia.post(route('commerce.unassigned_purchases.store'), values, {
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
                                            <InertiaLink href={route('commerce.unassigned_purchases.index')}>
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
                                    <div className="col-md-6 ">
                                        <div className="form-group mb-3">
                                            <label>Date</label>
                                            <input type="date"
                                                className={errors.invoice_date ? 'form-control is-invalid' : 'form-control'}
                                                {...register("invoice_date")}
                                            />
                                            {errors.invoice_date && <span className="text-danger">{errors.invoice_date}</span>}
                                        </div>
                                    </div>


                                    <div className="col-md-6 ">
                                        <div className="form-group mb-3">
                                            <label>Supplier Name</label>
                                            <select
                                                onChange={(event) => changeSupplier(event.target.value)}
                                                value={supplierID}
                                                className="custom-select">
                                                <option values="0">-- None --</option>
                                                {suppliers.map(function (supplier, i) {
                                                    return (<option value={supplier.id} key={i}>{supplier.first_name} {supplier.last_name}</option>)
                                                })}
                                            </select>
                                            {errors.supplier_id && <span className="text-danger">{errors.supplier_id}</span>}
                                        </div>
                                    </div>

                                    <div className="col-md-6 ">
                                        <div className="form-group mb-3">
                                            <label>Brand Name</label>
                                            <select
                                                onChange={(event) => changeBrand(event.target.value)}
                                                value={brandID}
                                                className="custom-select">
                                                <option values="0">-- None --</option>
                                                {brands.map(function (brand, i) {
                                                    return (<option value={brand.id} key={i}>{brand.name}</option>)
                                                })}
                                            </select>
                                            {errors.brand_id && <span className="text-danger">{errors.brand_id}</span>}
                                        </div>
                                    </div>


                                    <div className="col-md-6 ">
                                        <div className="form-group mb-3">
                                            <label>Count Name</label>
                                            <select
                                                onChange={(event) => changeCount(event.target.value)}
                                                value={countID}
                                                className="custom-select">
                                                <option values="0">-- None --</option>
                                                {counts.map(function (count, i) {
                                                    return (<option value={count.id} key={i}>{count.name}</option>)
                                                })}
                                            </select>
                                            {errors.count_id && <span className="text-danger">{errors.count_id}</span>}
                                        </div>
                                    </div>


                                    <div className="col-md-6 ">
                                        <div className="form-group mb-3">
                                            <label>Qty (Lbs)</label>
                                            <input type="number"
                                                className={errors.qty ? 'form-control is-invalid' : 'form-control'}
                                                {...register("qty")}
                                            />
                                            {errors.qty && <span className="text-danger">{errors.qty}</span>}
                                        </div>
                                    </div>


                                    <div className="col-md-6 ">
                                        <div className="form-group mb-3">
                                            <label>Rate / Lbs</label>
                                            <input type="number"
                                                className={errors.rate ? 'form-control is-invalid' : 'form-control'}
                                                {...register("rate")}
                                            />
                                            {errors.rate && <span className="text-danger">{errors.rate}</span>}
                                        </div>
                                    </div>


                                    <div className="col-md-6 ">
                                        <div className="form-group mb-3">
                                            <label>Broker Name</label>
                                            <select
                                                onChange={(event) => changeBroker(event.target.value)}
                                                value={brokerID}
                                                className="custom-select">
                                                <option values="0">-- None --</option>
                                                {brokers.map(function (broker, i) {
                                                    return (<option value={broker.id} key={i}>{broker.name}</option>)
                                                })}
                                            </select>
                                            {errors.broker_id && <span className="text-danger">{errors.broker_id}</span>}
                                        </div>
                                    </div>


                                    <div className="col-md-6 ">
                                        <div className="form-group mb-3">
                                            <label>Payment Term</label>
                                            <input
                                                className={errors.payment_term ? 'form-control is-invalid' : 'form-control'}
                                                {...register("payment_term")}
                                            />
                                            {errors.payment_term && <span className="text-danger">{errors.payment_term}</span>}
                                        </div>
                                    </div>

                                    <div className="col-md-6 ">

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

