import React from 'react';
import { Tab } from "react-bootstrap";
import { Controller } from "react-hook-form";

import "../style.css";

export default function securityTab(props) {

    const {globalOpt, register,control} = props;

    return (
            <Tab.Pane eventKey="security">
                <div className="form-group row mb-2">
                    <span className="col-sm-4">
                        Enable HTTPS:
                    </span>
                    <div className="col-sm-8">
                        <label className="switch pr-5 switch-primary mr-3">
                            <input {...register('enable_https')}
                                type="checkbox"
                                defaultChecked={(globalOpt.enable_https == '1')? true : false}
                            />
                            <span className="slider"></span>
                        </label>
                        {/* using react hook form controller */}
                        {/* <Controller
                        render={
                            ({ field }) =>
                            <label className="switch pr-5 switch-primary mr-3">
                                <input {...field}
                                    type="checkbox"
                                />
                                <span className="slider"></span>
                            </label>
                        }
                        control={props.control}
                        name="enable_https"
                        defaultValue={(globalOpt.enable_https == '1')? true : false}
                        /> */}
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-4">
                        COOKIES Message:
                    </span>
                    <div className="col-sm-8">

                        <label className="switch pr-5 switch-primary mr-3">
                            <input {...register('enable_cookies')}
                                type="checkbox"
                                defaultChecked={(globalOpt.enable_cookies == '1')? true : false}
                            />
                            <span className="slider"></span>
                        </label>

                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-4">
                        Disable User Logins:{" "}
                    </span>
                    <div className="col-sm-8">

                        <label className="switch pr-5 switch-primary mr-3">
                            <input {...register('disable_user_logins')}
                                type="checkbox"
                                defaultChecked={(globalOpt.disable_user_logins == '1')? true : false}
                            />
                            <span className="slider"></span>
                        </label>

                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-4">
                        Disable Admin
                        Logins:{" "}
                    </span>
                    <div className="col-sm-8">

                        <label className="switch pr-5 switch-primary mr-3">
                            <input {...register('disable_admin_logins')}
                                type="checkbox"
                                defaultChecked={(globalOpt.disable_admin_logins == '1')? true : false}
                            />
                            <span className="slider"></span>
                        </label>

                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-4">
                        Login Auditing:
                    </span>
                    <div className="col-sm-8">

                        <label className="switch pr-5 switch-primary mr-3">
                            <input {...register('login_auditing')}
                                type="checkbox"
                                defaultChecked={(globalOpt.login_auditing == '1')? true : false}
                            />
                            <span className="slider"></span>
                        </label>

                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-4">
                        Black Listed IPs:
                    </span>
                    <div className="col-sm-8">
                        <textarea
                            className="form-control"
                            {...props.register("black_listed_ips")}
                            defaultValue={
                                globalOpt.black_listed_ips
                            }
                        ></textarea>
                    </div>
                </div>
            </Tab.Pane>
    );
}
