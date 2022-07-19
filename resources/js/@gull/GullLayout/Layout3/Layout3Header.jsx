import React, { Component, Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { getTimeDifference, classList } from "../../@utils";
import DropdownToggle from "react-bootstrap/DropdownToggle";
// import { navigations } from "../../navigations";
import ScrollBar from "react-perfect-scrollbar";
// import MegaMenu from "../../../@gull/components/MegaMenu";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";


const handleMenuClick = () => {

};

const toggleFullScreen = () => {
  if (document.fullscreenEnabled) {
    if (!document.fullscreen) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  }
};

const state = {
  shorcutMenuList: [
    {
      icon: "i-Shop-4",
      link: "#",
      text: "Home"
    },
    {
      icon: "i-Library",
      link: "#",
      text: "Ui Kits"
    },
    {
      icon: "i-Drop",
      link: "#",
      text: "Apps"
    },
    {
      icon: "i-File-Clipboard-File--Text",
      link: "#",
      text: "Form"
    },
    {
      icon: "i-Checked-User",
      link: "#",
      text: "Sessions"
    },
    {
      icon: "i-Ambulance",
      link: "#",
      text: "Support"
    }
  ],
  notificationList: [
    {
      icon: "i-Speach-Bubble-6",
      title: "New message",
      description: "James: Hey! are you busy?",
      time: "2019-10-30T02:10:18.931Z",
      color: "primary",
      status: "New"
    },
    {
      icon: "i-Receipt-3",
      title: "New order received",
      description: "1 Headphone, 3 iPhone",
      time: "2019-03-10T02:10:18.931Z",
      color: "success",
      status: "New"
    },
    {
      icon: "i-Empty-Box",
      title: "Product out of stock",
      description: "1 Headphone, 3 iPhone",
      time: "2019-05-10T02:10:18.931Z",
      color: "danger",
      status: "3"
    },
    {
      icon: "i-Data-Power",
      title: "Server up!",
      description: "Server rebooted successfully",
      time: "2019-03-10T02:10:18.931Z",
      color: "success",
      status: "3"
    }
  ]
};



const Layout3Header = () => {
  const { shorcutMenuList, notificationList = [] } = state;
  const { authUser, navigationModules, business_name, base_url } = usePage().props;
  const navigate = JSON.parse(navigationModules);

  return (
    <Fragment>

      {/* ---------------- Top Navbar start ------------------------- */}
      <div className="main-header">
        <InertiaLink href="/">
          <div className="logo">
            <img src={`${base_url}/dist-assets/images/logo-cc-header-dark.png`} alt="" />
          </div>
        </InertiaLink>

        <div className="brand-logo-header">
          <span>{business_name}</span>
        </div>

        <div className="menu-toggle" onClick={handleMenuClick}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="d-none d-lg-flex align-items-center">
          {/* <Dropdown className="mr-3">
              <Dropdown.Toggle variant="link" id="dropdown-basic">
                Mega Menu
              </Dropdown.Toggle>

              <div className="mega-menu">
                <Dropdown.Menu>
                  <MegaMenu></MegaMenu>
                </Dropdown.Menu>
              </div>
            </Dropdown> */}


        </div>

        <div style={{ margin: "auto" }}></div>

        <div className="header-part-right">

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
            />
            <i className="search-icon text-muted i-Magnifi-Glass1"></i>
          </div>
          <i
            className="i-Full-Screen header-icon d-none d-sm-inline-block"
            data-fullscreen
            onClick={toggleFullScreen}
          ></i>


          {/* <Dropdown>
            <Dropdown.Toggle variant="link" className="toggle-hidden">
              <i
                className="i-Safe-Box text-muted header-icon"
                role="button"
              ></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className="menu-icon-grid">
                {shorcutMenuList.map(menu => (
                    <a key={menu.text} href={menu.link}>
                      <i className={menu.icon}></i> {menu.text}
                    </a>
                  ))} 
          {Object.values(navigate[0]).map((parent, index) => (

            <a key={index} href={'#'}>
              <i className={parent.icon_class}></i> {parent.name}
            </a>

          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>*/}

          {/*}
          < Dropdown >
            <Dropdown.Toggle variant="link" className="toggle-hidden">
              <div
                className="badge-top-container"
                role="button"
                id="dropdownNotification"
                data-toggle="dropdown"
              >
                <span className="badge badge-primary">3</span>
                <i className="i-Bell text-muted header-icon"></i>
              </div>
            </Dropdown.Toggle>

            <DropdownMenu className="notification-dropdown rtl-ps-none">
              {notificationList.map((note, index) => (
                <div key={index} className="dropdown-item d-flex">
                  <div className="notification-icon">
                    <i className={`${note.icon} text-${note.color} mr-1`}></i>
                  </div>
                  <div className="notification-details flex-grow-1">
                    <p className="m-0 d-flex align-items-center">
                      <span>{note.title}</span>
                      <span
                        className={`badge badge-pill badge-${note.color} ml-1 mr-1`}
                      >
                        {note.status}
                      </span>
                      <span className="flex-grow-1"></span>
                      <span className="text-small text-muted ml-auto">
                        {getTimeDifference(new Date(note.time))} ago
                      </span>
                    </p>
                    <p className="text-small text-muted m-0">
                      {note.description}
                    </p>
                  </div>
                </div>
              ))}
            </DropdownMenu>
          </Dropdown >
          */}

          <div className="user col align-self-end">
            <Dropdown>
              <DropdownToggle variant="link" className="toggle-hidden">
                <img
                  src={`${base_url}/dist-assets/images/faces/1.jpg`}
                  id="userDropdown"
                  alt=""
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                />
              </DropdownToggle>
              <DropdownMenu>
                <div className="dropdown-header">
                  <i className="i-Lock-User mr-1"> </i>
                  <strong> {authUser.first_name} {authUser.last_name}</strong>
                </div>
                <span className="dropdown-item cursor-pointer">
                  Account settings
                </span>
                {/* <span className="dropdown-item cursor-pointer">
                    Billing history
                  </span> */}
                <InertiaLink className="dropdown-item cursor-pointer" href='/logout' method="POST" as="button">
                  Sign out
                </InertiaLink>

              </DropdownMenu>
            </Dropdown>
          </div>
        </div >
      </div >
      {/* ---------------- Top Navbar end ------------------------- */}

      < div className="horizontal-bar-wrap" >
        <div
          className={classList({
            "header-topnav": true
          })}
        >
          <div className="container-fluid">
            <div className="topnav position-relative rtl-ps-none">
              <ul className="menu float-left nav">
                {/* All parent modules are at index:0 */}
                {Object.values(navigate[0]).map((parent, index) => (
                  <li key={index}>
                    <div>
                      <div>
                        <label className="toggle" htmlFor={`drop-${index}`}>
                          {parent.name}
                        </label>
                        <a href="#">
                          <i className={`nav-icon mr-2 ${parent.icon_class}`}></i>
                          {parent.name}
                        </a>
                        <input type="checkbox" id={`drop-${index}`} />
                        <ul>
                          {Object.values(navigate[parent.id]).map((child, index) => (
                            <li key={index}>
                              <InertiaLink href={child.slug != '#' ?  (child.slug!=''?'/' +child.slug :'#'): '#'}>
                                <i className={`nav-icon mr-2 ${child.icon_class}`}></i>
                                <span className="item-name" style={{ fontSize: '0.82rem' }}>
                                  {child.name}
                                </span>
                                {
                                  child.have_child == 1 ? (
                                    <span className="nav-side-arrow"></span>
                                  ) : ''
                                }
                              </InertiaLink>

                              {navigate[child.id] === undefined ? '' : (
                                <ul className="sub_nav_ul">
                                  {Object.values(navigate[child.id]).map((sub_child, index) => (
                                    <li key={index}>
                                      <InertiaLink href={sub_child.slug != '#' ? '/' + sub_child.slug : '#'}>
                                        <span style={{ fontSize: '0.82rem' }}>
                                          {sub_child.name}
                                        </span>
                                      </InertiaLink>
                                    </li>
                                  ))}
                                </ul>)
                              }
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div >
    </Fragment >
  );
}

export default Layout3Header;
