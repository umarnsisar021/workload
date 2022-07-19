import React from 'react';
import { Nav } from "react-bootstrap";

const tab_nav = () => {
    return (
            <Nav
                variant="pills"
                className="flex-column"
            >
                <Nav.Item>
                    <Nav.Link eventKey="security">
                        Security
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="other">
                        Other
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="apis">
                        APIs
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="signature">
                        Signatures
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="email_setting">
                        Email Settings
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="site_wide_html">
                        Site-wide HTML
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="maintenance">
                        Maintenance
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="message">
                        Messages
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="reset">
                        Reset
                    </Nav.Link>
                </Nav.Item>
            </Nav>
    );
};

export default tab_nav;
