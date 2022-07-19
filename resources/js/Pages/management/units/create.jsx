import React, { useState } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import { useForm } from "react-hook-form";
import route from 'ziggy-js';
import Select from 'react-select';


export default function createRecord(props) {

    const { sub_title, title, unit_departments_options, countries_options } = props;
    const { register, getValues,setValue } = useForm();
    const { errors } = usePage().props

    const [unitDepartment, setUnitDepartment] = useState(0)
    const [country, setCountry] = useState(0)

    const changeUnitDepartment = (event) => {
        if (event) {
            setUnitDepartment(event.value)
        }
    }

    const changeCountry = (event) => {
        if (event) {
            setCountry(event.value)
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const values = getValues();
        values.unit_department_id = unitDepartment;
        values.country_id = country;
        Inertia.post(route('management.units.store'), values, {
            onSuccess: response => {
                console.log(response)
                if(values._action==2){
                    window.location.reload(); 
                }
            },
            onError: error => {
                Object.keys(error).map(function (key, index) {
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
                                            <InertiaLink href={route('management.units.index')}>
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
                                            <label>Name</label>
                                            <input
                                                className={errors.name ? 'form-control is-invalid' : 'form-control'}
                                                {...register("name")}
                                            />
                                            {errors.name && <span className="text-danger">{errors.name}</span>}
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
                                            <label>Address Line 1 </label>
                                            <input
                                                className={errors.address_1 ? 'form-control is-invalid' : 'form-control'}
                                                {...register("address_1")}
                                            />
                                            {errors.address_1 && <span className="text-danger">{errors.address_1}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Address Line 2 </label>
                                            <input
                                                className={errors.address_2 ? 'form-control is-invalid' : 'form-control'}
                                                {...register("address_2")}
                                            />
                                            {errors.address_2 && <span className="text-danger">{errors.address_2}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Town / City</label>
                                            <input
                                                className={errors.town_city ? 'form-control is-invalid' : 'form-control'}
                                                {...register("town_city")}
                                            />
                                            {errors.town_city && <span className="text-danger">{errors.town_city}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Country / State</label>
                                            <input
                                                className={errors.country_state ? 'form-control is-invalid' : 'form-control'}
                                                {...register("country_state")}
                                            />
                                            {errors.country_state && <span className="text-danger">{errors.country_state}</span>}
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Postcode / Zip</label>
                                            <input
                                                className={errors.postcode_zip ? 'form-control is-invalid' : 'form-control'}
                                                {...register("postcode_zip")}
                                            />
                                            {errors.postcode_zip && <span className="text-danger">{errors.postcode_zip}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Country</label>
                                            <Select
                                                onChange={changeCountry}
                                                isClearable={true}
                                                isSearchable
                                                options={countries_options}
                                                value={countries_options.filter(({ value }) => value === country)}
                                                styles={{
                                                    control: base => ({
                                                      ...base,
                                                      height: 34,
                                                      minHeight: 34
                                                    })
                                                  }}
                                            />
                                            {errors.country_id && <span className="text-danger">{errors.country_id}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Telephone</label>
                                            <input
                                                className={errors.telephone ? 'form-control is-invalid' : 'form-control'}
                                                {...register("telephone")}
                                            />
                                            {errors.telephone && <span className="text-danger">{errors.telephone}</span>}
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Fax</label>
                                            <input
                                                className={errors.fax ? 'form-control is-invalid' : 'form-control'}
                                                {...register("fax")}
                                            />
                                            {errors.fax && <span className="text-danger">{errors.fax}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Mobile Number</label>
                                            <input
                                                className={errors.mobile_number ? 'form-control is-invalid' : 'form-control'}
                                                {...register("mobile_number")}
                                            />
                                            {errors.mobile_number && <span className="text-danger">{errors.mobile_number}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Primary Email Address</label>
                                            <input
                                                className={errors.primary_email ? 'form-control is-invalid' : 'form-control'}
                                                {...register("primary_email")}
                                            />
                                            {errors.primary_email && <span className="text-danger">{errors.primary_email}</span>}
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Secondary Email Address</label>
                                            <input
                                                className={errors.secondary_email ? 'form-control is-invalid' : 'form-control'}
                                                {...register("secondary_email")}
                                            />
                                            {errors.secondary_email && <span className="text-danger">{errors.secondary_email}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>URL</label>
                                            <input
                                                className={errors.url ? 'form-control is-invalid' : 'form-control'}
                                                {...register("url")}
                                            />
                                            {errors.url && <span className="text-danger">{errors.url}</span>}
                                        </div>




                                        <div className="form-group mb-3">
                                            <label>Status</label>
                                            <div className="">
                                                <label className="radio radio-outline-success">
                                                    <input type="radio" name="status"  value="1" defaultChecked {...register("status")} /><span>Active</span><span className="checkmark"></span>
                                                </label>
                                                <label className="radio radio-outline-success">
                                                    <input type="radio" name="status"  value="0"  {...register("status")} /><span>In-Active</span><span className="checkmark"></span>
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
