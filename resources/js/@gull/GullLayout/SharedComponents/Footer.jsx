import React, { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
      <div className="flex-grow-1"></div>
      <div className="app-footer">
        <div className="footer-bottom border-top pt-3 d-flex flex-column text-center">
            <div>
              <p className="m-0">&copy; <a target="_blanl" href="https://www.clickcommerce.biz">CLICKCOMMERCE.BIZ</a>. PROPRIETARY APPLICATION. ALL RIGHTS RESERVED. POWERED BY: <a target="_blanl" href="https://www.webinnovation.net">WEBINNOVATION.NET</a></p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
