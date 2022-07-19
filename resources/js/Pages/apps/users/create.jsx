import React, {useState} from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { Dropdown } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { InertiaLink , usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import { useForm } from "react-hook-form";

const createUser = (props) =>  {

    const {sub_title,title,store_url,roles_data}=props;
    const { register,getValues } = useForm();
    const { errors } = usePage().props

    function handleSubmit(event){
        event.preventDefault();
        const values = getValues();
        Inertia.post(store_url,values);
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
                                            <InertiaLink href={route('users.index')}>
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

                                        <div className="col-md-12 form-group mb-3">
                                            <h4>Personal Info</h4>
                                            <hr className="mt-0"/>
                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>First Name</label>
                                            <input
                                                className={errors.first_name?'form-control is-invalid' : 'form-control'}
                                                {...register("first_name")}
                                            />
                                            {errors.first_name && <span className="text-danger">{errors.first_name}</span>}
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                            <label>Last Name</label>
                                            <input
                                                className={errors.last_name?'form-control is-invalid' : 'form-control'}
                                                {...register("last_name")}
                                            />
                                            {errors.last_name && <span className="text-danger">{errors.last_name}</span>}
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                            <label>Personal Email Address</label>
                                            <input
                                                type="email"
                                                className='form-control'
                                                {...register("personal_email")}
                                            />
                                            {/* {errors.email && <span className="text-danger">{errors.email}</span>} */}
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                            <label>Mobile</label>
                                            <input
                                                className={errors.mobile_no?'form-control is-invalid' : 'form-control'}
                                                {...register("mobile_no")}
                                            />
                                            {errors.mobile_no && <span className="text-danger">{errors.mobile_no}</span>}
                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>Address</label>
                                            <textarea
                                                className={errors.address?'form-control is-invalid' : 'form-control'}
                                                {...register("address")}
                                            ></textarea>
                                            {errors.address && <span className="text-danger">{errors.address}</span>}
                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>Role</label>
                                            <select
                                                // className='form-control'
                                                className="custom-select"
                                                {...register("role_id")}
                                            >
                                                {/* <option hidden values="">-- Select --</option> */}
                                                {Object.values(roles_data).map((value,index) =>(
                                                    <option value={value.id} key={index}>{value.name}</option>
                                                ))}
                                            </select>
                                            {errors.role && <span className="text-danger">{errors.role}</span>}
                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>Status</label>
                                            <div className="">
                                            <label className="radio radio-outline-success">
                                                    <input type="radio" name="status"  value="1"  defaultChecked {...register("status")} /><span>Active</span><span className="checkmark"></span>
                                                </label>
                                                <label className="radio radio-outline-success">
                                                    <input type="radio" name="status"  value="0"  {...register("status")} /><span>In-Active</span><span className="checkmark"></span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-md-12 form-group mb-1 mt-4">
                                            <h4>Credentials</h4>
                                            <hr className="mt-0"/>
                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>Email Address (Username)</label>
                                            <input
                                                type="email"
                                                className={errors.email?'form-control is-invalid' : 'form-control'}
                                                {...register("email")}
                                            />
                                            {errors.email && <span className="text-danger">{errors.email}</span>}
                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                className={errors.password?'form-control is-invalid' : 'form-control'}
                                                {...register("password")}
                                            />
                                            {errors.password && <span className="text-danger">{errors.password}</span>}
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

export default createUser;
