import React from 'react';
import { Tab } from "react-bootstrap";

export default function instantMessage(props) {

    const {data, register} = props;


    return (

        <Tab.Pane eventKey="instant_message">

            <div className="form-group row mb-2">
                <span className="col-sm-5">
                    Skype:
                </span>
                <div className="col-sm-7">
                    <input
                        {...register("skype")}
                        className='form-control'
                        defaultValue={data.skype}
                    />
                </div>
            </div>

            <div className="form-group row mb-2">
                <span className="col-sm-5">
                    Hangout:
                </span>
                <div className="col-sm-7">
                    <input
                        {...register("gtalk")}
                        className='form-control'
                        defaultValue={data.gtalk}
                    />
                </div>
            </div>

            <div className="form-group row mb-2">
                <span className="col-sm-5">
                    MSN:
                </span>
                <div className="col-sm-7">
                    <input
                        {...register("msn")}
                        className='form-control'
                        defaultValue={data.msn}
                    />
                </div>
            </div>

            <div className="form-group row mb-2">
                <span className="col-sm-5">
                    Yahoo:
                </span>
                <div className="col-sm-7">
                    <input
                        {...register("yahoo")}
                        className='form-control'
                        defaultValue={data.yahoo}
                    />
                </div>
            </div>

        </Tab.Pane>
    );
}
