import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { getGeneral } from "../admin/auth";
import { sociallinks } from "./helper/homeutils";

const Base = ({
  children
}) => {

  const [values, setValues] = useState({
    error: "",
    address: "",
    email: "",
    contactNumber: ""
  })
  const {
    error, address, email, contactNumber
  } = values

  const preload = () => {
    getGeneral().then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        }
        else {
          setValues({
            ...values,
            address: data.address,
            email: data.email,
            contactNumber: data.contactNumber
          })
        }
      }
    )
  };

  useEffect(() => {
    preload();
  }, []);


  return (
    <div>
      <nav className="navbar navbar-light navbar-expand-sm fixed-top " style={{ backgroundColor: '#e6e6e6', borderTop: "2px solid #cccccc", borderBottom: "2px solid #cccccc", borderRadius: "5px" }}>
        <div className="container-fluid">
          <a className="navbar-brand" style={{ fontFamily: "'Coda Caption', sans-serif" }} href="/">Home</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav" style={{ fontFamily: "'Coda Caption', sans-serif" }}>
            <ul className="navbar-nav">
              <li className="nav-item" >
                <li className="nav-item">
                  <a className="nav-link active text" aria-current="page" href="/#gallery">Gallery</a>
                </li>
              </li>
              <li className="nav-item">
                <a className="nav-link active text" aria-current="page" href="/about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active text" aria-current="page" href="/admission">Admission</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      {sociallinks()}
      <div className="mt-3">
        {children}
      </div>

      <footer className="footer bg-light text-white pt-4"
        style={{
          backgroundImage: "url('http://parliamentaryforum.org/wp-content/uploads/2018/02/footer-background-img.png')",
          backgroundRepeat: "no-repeat", backgroundPositionX: "center", backgroundPositionY: "top", backgroundSize: 'cover'
        }}
      >
        <div className="d-flex  justify-content-around ">
          <div className="pt-5 pl-2">
            <div className="row">
              <div className="col-sm">
                <p className="float-left"><a href="#">Back to top</a></p>
              </div>
            </div>

            <div className="row">
              <p>© 2021-2024 , Dev.-S.P · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
            </div>
          </div>

          <div className="pt-4">
            <div className="col-sm d-flex flex-column justify-content-center alingn-item-evenly">
              <div className="row float-right"><p className="">Email : {email? email: "example@gmail.com"}</p></div>
              <div className="row float-right"><p className="">Contact Number : {contactNumber? contactNumber:"9999999999"}</p></div>
              <div className="row float-right"><p className="">Address : {address?address:"Sample Address"}</p></div>
            </div>
          </div>

        </div>
      </footer>
    </div>

  )
};

export default Base;
