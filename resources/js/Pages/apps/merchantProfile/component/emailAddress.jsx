import React from 'react';
import { Tab } from "react-bootstrap";

export default function emailAddress (props) {

    const {data, register} = props;

    return (

            <Tab.Pane eventKey="email_addresses">

                <h2>Email Addresses</h2>
                <hr className="mt-0"/>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Sales Email:
                    </span>
                    <div className="col-sm-7">
                        <input
                            type="email"
                            {...register("sales_email")}
                            className='form-control'
                            defaultValue={data.sales_email}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Inquiry Email:
                    </span>
                    <div className="col-sm-7">
                        <input
                            type="email"
                            {...register("inquiry_email")}
                            className='form-control'
                            defaultValue={data.inquiry_email}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Support Email:
                    </span>
                    <div className="col-sm-7">
                        <input
                            type="email"
                            {...register("support_email")}
                            className='form-control'
                            defaultValue={data.support_email}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Super Admin Email:
                    </span>
                    <div className="col-sm-7">
                        <input
                            type="email"
                            {...register("super_admin_email")}
                            className='form-control'
                            defaultValue={data.super_admin_email}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Webmaster Email:
                    </span>
                    <div className="col-sm-7">
                        <input
                            type="email"
                            {...register("webmaster_email")}
                            className='form-control'
                            defaultValue={data.webmaster_email}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Backup Primary Email:
                    </span>
                    <div className="col-sm-7">
                        <input
                            type="email"
                            {...register("backup_email_primary")}
                            className='form-control'
                            defaultValue={data.backup_email_primary}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Backup Secondary Email:
                    </span>
                    <div className="col-sm-7">
                        <input
                            type="email"
                            {...register("backup_email_secondary")}
                            className='form-control'
                            defaultValue={data.backup_email_secondary}
                        />
                    </div>
                </div>

            </Tab.Pane>
    );
};

