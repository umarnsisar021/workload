import React,{useState, useRef} from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { InertiaLink } from "@inertiajs/inertia-react";
import route from 'ziggy-js';
import JoditEditor from "jodit-react";
import Form from 'react-bootstrap/Form'
import { Inertia } from '@inertiajs/inertia';

const EditEmailResponder = (props) => {

    const {sub_title,title,id,responder_name,from_email,from_name,subject,message,add_signature,status,variables,_method} =props;
    const variable = variables.split(",");


    /* RICH TEXT EDITOR */

    const editor = useRef(null)

	const config = {
		readonly: false,
        "toolbarSticky": false
	}

    /* RICH TEXT EDITOR */

    const [setContent] = useState('')
    const [values, setValues] = useState({
        id,responder_name,from_email,from_name,subject,message,add_signature,status,variables,_method,
    })


    function handleChange(event){
        setValues(values=>({...values,[event.target.id]:event.target.value}))
    }

    function handleChangeRich(value){
        setValues(values=>({...values,message:value}))
    }

    function handleCheck(event)
    {

        const target = event.currentTarget;
        const value1 = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;
        const value = value1 == true ? 1 : 0;

        setValues({
            ...values, [name]: value
        });
    }

    function handleSubmit(event){

        event.preventDefault();
        //console.log(values)
        Inertia.post(route('email_responder.update',values.id),values,{});
    }

    return (
        <Layout3 title={title}>
            <div className="row mb-4">
                <div className="col-md-12 mb-4">
                    <form  method="post" onSubmit={handleSubmit}>
                        <div className="card text-left">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4 className="card-title">
                                            <InertiaLink href={route('email_responder.index')}>
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
                                            {/* {errors.name && <span className="text-danger">{errors.responder_name}</span>} */}
                                        </div>

                                        <div className="col-md-6 form-group mb-3"></div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>From Email</label>
                                            <input className='form-control' id="from_email"  name="from_email" type="email" onChange={handleChange} value={values.from_email}/>
                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>From Name</label>
                                            <input className='form-control' id="from_name"  name="from_name" type="text" onChange={handleChange} value={values.from_name}/>
                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>From Subject</label>
                                            <input className='form-control' id="subject"  name="subject" type="text" onChange={handleChange} value={values.subject}/>
                                        </div>

                                        <div className="col-md-12 form-group mb-3">
                                            <label>Message</label>
                                            <JoditEditor
                                                ref={editor}
                                                id="message"
                                                value={values.message}
                                                config={config}
                                                onBlur={handleChangeRich}
                                            />
                                        </div>

                                        <div className="col-md-12 form-group mb-3">
                                            <span className="col-sm-4">
                                                Add Signature
                                            </span>
                                            <label className="switch pr-5 switch-primary mr-3">
                                                <input
                                                    id="add_signature"
                                                    type="checkbox"
                                                    onChange={
                                                        handleCheck
                                                    }
                                                    checked={
                                                        values.add_signature
                                                    }
                                                />
                                                <span className="slider"></span>
                                            </label>
                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>Message</label>
                                            <Form.Control as="select" id="status" custom defaultValue={values.status} onChange={handleChange}>
                                                <option value={1} >Active</option>
                                                <option value={0}>InActive</option>
                                            </Form.Control>
                                        </div>

                                    </div>
                                <br />
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

export default EditEmailResponder;
