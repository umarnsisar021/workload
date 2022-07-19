import React from "react";
import Layout3 from "../../@gull/GullLayout/Layout3/Layout3";
import { widgets } from "../../@gull/widgets";


const Home = (props) => {
    const {title,sub_title}=props;
    return (
            <Layout3 title={title}>
                <div className="row mb-4">
                    <div className="col-md-12 mb-4">
                        <div className="card text-left">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4 className="card-title"><span className="font-weight-bold" style={{fontSize:"22px"}}>{title} </span>/ {sub_title}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">

                                   {widgets.map((value, index)=>(
                                        <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                                            <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                                                <div className="card-body text-center"><i className={value.icon}></i>
                                                    <div className="content">
                                                        <p className="text-muted mt-2 mb-0">{value.heading}</p>
                                                        <p className="text-primary text-24 line-height-1 mb-2">{value.data}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout3>
    );
};

export default Home;
