import React, { Component } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Inertia } from '@inertiajs/inertia';
import route from "ziggy-js"
import  axios from 'axios';
import MoonLoader from "react-spinners/MoonLoader";
function Register (props)  {

    const override  = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };


    React.useEffect(()=>{
        axios.post('/db/migration/create').then(function (response) {
            // handle success
            if (response.status == 200){

            }
        })
    },[])

    return <div
        className="auth-layout-wrap"
        style={{
            background:"light-gray"
        }}
    >
        <div className="auth-content">
            <div className="card o-hidden">
                <div className="row">


                    <div className="col-md-12 text-center">
                        <div className="p-4">
                            <h2>Creating Database</h2>
                            <p>Please wail until database created.</p>
                            <div style={{display:'inline-flex',justifyContent: 'center',width:'100%'}}>

                                <MoonLoader color={"#639"} loading={true} size={100} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



}



export default Register;
