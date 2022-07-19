import React from 'react';
import { Nav } from "react-bootstrap";


const TabLinks = () => {

    return (

        <Nav variant="pills" className="flex-column" style={{borderBottom:'none'}}>

            <Nav.Item>
                <Nav.Link eventKey="company_details">Company Details</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link eventKey="personal_info">Personal Information</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link eventKey="email_addresses">Email Addresses</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link eventKey="instant_message">Instant Messengers</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link eventKey="social_networking">Social Networking</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link eventKey="site_logos">Site Logos</Nav.Link>
            </Nav.Item>

        </Nav>
    );
};

export default TabLinks;

