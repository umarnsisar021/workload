import React,{useRef} from 'react';
import { Tab } from "react-bootstrap";
import { useForm,Controller } from "react-hook-form";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import GetMyIP from "../../../../@gull/components/GetMyIP";

import JoditEditor from "jodit-react";
import Tooltip from 'react-tooltip-lite';


export default function maintenance(props) {

    const {globalOpt, register,control,total_tables} = props;

    const editor = useRef(null)
    const config = {
		readonly: false,
        toolbarSticky: false,
        toolbarButtonSize: "small",
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false
    }

    return (

            <Tab.Pane eventKey="maintenance">
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                    Website Status:
                    </span>
                    <div className="col-sm-8">
                        <select className="custom-select" {...register("website_status")} defaultValue={globalOpt.website_status}>
                            <option value="LIVE">LIVE</option>
                            <option value="DOWN">DOWN</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                    Site Down Message:
                    </span>
                    <div className="col-sm-8">
                        <Controller
                            render={
                                ({ field }) => <JoditEditor {...field}
                                ref={editor}
                                value={globalOpt.site_down_message}
                                config={config}
                                />
                            }
                            control={control}
                            name="site_down_message"
                            defaultValue  = {globalOpt.site_down_message}
                        />
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                    Site Down URL:
                    </span>
                    <div className="col-sm-8">
                        <input className="form-control" type="text" {...register("site_down_url")} defaultValue={globalOpt.site_down_url}/>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                    Exclude IP (Comma sep. IPs):
                    </span>
                    <div className="col-sm-8">
                        <textarea className="form-control" {...register("exclude_ip")} defaultValue={globalOpt.exclude_ip} ></textarea>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                    Your IP:
                    </span>
                    <div className="col-sm-8">
                        <GetMyIP></GetMyIP>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                    Last online:
                    </span>
                    <div className="col-sm-8">
                        <p>{ globalOpt.last_online }</p>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                    Last offline:
                    </span>
                    <div className="col-sm-8">
                        <p>{ globalOpt.last_offline }</p>
                    </div>
                </div>

                <h2 className="d-inline-block mt-5">Database</h2>
                <hr className="mt-0"/>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                    Total Number of Tables:
                    </span>
                    <div className="col-sm-8">
                        <span>{total_tables}</span>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                    Database Backup:
                    </span>
                    <div className="col-sm-8">
                        <InertiaLink href='/create_backup' method="post" className="btn btn-info" as="button" type="button">Create</InertiaLink>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                    Latest Backup:
                    </span>
                    <div className="col-sm-8">
                        <a href={route('download_backup')} className="btn btn-info" > Download</a>
                    </div>
                </div>

                <h2 className="d-inline-block mt-5">Other</h2>
                <hr className="mt-0"/>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                    Cache:
                    </span>
                    <div className="col-sm-8">
                        <InertiaLink href='/clear_cache' method="post" className="btn btn-info" as="button" type="button">Clear Cache</InertiaLink>
                        <Tooltip
                        content={(
                            <div className="bg-gray-100 p-2">
                                <strong>Remove all cached files</strong>
                                <p>Useful for when problems arise which possibly have something to do with the cache. <br /> Remember clearing the cache might cause some errors when a page is reloaded for the first time.</p>
                            </div>
                        )}
                        direction="up"
                        tagName="span"
                        className="d-inline-block m-1"
                        tipContentClassName=""
                        >
                            <i className="fa fa-question-circle"></i>
                        </Tooltip>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                    PHP Info:
                    </span>
                    <div className="col-sm-8">
                        <InertiaLink href='/server_info' method="post" className="btn btn-info" as="button" type="button">View</InertiaLink>
                    </div>
                </div>
            </Tab.Pane>

    );
}
