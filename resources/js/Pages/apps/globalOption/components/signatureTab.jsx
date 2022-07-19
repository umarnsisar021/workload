import React,{useRef} from 'react';
import { Tab } from "react-bootstrap";
import { useForm,Controller } from "react-hook-form";

import JoditEditor from "jodit-react";

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import "prismjs/themes/prism.css";


export default function signatureTab(props) {

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
            <Tab.Pane eventKey="signature">
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Email Signature:
                    </span>
                    <div className="col-sm-8">
                        <Controller
                            render={
                                ({ field }) => <JoditEditor {...field}
                                ref={editor}
                                value={globalOpt.signature_email}
                                config={config}
                                />
                            }
                            control={control}
                            name="signature_email"
                            defaultValue  = {globalOpt.signature_email}
                        />
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        SMS Signature:
                    </span>
                    <div className="col-sm-8">
                            <textarea className="form-control" {...register("signature_sms")} defaultValue={globalOpt.signature_sms}/>
                    </div>
                </div>
            </Tab.Pane>
    );
}
