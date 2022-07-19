import React,{useState} from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { InertiaLink } from "@inertiajs/inertia-react";
import route from 'ziggy-js';
import Form from 'react-bootstrap/Form';
import { Inertia } from '@inertiajs/inertia';

const EditSmsResponder = (props) => {

    const {title,sub_title,id,responder_name,message,add_signature,status,variables,_method} = props;
    const variable = variables.split(",");
    const [values, setValues] = useState({
        id,responder_name,message,add_signature,status,variables,_method,
    })

    function handleChange(event){
        setValues(values=>({...values,[event.target.id]:event.target.value}))
    }

    function handleSubmit(event){
        event.preventDefault();
        // console.log(values)
        Inertia.post(route('sms_responders.update',values.id),values,{});
    }

    return (
        <Layout3 title={title}>
            <div className="row mb-4">
                <div className="col-md-12 mb-4">
                    <form onSubmit={handleSubmit} method="post">
                        <div className="card text-left">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4 className="card-title">
                                            <InertiaLink href={route('sms_responders.index')}>
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
                                    <div className="col-md-4 text-right">
                                        <button type="submit" className="btn btn-primary" >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-md-6 form-group mb-3">
                                        <label>Responder Name</label>
                                        <br />
                                        <label  className="font-weight-bold" style={{fontSize:"20px"}}>{values.responder_name}</label>
                                    </div>

                                    <div className="col-md-6 form-group mb-3"></div>

                                    <div className="col-md-6 form-group mb-3">
                                        <label>Message</label>
                                        <textarea className="form-control" id="message" onChange={handleChange} defaultValue={values.message}></textarea>
                                    </div>

                                    <div className="col-md-6 form-group mb-3"></div>

                                    <div className="col-md-3 form-group mb-3">
                                        <label>Add Signature</label>
                                        <Form.Control as="select" id="add_signature" custom defaultValue={values.add_signature} onChange={handleChange}>
                                            <option value={1} >Yes</option>
                                            <option value={0}>No</option>
                                        </Form.Control>
                                    </div>

                                    <div className="col-md-9 form-group mb-3"></div>

                                    <div className="col-md-3 form-group mb-3">
                                        <label>Status</label>
                                        <Form.Control as="select" id="status" custom defaultValue={values.status} onChange={handleChange}>
                                            <option value={1} >Active</option>
                                            <option value={0}>Inactive</option>
                                        </Form.Control>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <h3>Variables</h3>
                                        {Object.values(variable).map((value,index) =>(
                                            <div key={index}>
                                                <span>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout3>
    );
};

export default EditSmsResponder;
