import React, {useState, useRef, useEffect}  from 'react';
import Layout3 from "../../../@gull/GullLayout/Layout3/Layout3";

import { Tab,Tabs,Row,Col,Nav } from "react-bootstrap";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import route from "ziggy-js";



import JoditEditor from "jodit-react";

import Tooltip from 'react-tooltip-lite';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import "prismjs/themes/prism.css";


import { useForm, Controller } from "react-hook-form";

import "./style.css";

                /* Import Components */
import TabLinks from './components/tab_nav';
import SecurityTab from './components/securityTab';
import OtherTab from './components/otherTab';
import ApiTab from './components/apisTab';
import SignatureTab from './components/signatureTab';
import EmailSetting from './components/emailSetting';
import SiteWide from './components/siteWide';
import Maintenance from './components/maintenance';
import Message from './components/message';
import Reset from './components/reset';
                /* Import Components */

const globalOption = (props) => {


    const {title, sub_title, globalOpt, total_tables,getPermission}=props;
    const { register, getValues, control } = useForm();


    //Get Permission from array
    const viewFound = getPermission.find(element => element == 'view');
    const editFound = getPermission.find(element => element == 'update');
    //Get Permission from array

    const editor = useRef(null)
    const config = {
		readonly: false,
        toolbarSticky: false,
        toolbarButtonSize: "small",
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false
    }



    function handleSubmit(event){

        event.preventDefault();
        const values = getValues()
        Inertia.post(route('settings.store'),values);
    }



    return (
        <Layout3 title={title}>
        <form method="post" onSubmit={handleSubmit}>
            <div className="row mb-4">
                <div className="col-md-12 mb-4">
                    <div className="card text-left">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-md-8">
                                    <h4 className="card-title">
                                        <InertiaLink href='/home'>
                                            <span
                                                className="font-weight-bold"
                                                style={{ fontSize: "22px" }}
                                            >
                                                {title}
                                            </span>
                                        </InertiaLink>
                                        / {sub_title}
                                    </h4>
                                </div>
                                {editFound &&
                                    <div className="col-md-4 text-right">
                                        <button
                                            type="submit"
                                            className="btn btn-primary ladda-button example-button"
                                            id="form-submit"
                                            >
                                            Save
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="card-body">
                                <Tab.Container
                                    id="left-tabs-example"
                                    defaultActiveKey="security"
                                >
                                    <Row>
                                        <Col sm={3}>
                                            <TabLinks />
                                        </Col>
                                        <Col sm={9}>
                                            <Tab.Content>
                                                {/* SECURITY TABS */}
                                                <SecurityTab register={register} control={control} globalOpt={globalOpt} />
                                                {/* SECURITY TABS */}

                                                {/* OTHER TAB  */}
                                                <OtherTab register={register} control={control} globalOpt={globalOpt} />
                                                {/* OTHER TAB  */}

                                                {/* APIs TAB */}
                                                <ApiTab register={register} control={control} globalOpt={globalOpt} />
                                                {/* APIs TAB */}

                                                {/* SIGNATURE TAB */}
                                                <SignatureTab register={register} control={control} globalOpt={globalOpt} />
                                                {/* SIGNATURE TAB */}

                                                {/* EMAIL SETTING TAB */}
                                                <EmailSetting register={register} control={control} globalOpt={globalOpt} />
                                                {/* EMAIL SETTING TAB */}

                                                {/* SITE WIDE HTML TAB */}
                                                <SiteWide register={register} control={control} globalOpt={globalOpt} />
                                                {/* SITE WIDE HTML TAB */}

                                                {/* MAINTENANCE TABS */}
                                                <Maintenance register={register} control={control} globalOpt={globalOpt} total_tables={total_tables} />
                                                {/* MAINTENANCE TABS */}

                                                {/* MESSAGE TAB */}
                                                <Message register={register} control={control} globalOpt={globalOpt} />
                                                {/* MESSAGE TAB */}

                                                {/* RESET TAB */}
                                                <Reset register={register} control={control} globalOpt={globalOpt} />
                                                {/* RESET TAB */}

                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </Layout3>
    );
};

export default globalOption;
