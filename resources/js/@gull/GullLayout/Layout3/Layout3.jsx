import React, { Suspense, useState } from "react";
import Footer from "../SharedComponents/Footer";
import { classList } from "../../@utils";
import Layout3Header from "./Layout3Header";
import { Breadcrumb, Loading } from "../../../@gull";
import { usePage } from '@inertiajs/inertia-react';
import Alert from 'react-bootstrap/Alert'
import "./style.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ScrollButton from '../SharedComponents/ScrollButton';


const Layout3 = (props) => {
  const SharedData = usePage();
  const logs = SharedData.props.logs;
  React.useEffect(() => {
    document.title = props.title+ " :: clickcommerce.biz";
  });

  const [show, setShow] = useState(true);
  //   const handleSearchBoxClose = () => {

  //   };


  return (
    <div>
      <div className="app-admin-wrap  layout-horizontal-bar">
        <Layout3Header></Layout3Header>

        <div
          className={classList({
            "main-content-wrap d-flex flex-column": true
          })}
        >
          <div className="main-content">
            <Suspense fallback={<Loading></Loading>}>
              <Breadcrumb></Breadcrumb>

              {SharedData.props.type_alert && show ? (
                <Alert variant={SharedData.props.type_alert} onClose={() => setShow(false)} dismissible>
                  <span className="text-primary ">
                    <b>{SharedData.props.msg}</b>
                  </span>
                </Alert>
              ) : ''
              }

              {props.children}

              {logs&&(<div className="card text-left ">
                  <div className="card-body">
                  <small alt="Create Date & Last Updated" title="Create Date & Last Updated">
                          Created at: {logs.created_at} | By: {logs.created_by}
                          <br />                                        
                          Modified at: {logs.updated_at} | By: {logs.updated_by}
                  </small>
                  </div>
              </div>)
              }
            </Suspense>

            <ScrollButton />
            <ToastContainer />

          </div>

         <Footer></Footer> 
        </div>
      </div>

    </div>
  );
}


export default Layout3;
