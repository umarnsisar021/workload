import React,{useState} from 'react';
import { Tab } from "react-bootstrap";
//import { useForm,Controller } from "react-hook-form";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";

import Tooltip from 'react-tooltip-lite';

export default function emailSetting(props) {

    const {globalOpt, register,control} = props;

    const [email_test, setEmailTest] = useState("");

    return (

            <Tab.Pane eventKey="email_setting">
                <h2 className="d-inline-block">Email SMTP</h2>
                <Tooltip
                content={(
                    <div className="bg-gray-100 p-2">
                        <strong>Email SMTP Typical Settings</strong>

                        <p>
                            SMTP settings are simply your outgoing mail server settings; this particular protocol<br /> only works for outgoing messages.
                            <br /><br />
                            SMTP Host: mail.domain.com<br />
                            SMTP Port: 25 or 26<br />
                            SMTP User: email@domain.com<br />
                            SMTP Password: [Your Password]<br />
                        </p>

                        <strong>Note :</strong> Please contact your email service provider for accurate account settings.
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
                        Email Protocol:
                    </span>
                    <div className="col-sm-8">
                            <select className="custom-select" {...register("email_protocol")} defaultValue={globalOpt.email_protocol}>
                            <option value="SMTP">SMTP</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        SMTP Host:
                    </span>
                    <div className="col-sm-8">
                            <input className="form-control" type="text" {...register("email_smtp_host")} defaultValue={globalOpt.email_smtp_host}/>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        SMTP Port:
                    </span>
                    <div className="col-sm-8">
                            <input className="form-control" type="text" {...register("email_smtp_port")} defaultValue={globalOpt.email_smtp_port}/>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        SMTP User:
                    </span>
                    <div className="col-sm-8">
                            <input className="form-control" type="text" {...register("email_smtp_user")} defaultValue={globalOpt.email_smtp_user}/>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        SMTP Password:
                    </span>
                    <div className="col-sm-8">
                            <input className="form-control" type="password" {...register("email_smtp_password")} defaultValue={globalOpt.email_smtp_password}/>
                    </div>
                </div>
                <hr className="mt-0"/>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Email Address:
                <Tooltip
                content={(
                    <div className="bg-gray-100 p-2">
                        <strong>Test Email</strong>
                        <p>You can check email settings by sending test email.</p>
                    </div>
                )}
                direction="right"
                tagName="span"
                className="d-inline-block m-1"
                tipContentClassName=""
                >
                    <i className="fa fa-question-circle"></i>
                </Tooltip>
                    </span>
                    <div className="col-sm-8">
                        <input className="form-control" type="email" id="email_test" defaultValue={email_test} onBlur={
                            () => {
                                setEmailTest(event.target.value)
                            }
                        }
                        />
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <div className="col-sm-12 text-right">
                        <InertiaLink href='/send_email' method="post" className="btn btn-secondary" as="button" type="button" data={{ email_test: email_test }}>Send Test Email</InertiaLink>
                    </div>
                </div>
            </Tab.Pane>
    );
}
