import React from 'react';
import { Tab } from "react-bootstrap";

export default function socialNetwork(props) {

    const {data, register} = props;

    return (

            <Tab.Pane eventKey="social_networking">
                <h2>Social Networking</h2>
                <hr className="mt-0"/>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Facebook:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("facebook")}
                            className='form-control'
                            defaultValue={data.facebook}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Twitter:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("twitter")}
                            className='form-control'
                            defaultValue={data.twitter}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Tumbler:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("tumbler")}
                            className='form-control'
                            defaultValue={data.tumbler}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Pinterest:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("pinterest")}
                            className='form-control'
                            defaultValue={data.pinterest}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        YouTube:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("youtube")}
                            className='form-control'
                            defaultValue={data.youtube}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Google Plus:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("gplus")}
                            className='form-control'
                            defaultValue={data.gplus}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Linkedin:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("linkedin")}
                            className='form-control'
                            defaultValue={data.linkedin}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Instagram:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("instagram")}
                            className='form-control'
                            defaultValue={data.instagram}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        IMO:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("imo")}
                            className='form-control'
                            defaultValue={data.imo}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        WhatsApp:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("whatsapp")}
                            className='form-control'
                            defaultValue={data.whatsapp}
                        />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        WeChat:
                    </span>
                    <div className="col-sm-7">
                        <input
                            {...register("wechat")}
                            className='form-control'
                            defaultValue={data.wechat}
                        />
                    </div>
                </div>
            </Tab.Pane>
    );
}
