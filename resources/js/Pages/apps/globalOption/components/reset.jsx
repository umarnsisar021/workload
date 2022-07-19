import React,{useState} from 'react';
import { Tab } from "react-bootstrap";
import { InertiaLink } from "@inertiajs/inertia-react";

export default function reset(props) {

    const {globalOpt, register,control} = props;

    const [password_reset, setPasswordReset] = useState("");

    return (
            <Tab.Pane eventKey="reset">
                <div className="form-group row mb-2">
                    <span className="col-sm-4 mt-2">
                        Password:
                    </span>
                    <div className="col-sm-8">
                        <input className="form-control" type="password" id="password_reset" onBlur={
                            () => {
                                setPasswordReset(event.target.value)
                            }
                        }
                        />
                            <p className="mt-2">Are you sure you want to reset the whole database? Please note that this action is NOT recoverable and require super admin password.
                            It is highly recommended to take a final backup before you proceed to application reset.</p>

                            <InertiaLink href='/empty_database' method="post" className="btn btn-danger" as="button" type="button" data={{ password_reset: password_reset }}>I agree to reset my application database</InertiaLink>

                    </div>
                </div>
            </Tab.Pane>
    );
}
