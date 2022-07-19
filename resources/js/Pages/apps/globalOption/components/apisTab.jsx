import React from 'react';
import { Tab } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { usePage } from "@inertiajs/inertia-react";

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import "prismjs/themes/prism.css";

import Tooltip from 'react-tooltip-lite';

export default function apisTab(props) {

    const {globalOpt, register,control} = props;
    const {base_url} = usePage().props

    return (
            <Tab.Pane eventKey="apis">
                <h2 className="d-inline-block">SMS APIs</h2>
                    <Tooltip
                    content={(
                        <div className="bg-gray-100 p-2">
                            <strong>SMS Integration with burstsms.com.au</strong>
                            <p><a href="http://www.burstsms.com.au" target="_blank">Visit Website</a></p>
                            <p>
                                - Open an SMS account with burstsms.com.au<br />
                                - In your Burst SMS account settings section scroll down to API Settings to find your API key and set your API secret.<br />
                            </p>
                        </div>
                    )}
                    direction="right"
                    tagName="span"
                    className="d-inline-block m-1"
                    tipContentClassName=""
                    >
                        <i className="fa fa-question-circle"></i>
                    </Tooltip>
                <hr className="mt-0"/>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Country Code:
                    </span>
                    <div className="col-sm-8">
                            <input className="form-control" type="text" {...register("sms_api_countrycode")} defaultValue={globalOpt.sms_api_countrycode}/>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        SMS API:
                    </span>
                    <div className="col-sm-8">
                            <select className="custom-select" {...register("sms_api")} defaultValue={globalOpt.sms_api}>
                            <option value="">None</option>
                            <option value="BurstSMS">BurstSMS</option>
                            <option value="Telenor">Telenor</option>
                            <option value="Zong">Zong</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        SMS API Username/Key:
                    </span>
                    <div className="col-sm-8">
                            <input className="form-control" type="text" {...register("sms_api_username")} defaultValue={globalOpt.sms_api_username}/>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        SMS API Password/Secret:
                    </span>
                    <div className="col-sm-8">
                            <input className="form-control" type="text" {...register("sms_api_password")} defaultValue={globalOpt.sms_api_password}/>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Mask:
                    </span>
                    <div className="col-sm-8">
                            <input className="form-control" type="text" {...register("sms_api_mask")} defaultValue={globalOpt.sms_api_mask}/>
                    </div>
                </div>
                <h2 className="d-inline-block mt-5">Google Maps</h2>
                    <Tooltip
                    content={(
                        <div className="bg-gray-100 p-2">
                            <strong>Google Maps API</strong>
                            <p><a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank">Visit Website</a></p>
                            <p>Google Maps API allows you to display customized map on your web site.</p>
                            <strong>Note :</strong> Enable Places and Map APIs from Google account
                        </div>
                    )}
                    direction="right"
                    tagName="span"
                    className="d-inline-block m-1"
                    tipContentClassName=""
                    >
                        <i className="fa fa-question-circle"></i>
                    </Tooltip>
                <hr className="mt-0"/>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Google Map API Key:
                    </span>
                    <div className="col-sm-8">
                            <input className="form-control" type="text" {...register("google_map_api")} defaultValue={globalOpt.google_map_api}/>
                    </div>
                </div>
                <h2 className="d-inline-block mt-5">Google Drive</h2>
                <Tooltip
                content={(
                    <div className="bg-gray-100 p-2">
                        <strong>Google Drive API</strong>
                        <p><a href="https://console.developers.google.com" target="_blank">Visit Website</a></p>
                        <p>Get Client ID and Secret</p>
                        <p>Add { base_url+'edm/drive' } to Authorised redirect URIs</p>
                        <strong>Note :</strong> Enable Drive API from Google account
                    </div>
                )}
                direction="right"
                tagName="span"
                className="d-inline-block m-1"
                tipContentClassName=""
                >
                    <i className="fa fa-question-circle"></i>
                </Tooltip>
                <hr className="mt-0"/>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Google Drive Client ID:
                    </span>
                    <div className="col-sm-8">
                            <input className="form-control" type="text" {...register("gdrive_client_id")} defaultValue={globalOpt.gdrive_client_id}/>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Client Secret:
                    </span>
                    <div className="col-sm-8">
                            <input className="form-control" type="text" {...register("gdrive_client_secret")} defaultValue={globalOpt.gdrive_client_secret}/>
                    </div>
                </div>
                <h2 className="d-inline-block mt-5">Google Analytics</h2>
                <Tooltip
                content={(
                    <div className="bg-gray-100 p-2">
                        <strong>Google Analytics</strong>
                        <p>Paste below google analytics full code</p>
                    </div>
                )}
                direction="right"
                tagName="span"
                className="d-inline-block m-1"
                tipContentClassName=""
                >
                    <i className="fa fa-question-circle"></i>
                </Tooltip>
                <hr className="mt-0"/>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Google Analytics Code:
                    </span>
                    <div className="col-sm-8">
                            <input className="form-control" type="text" {...register("google_analytics")} defaultValue={globalOpt.google_analytics}/>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Track Location:
                    </span>
                    <div className="col-sm-8">
                            <select className="custom-select" {...register("track_location")} defaultValue={globalOpt.track_location}>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>
                </div>
                <h2 className="mt-5">ShareThis</h2>
                <hr className="mt-0"/>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        ShareThis Code:
                    </span>
                    <div className="col-sm-8">
                            <div className="mh-200p overflow-auto p-0">
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
                            name="sharethis_code"
                            defaultValue  = {globalOpt.sharethis_code}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Enable ShareThis:
                    </span>
                    <div className="col-sm-8">
                            <select className="custom-select" {...register("sharethis_active")} defaultValue={globalOpt.sharethis_active}>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>
                </div>
                <h2 className="mt-5">Tawk.to</h2>
                <hr className="mt-0"/>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Tawk.to Code:
                    </span>
                    <div className="col-sm-8">
                        <div className="mh-200p overflow-auto p-0">
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
                            name="tawkto_code"
                            defaultValue  = {globalOpt.tawkto_code}
                        />
                        </div>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Enable Tawk.to:
                    </span>
                    <div className="col-sm-8">
                            <select className="custom-select" {...register("tawkto_active")} defaultValue={globalOpt.tawkto_active}>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>
                </div>
                <h2 className="mt-5">Mailchimp</h2>
                <hr className="mt-0"/>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Mailchimp Code:
                    </span>
                    <div className="col-sm-8">
                        <div className="mh-200p overflow-auto p-0">
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
                            name="mailchimp_code"
                            defaultValue  = {globalOpt.mailchimp_code}
                        />
                        </div>
                    </div>
                </div>
                <h2 className="mt-5">Google API</h2>
                <hr className="mt-0"/>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Google API Key:
                    </span>
                    <div className="col-sm-8">
                            <input className="form-control" type="text" {...register("social_google_key")} defaultValue={globalOpt.social_google_key}/>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Google API Secret:
                    </span>
                    <div className="col-sm-8">
                            <input className="form-control" type="text" {...register("social_google_secret")} defaultValue={globalOpt.social_google_secret}/>
                    </div>
                </div>
            </Tab.Pane>
    );
}
