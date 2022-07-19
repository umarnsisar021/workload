import React from 'react';
import { Tab } from "react-bootstrap";

export default function personalInfo(props) {

    const {data, register} = props;


    return (
            <Tab.Pane eventKey="personal_info">

                <h2>Personal Info</h2>
                <hr className="mt-0"/>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        First Name:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("first_name")}
                            className='form-control'
                            defaultValue={data.first_name}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Last Name:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("last_name")}
                            className='form-control'
                            defaultValue={data.last_name}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Mobile No:
                    </span>
                    <div className="col-sm-7 input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">+92</span>
                        </div>
                        <input
                            {...register("mobile_no")}
                            className='form-control'
                            defaultValue={data.mobile_no}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Personal Email:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("personal_email")}
                            className='form-control'
                            defaultValue={data.personal_email}
                        />
                    </div>
                </div>



            </Tab.Pane>
    );
}
