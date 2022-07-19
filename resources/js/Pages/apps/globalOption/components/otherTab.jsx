import React from 'react';
import { Tab } from "react-bootstrap";
import { Controller } from "react-hook-form";

import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';

export default function otherTab(props) {

    const {globalOpt, register,control} = props;

    function buildOptions() {
        var arr = [];

        for (let i = 10; i <= 100; i++) {
            arr.push(<option key={i} value={i}>{i}</option>)
        }

        return arr;
    }

    return (

            <Tab.Pane eventKey="other">
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        No. of Items Per
                        Page: (Back End)
                    </span>
                    <div className="col-sm-8">
                            <select className="custom-select" {...register("no_of_items_per_page")} defaultValue={globalOpt.no_of_items_per_page}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                            <option value="70">70</option>
                            <option value="80">80</option>
                            <option value="90">90</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        No. of Items Per
                        Page: (Front End)
                    </span>
                    <div className="col-sm-8">
                            <select className="custom-select" {...register("no_of_items_per_page2")} defaultValue={globalOpt.no_of_items_per_page2}>
                                {/* generating options using for loop */}
                            {buildOptions()}
                        </select>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Time Zone:
                    </span>
                    <div className="col-sm-8">
                        <Controller
                            render={
                                ({ field }) => <TimezonePicker {...field}
                                className="w-100"
                                absolute= {true}
                                placeholder   = "Select timezone..."
                                />
                            }
                            control={control}
                            name="timezone"
                            defaultValue  = {globalOpt.timezone}
                        />
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4">
                        Show Islamic Date:
                    </span>
                    <div className="col-sm-8">
                        <label className="switch pr-5 switch-primary mr-3">
                            <input {...register('show_islamic_date')}
                                type="checkbox"
                                defaultChecked={(globalOpt.show_islamic_date == '1')? true : false}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
            </Tab.Pane>
    );
}
