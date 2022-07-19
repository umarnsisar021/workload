import React,{useState} from 'react';
import { Tab } from "react-bootstrap";
import { useForm,Controller } from "react-hook-form";

import Tooltip from 'react-tooltip-lite';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import "prismjs/themes/prism.css";


export default function siteWide(props) {

    const {globalOpt, register,control} = props;


    return (

            <Tab.Pane eventKey="site_wide_html">
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Head Scripts:
                        <Tooltip
                        content={(
                            <div className="bg-gray-100 p-2">
                                Add HTML within the &lt; head &gt; tag that reflects site-wide.
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
                    <div className="col-sm-8 mh-200p overflow-auto p-0">
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
                            name="head_scripts"
                            defaultValue  = {globalOpt.head_scripts}
                        />
                    </div>

                </div>
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Pre-Body Scripts:
                        <Tooltip
                        content={(
                            <div className="bg-gray-100 p-2">
                                Add HTML immediately before the <br />&lt; /body &gt; tag that reflects site-wide.
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
                    <div className="col-sm-8 mh-200p overflow-auto p-0">
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
                            name="body_scripts"
                            defaultValue  = {globalOpt.body_scripts}
                        />
                    </div>
                </div>
            </Tab.Pane>
    );
}
