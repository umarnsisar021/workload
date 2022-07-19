import React, {useState,useRef} from 'react';
import { Tab } from "react-bootstrap";
import ImagePreview from "../../../../GeneralComponent/imagePreview";

export default function siteLogo(props) {

    const {data, register,errors,img_url,setValue} = props;

    /* Class Styling Variable */
    const fileClass = {
        padding: "0.175rem 0.55rem",
    };
    /* Class Styling Variable */

    const {logoRef,logo2Ref,favRef} = useRef(null);

    const [picture, setPicture] = useState('');
    const [picture1, setPicture1] = useState('');
    const [favIcon, setFavicon] = useState('');

    const onChangePicture = event => {
        setPicture(URL.createObjectURL(event.target.files[0]));
        setValue('logo',event.target.files[0]);
    };

    const onChangePicture1 = event => {
        setPicture1(URL.createObjectURL(event.target.files[0]));
        setValue('logo2',event.target.files[0])
    };

    const onChangefavicon  = event => {
        setFavicon(URL.createObjectURL(event.target.files[0]));
        setValue('favicon',event.target.files[0]);
    };

    return (
            <Tab.Pane eventKey="site_logos">

                <h2>Site Logos</h2>
                <hr className="mt-0"/>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Brand Logo:
                    </span>
                    <div className="col-sm-7">

                        <input
                            type="file"
                            name="logo"
                            ref={logoRef}
                            onChange={onChangePicture}
                            accept=".png,.jpeg,.jpg"
                            className="form-control"
                            style={fileClass}
                        />
                    </div>
                    {errors.logo && <span className="text-danger font-weight-bold">{errors.logo}</span>}
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">

                    </span>
                    <div className="col-sm-7">

                        <ImagePreview
                            values={{
                                className:"playerProfilePic_home_tile",
                                height:'122',
                                width:'300',
                                src:(data.logo==null) ? picture : img_url+'/'+data.logo ,
                                onError:(e)=>{e.target.onerror = null; e.target.src=img_url+'/logo-default.png'}
                            }}
                        />

                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Report Logo:
                    </span>
                    <div className="col-sm-7">

                        <input
                            type="file"
                            name="logo2"
                            ref={logo2Ref}
                            onChange={onChangePicture1}
                            accept=".png,.jpeg,.jpg"
                            className="form-control"
                            style={fileClass}
                        />

                    </div>
                    {errors.logo2 && <span className="text-danger font-weight-bold">{errors.logo2}</span>}
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">

                    </span>
                    <div className="col-sm-7">

                        <ImagePreview
                            values={{
                                className:"playerProfilePic_home_tile",
                                height:'100',
                                width:'100',
                                src:(data.logo2==null) ? picture1 : img_url+'/'+data.logo2 ,
                                onError:(e)=>{e.target.onerror = null; e.target.src=img_url+'/logo2-default.png'}
                            }}
                        />


                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Favicon:
                    </span>
                    <div className="col-sm-7">

                        <input
                            type="file"
                            name="favicon"
                            ref={favRef}
                            onChange={onChangefavicon}
                            accept=".png,.jpeg,.jpg"
                            className="form-control"
                            style={fileClass}
                        />

                    </div>
                    {errors.favicon && <span className="text-danger font-weight-bold">{errors.favicon}</span>}
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">

                    </span>
                    <div className="col-sm-7">

                        <ImagePreview
                            values={{
                                className:"playerProfilePic_home_tile",
                                height:'50',
                                width:'50',
                                src:(data.favicon==null) ? favIcon : img_url+'/'+data.favicon ,
                                onError:(e)=>{e.target.onerror = null; e.target.src=img_url+'/favicon-default.png'}
                            }}
                        />


                    </div>
                </div>

                <div className="form-group row mb-2">
                    <span className="col-sm-5">
                        Slogan:
                    </span>
                    <div className="col-sm-7">

                        <input
                            {...register("slogan")}
                            className='form-control'
                            defaultValue={data.slogan}
                        />

                    </div>

                </div>

            </Tab.Pane>
    );
}
