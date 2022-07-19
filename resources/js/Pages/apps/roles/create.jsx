import React, {useState} from 'react';
import Layout3 from '../../../@gull/GullLayout/Layout3/Layout3';
import { InertiaLink , usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';

const createRole = (props) => {

    const {sub_title,title,list_url,store_url,errors}=props;

    const [values, setValues] = useState({
        name: '',
        description: '',
    })

    function handleChange(event){
        setValues(values=>({...values,[event.target.id]:event.target.value}))
    }

    function handleSubmit(event){
        event.preventDefault();
        Inertia.post(store_url,values);
    }

    return (
        <Layout3 title={title}>
           <form  method="post" onSubmit={handleSubmit}>
            <div className="row mb-4">
                    <div className="col-md-12 mb-4">
                        <div className="card text-left">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4 className="card-title">
                                            <InertiaLink href={route('roles.index')}>
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
                                            <button
                                            type="submit"
                                            className="btn btn-primary ladda-button example-button"
                                            id="form-submit"
                                            >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">

                                    <div className="row">

                                        <div className="col-md-6 form-group mb-3">
                                            <label>Name</label>
                                            <input className={errors.name?'form-control is-invalid' : 'form-control'} id="name"  name="name" type="text" onChange={handleChange} value={values.role_name}/>
                                            {errors.name && <span className="text-danger">{errors.name}</span>}
                                        </div>

                                        <div className="col-md-6 form-group mb-3">
                                            <label>Description</label>
                                            <textarea className={errors.description?'form-control is-invalid' : 'form-control'} id="description" name="description" onChange={handleChange} defaultValue={values.description}></textarea>
                                            {errors.description && <span className="text-danger">{errors.description}</span>}
                                        </div>

                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Layout3>
    );
};

export default createRole;
