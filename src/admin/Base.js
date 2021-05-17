import React from "react";
import { Link } from "react-router-dom"

const AdminBase = ({
  children
}) => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: " #cc99ff", border:"1px solid #b366ff", borderBottomLeftRadius:"20px" , borderBottomRightRadius:"20px"}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/admin/dashboard">Admin Dashboard</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/admin/dashboard/#gallery">Gallery</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div className="mb-0 text-dark" style={{background:"#d9b3ff", borderRadius:"10px"}}>
        {children}
    </div>

    <footer className="mt-0 footer text-dark"
    style={{ backgroundColor: " #cc99ff", border:"1px solid #b366ff", borderTopLeftRadius:"20px" , borderTopRightRadius:"20px"}}
    >
      <div className="container d-flex flex-column justify-content-evenly alingn-item-center">
        <div className="row">
          <div className="col-sm">
            <p className="float-left"><a href="#">Back to top</a></p>
          </div>
        </div>

        <div className="row">
          <p>© 2021–2024 Sharad, Inc. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
        </div>

      </div>
    </footer>
  </div >

);

export default AdminBase;
