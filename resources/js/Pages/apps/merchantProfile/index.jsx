import React from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';;
import { InertiaLink } from "@inertiajs/inertia-react";
import { Tab,Tabs,Row,Col,Nav } from "react-bootstrap";
import route from 'ziggy-js';
import { useForm,Controller } from "react-hook-form";
import { Inertia } from '@inertiajs/inertia';
import swal from '@sweetalert/with-react';
                /* Import Components */
import TabLinks from './component/tabs_nav';
import CompanyDetails from './component/companyDetails';
import PersonalInfo from './component/personalInfo';
import EmailAddress from './component/emailAddress';
import InstantMessage from './component/instantMessage';
import SocialNetwork from './component/socialNetwork';
import SiteLogo from './component/siteLogo';
                /* Import Components */

const merchantProfile = (props) => {



    // const callbackfn = (value) => {
    //     alert(value);
    // }

    const {title,sub_title,data,img_url,errors,getPermission}=props;

    const { register,getValues,setValue,control } = useForm();

    //Get Permission from array
    const viewFound = getPermission.find(element => element == 'view');
    const editFound = getPermission.find(element => element == 'update');
    //Get Permission from array


    function handleSubmit(event){

        event.preventDefault();
        const values = getValues();
console.log(values)
        swal({

            title: "Edit Confirmation!",
            text: "Are you sure to Save this record?",
            icon: "warning",
            buttons: true,
        })
        .then((willEdit) => {
            if (willEdit) {
                Inertia.post(route('merchant_profile.update',data.id),values,{forceFormData: true,});
            }
        });

    }


    return (
        <Layout3 title={title}>
            <form onSubmit={handleSubmit} >
                <input
                    {...register("id")}
                    type="hidden"
                    defaultValue={data.id}
                />
                <input
                    {...register("_method")}
                    type="hidden"
                    defaultValue={'PUT'}
                />
                <div className="row mb-4">
                    <div className="col-md-12 mb-4">
                        <div className="card text-left">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4 className="card-title">
                                            <InertiaLink href={route('home')}>
                                                <span
                                                    className="font-weight-bold"
                                                    style={{ fontSize: "22px" }}
                                                >
                                                    {title}{" "}
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

                                <Tab.Container id="left-tabs-example" defaultActiveKey="company_details" >
                                    <Row>
                                        <Col sm={3}>
                                            <TabLinks />
                                        </Col>

                                        <Col sm={9}>
                                            <Tab.Content>

                                                {/* COMPANY DETAILS TAB START */}
                                                <CompanyDetails register={register} control={control} data={data} />
                                                {/* COMPANY DETAILS TAB END */}

                                                {/* PERSONAL INFO TAB START */}
                                                <PersonalInfo register={register} data={data} />
                                                {/* PERSONAL INFO TAB END */}

                                                {/* EMAIL ADDRESSES TAB START */}
                                                <EmailAddress register={register} data={data}/>
                                                {/* EMAIL ADDRESSES TAB END */}


                                                {/* INSTANT MESSAGE TAB START */}
                                                <InstantMessage register={register} data={data} />
                                                {/* INSTANT MESSAGE TAB END */}

                                                {/* SOCIAL NETWORKING TAB START */}
                                                <SocialNetwork register={register} data={data} />
                                                {/* SOCIAL NETWORKING TAB END */}

                                                {/* SITE LOGOS TAB START */}
                                                <SiteLogo register={register} setValue={setValue} data={data} errors={errors} img_url={img_url }/>
                                                {/* SITE LOGOS TAB END */}

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

export default merchantProfile;
