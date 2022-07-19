import React, { useState } from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import { useForm } from "react-hook-form";
import route from 'ziggy-js';
import Select from 'react-select';


export default function editRecord(props) {

    const { sub_title, title, record_data, countries_options } = props;
    const { register, getValues } = useForm();
    const { errors } = usePage().props


    const [country, setCountry] = useState(record_data.country_id)


    const changeCountry = (event) => {
        if (event) {
            setCountry(event.value)
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const values = getValues();
        values.country_id = country;
        Inertia.post(route('management.suppliers.update', record_data.id), values);
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
                                            <InertiaLink href={route('management.suppliers.index')}>
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
                                            <label>First Name</label>
                                            <input
                                                className={errors.first_name ? 'form-control is-invalid' : 'form-control'}
                                                {...register("first_name")}
                                                defaultValue={record_data.first_name}
                                            />
                                            {errors.first_name && <span className="text-danger">{errors.first_name}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Last Name</label>
                                            <input
                                                className={errors.last_name ? 'form-control is-invalid' : 'form-control'}
                                                {...register("last_name")}
                                                defaultValue={record_data.last_name}
                                            />
                                            {errors.last_name && <span className="text-danger">{errors.last_name}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Company Name</label>
                                            <input
                                                className={errors.company_name ? 'form-control is-invalid' : 'form-control'}
                                                {...register("company_name")}
                                                defaultValue={record_data.company_name}
                                            />
                                            {errors.company_name && <span className="text-danger">{errors.company_name}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Address Line 1 </label>
                                            <input
                                                className={errors.address_1 ? 'form-control is-invalid' : 'form-control'}
                                                defaultValue={record_data.address_1}
                                                {...register("address_1")}
                                            />
                                            {errors.address_1 && <span className="text-danger">{errors.address_1}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Address Line 2 </label>
                                            <input
                                                defaultValue={record_data.address_2}
                                                className={errors.address_2 ? 'form-control is-invalid' : 'form-control'}
                                                {...register("address_2")}
                                            />
                                            {errors.address_2 && <span className="text-danger">{errors.address_2}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Town / City</label>
                                            <input defaultValue={record_data.town_city}
                                                className={errors.town_city ? 'form-control is-invalid' : 'form-control'}
                                                {...register("town_city")}
                                            />
                                            {errors.town_city && <span className="text-danger">{errors.town_city}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Country / State</label>
                                            <input defaultValue={record_data.country_state}
                                                className={errors.country_state ? 'form-control is-invalid' : 'form-control'}
                                                {...register("country_state")}
                                            />
                                            {errors.country_state && <span className="text-danger">{errors.country_state}</span>}
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Postcode / Zip</label>
                                            <input defaultValue={record_data.postcode_zip}
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
                                            <input defaultValue={record_data.telephone}
                                                className={errors.telephone ? 'form-control is-invalid' : 'form-control'}
                                                {...register("telephone")}
                                            />
                                            {errors.telephone && <span className="text-danger">{errors.telephone}</span>}
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Fax</label>
                                            <input defaultValue={record_data.fax}
                                                className={errors.fax ? 'form-control is-invalid' : 'form-control'}
                                                {...register("fax")}
                                            />
                                            {errors.fax && <span className="text-danger">{errors.fax}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Mobile Number</label>
                                            <input defaultValue={record_data.mobile_number}
                                                className={errors.mobile_number ? 'form-control is-invalid' : 'form-control'}
                                                {...register("mobile_number")}
                                            />
                                            {errors.mobile_number && <span className="text-danger">{errors.mobile_number}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>Primary Email</label>
                                            <input defaultValue={record_data.primary_email}
                                                className={errors.primary_email ? 'form-control is-invalid' : 'form-control'}
                                                {...register("primary_email")}
                                            />
                                            {errors.primary_email && <span className="text-danger">{errors.primary_email}</span>}
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Secondary Email</label>
                                            <input defaultValue={record_data.secondary_email}
                                                className={errors.secondary_email ? 'form-control is-invalid' : 'form-control'}
                                                {...register("secondary_email")}
                                            />
                                            {errors.secondary_email && <span className="text-danger">{errors.secondary_email}</span>}
                                        </div>


                                        <div className="form-group mb-3">
                                            <label>URL</label>
                                            <input defaultValue={record_data.url}
                                                className={errors.url ? 'form-control is-invalid' : 'form-control'}
                                                {...register("url")}
                                            />
                                            {errors.url && <span className="text-danger">{errors.url}</span>}
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

