import React, {useState} from 'react';
import SessionLayout from "../../@gull/GullLayout/Session/SessionLayout";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import route from "ziggy-js";

const login = (props) => {

    const { base_url } = usePage().props;
    const { title } = props;
    const { errors } = props
    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    function handleChange(event){
        setValues(values=>({...values,[event.target.id]:event.target.value}))
    }

    function handleSubmit(event){
        event.preventDefault();
        const formData =new FormData();
        formData.append('email',values.email);
        formData.append('password',values.password);
        Inertia.post(route('login'),formData)
    }

    return (
        <SessionLayout>
            <h1 className="mb-3 text-18">{ title }</h1>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input id="email" type="email" className={errors.email?'form-control form-control-rounded is-invalid' : 'form-control form-control-rounded'} name="email" onChange={handleChange} />
                        {errors.email &&
                            <span className="text-danger" role="alert">
                                <strong>{errors.email}</strong>
                            </span>
                        }
                    </div>
                    <div className="form-group ">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" autoComplete="on" className={errors.password?'form-control form-control-rounded is-invalid' : 'form-control form-control-rounded'} name="password" onChange={handleChange}/>
                        {errors.password &&
                            <span className="text-danger" role="alert">
                                <strong>{errors.password}</strong>
                            </span>
                        }
                    </div>

                    <div className="form-group ">
                        <div className="col-md-6 ">
                            <div className="form-check">
                                {/* <input className="form-check-input" type="checkbox" name="remember" id="remember" />
                                <label className="form-check-label" htmlFor="remember">
                                    Remember Me
                                </label> */}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-rounded btn-primary btn-block mt-2">Login</button>
                </form>
                {/* <div className="mt-3 text-center">

                        <a className="btn btn-link text-muted" href="">
                            <u>Forgot Your Password?</u>
                        </a>

                </div> */}
        </SessionLayout>
    );
};

export default login;
