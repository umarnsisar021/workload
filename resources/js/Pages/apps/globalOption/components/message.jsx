import React,{useRef} from 'react';
import { Tab } from "react-bootstrap";
import { useForm,Controller } from "react-hook-form";

import JoditEditor from "jodit-react";

export default function message(props) {

    const {globalOpt, register,control} = props;

    const editor = useRef(null)
    const config = {
		readonly: false,
        toolbarSticky: false,
        toolbarButtonSize: "small",
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false
    }


    return (
                <Tab.Pane eventKey="message">
                    <div className="form-group row mb-2">
                        <span className="col-sm-4 mt-2">
                            Refer To Friend:
                        </span>
                        <div className="col-sm-8">
                            <Controller
                                render={
                                    ({ field }) => <JoditEditor {...field}
                                    ref={editor}
                                    value={globalOpt.system_message_1}
                                    config={config}
                                    />
                                }
                                control={control}
                                name="system_message_1"
                                defaultValue  = {globalOpt.system_message_1}
                            />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <span className="col-sm-4 mt-2">
                            Password changed:
                        </span>
                        <div className="col-sm-8">
                            <Controller
                                render={
                                    ({ field }) => <JoditEditor {...field}
                                    ref={editor}
                                    value={globalOpt.system_message_2}
                                    config={config}
                                    />
                                }
                                control={control}
                                name="system_message_2"
                                defaultValue  = {globalOpt.system_message_2}
                            />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <span className="col-sm-4 mt-2">
                            Profile updated:
                        </span>
                        <div className="col-sm-8">
                            <Controller
                                render={
                                    ({ field }) => <JoditEditor {...field}
                                    ref={editor}
                                    value={globalOpt.system_message_3}
                                    config={config}
                                    />
                                }
                                control={control}
                                name="system_message_3"
                                defaultValue  = {globalOpt.system_message_3}
                            />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <span className="col-sm-4 mt-2">
                            Forgot password:
                        </span>
                        <div className="col-sm-8">
                            <Controller
                                render={
                                    ({ field }) => <JoditEditor {...field}
                                    ref={editor}
                                    value={globalOpt.system_message_4}
                                    config={config}
                                    />
                                }
                                control={control}
                                name="system_message_4"
                                defaultValue  = {globalOpt.system_message_4}
                            />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <span className="col-sm-4 mt-2">
                            Registration completed:
                        </span>
                        <div className="col-sm-8">
                            <Controller
                                render={
                                    ({ field }) => <JoditEditor {...field}
                                    ref={editor}
                                    value={globalOpt.system_message_5}
                                    config={config}
                                    />
                                }
                                control={control}
                                name="system_message_5"
                                defaultValue  = {globalOpt.system_message_5}
                            />
                        </div>
                    </div>
                    <div className="form-group row mb-2">
                        <span className="col-sm-4 mt-2">
                            Checkout Terms:
                        </span>
                        <div className="col-sm-8">
                            <Controller
                                render={
                                    ({ field }) => <JoditEditor {...field}
                                    ref={editor}
                                    value={globalOpt.system_message_6}
                                    config={config}
                                    />
                                }
                                control={control}
                                name="system_message_6"
                                defaultValue  = {globalOpt.system_message_6}
                            />
                        </div>
                    </div>
                </Tab.Pane>
    );
}
