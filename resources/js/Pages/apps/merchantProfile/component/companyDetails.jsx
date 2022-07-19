import React from 'react';
import { Tab } from "react-bootstrap";
import { Controller } from "react-hook-form";
                /* for code editor */
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import "prismjs/themes/prism.css";
import "../../globalOption/style.css";
                    /* for code editor */

export default function companyDetails (props)  {

    const {data, register,control} = props;

    return (

            <Tab.Pane eventKey="company_details">

                <h2>Company Details</h2>
                <hr className="mt-0"/>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Business Name:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...props.register("name")}
                            className='form-control'
                            // onChange={ (value) => props.bsnameOnChange(value.target.value)}
                            defaultValue={data.name}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Short Name:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("short_name")}
                            className='form-control'
                            defaultValue={data.short_name}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Address Line 1:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("address_line_1")}
                            className='form-control'
                            defaultValue={data.address_line_1}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Address Line 2:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("address_line_2")}
                            className='form-control'
                            defaultValue={data.address_line_2}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Town / City:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("town_city")}
                            className='form-control'
                            defaultValue={data.town_city}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Country / State:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("county_state")}
                            className='form-control'
                            defaultValue={data.county_state}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Postalcode / Zip:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("postcode_zip")}
                            className='form-control'
                            defaultValue={data.postcode_zip}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Country:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("country")}
                            className='form-control'
                            defaultValue={data.country}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Telephone:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("telephone")}
                            className='form-control'
                            defaultValue={data.telephone}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Fax:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("fax")}
                            className='form-control'
                            defaultValue={data.fax}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        SMS NO:
                    </span>
                    <div className="col-sm-7 input-group">
                    <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1">+92</span></div>
                        <input
                            {...register("sms_no")}
                            className='form-control'
                            defaultValue={data.sms_no}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Primary Email:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("primary_email")}
                            className='form-control'
                            defaultValue={data.primary_email}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Secondary Email:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("secondary_email")}
                            className='form-control'
                            defaultValue={data.secondary_email}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Web:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("web")}
                            className='form-control'
                            defaultValue={data.web}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Google Map (Embed):
                    </span>
                    <div className="col-sm-7 mh-200p overflow-auto p-0">
                        <Controller
                            render={
                                ({ field }) => <Editor {...field}
                                onValueChange = {([ value ]) => value}
                                highlight={code => highlight(code, languages.js)}
                                padding={10}
                                className="w-100"
                                style={{
                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                    outline: 0
                                }}
                                />
                            }
                            control={control}
                            name="map_embed"
                            defaultValue  = {data.map_embed}
                        />
                    </div>
                </div>


            </Tab.Pane>
    );
};

