import React from "react";
import "./style.css";
import { usePage } from "@inertiajs/inertia-react";



const SessionLayout = (props) => {
    const { base_url,logo } = usePage().props;

    return (
        <div>
            <main className="">

                <div className="auth-layout-wrap" >

                    <div className="auth-content">
                    <div className="text-center mb-5"><img src={`${base_url}/dist-assets/images/logo.png`} alt="" /></div>

                        <div className="card o-hidden">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="p-4">
                                        <div className="text-center mb-4"><img src={`${base_url}/logos/${logo}`} alt="" /></div>
                                        {props.children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="footer-bottom  mb-2 flex-column text-center">
                        <div>
                            <p className="m-0">&copy; CLICKCOMMERCE.BIZ. PROPRIETARY APPLICATION. ALL RIGHTS RESERVED. POWERED BY: WEBINNOVATION.NET</p>
                        </div>
                    </div>


                </div>
                
            </main>

        </div>
    );
}


export default SessionLayout;
