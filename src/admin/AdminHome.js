import React, { useState, useEffect } from "react";
import "../styles.css";
import { Generalform } from "./adminutils";
import AdminBase from "./Base";
import { Gallery_utility, Gallery_small } from "../core/helper/homeutils";
import { getAllWritings, updateWritingById } from "./auth";

export default function AdminDashboard() {

  const [values, setValues] = useState({
    name: "",
    designation: "",
    saying: "",
    image: "",
    error: "",
    formdata: "",
    isWritings: false,
    allWritings: [],
    loading: false,
    isUpdateWriting: false,
    writing_id: "",
    updatedWrite: ""
  })

  const { isWritings, loading, allWritings, isUpdateWriting, updatedWrite,
    name, designation, saying, image, formdata, writing_id, error
  } = values

  const preload = () => {
    getAllWritings().then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        }
        else {
          setValues({
            ...values,
            allWritings: data,
            formdata: new FormData()
          })
        }
      }
    )
  }

  useEffect(() => {
    preload()
  }, [])

  const handelChange = name => event => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formdata.set(name, value);
    setValues({ ...values, [name]: value })
  }

  const onSubmitWriting = event => {
    event.preventDefault();
    setValues({
      ...values,
      error: "",
      loading: true
    });
    updateWritingById(formdata, writing_id).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      }
      else {
        setValues({
          ...values,
          loading: false,
          updatedWrite: data.name,
          formdata: new FormData(),
          isUpdateWriting: false
        });
        preload();
      }
    })
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: " #cc99ff", border: "1px solid #b366ff", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/admin/dashboard">Admin Dashboard</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link"
                  onClick={() => {
                    setValues({
                      ...values,
                      isWritings: true
                    })
                  }}
                  href = "/admin/dashboard/#writings"
                >Writings</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/dashboard/#gallery">Gallery</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="mb-0 text-dark" style={{ background: "#d9b3ff", borderRadius: "10px" }}>

        <div className="container" id="writings" >
          <h1 id="admingallery" className="text-center text-dark" style={{
            paddingTop: "100px",
            paddingBottom: "20px"
          }}>Welcome to admin dashboard</h1>

          {
            isWritings
            &&
            <div className="container pb-4 pt-3" >

              <div className="text-center">
                <h3 className="d-flex  justify-content-between">
                  <span><u className="ml-1"> Edit Writings</u> :-</span>
                  <div className="text-dark">
                    {
                      allWritings.map((_wrt, index) => {
                        return (
                          <button
                            className="btn btn-primary mx-1"
                            key={index}
                            onClick={() => {
                              setValues({
                                ...values,
                                name: _wrt.name,
                                designation: _wrt.designation,
                                saying: _wrt.saying,
                                writing_id: _wrt._id,
                                isUpdateWriting: true
                              })
                            }}
                          >{_wrt.designation}</button>
                        )
                      })
                    }
                  </div>
                  <button className="btn btn-warning mr-4"
                    onClick={() => {
                      setValues({
                        ...values,
                        isWritings: false
                      })
                    }}
                  >Exit Editing</button>
                </h3>
              </div>

              {isUpdateWriting &&
                <div className="form-group mb-3" >
                  <label
                    className="form-label mb-0 mt-3 pl-1"><h5> Name </h5> </label>
                  <input type="text"
                    name="name"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    value={name}
                    onChange={handelChange("name")}
                  />
                  <label
                    className="form-label mb-0 mt-3 pl-1"><h5> Designation </h5> </label>
                  <input type="text"
                    name="designation"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    value={designation}
                    onChange={handelChange("designation")}
                  />
                  <label htmlFor="formFileMultiple" className="form-label mt-3 pl-1"><h5>Writing</h5> </label>
                  <textarea className="form-control"
                    rows={5}
                    name="saying"
                    value={saying}
                    onChange={handelChange("saying")}
                  />
                  <label htmlFor="formFileMultiple" className="form-label mt-3"><h4> Image </h4>  </label>
                  <input className="form-control" type="file"
                    name="image"
                    accept="image"
                    onChange={handelChange("image")}
                  />
                  <button className="btn btn-success btn-sm form-control mt-3"
                    type="submit"
                    onClick={onSubmitWriting}
                  >
                    Update This Info.
                </button>
                  <hr className="featurette-divider" />
                </div>
              }


              <hr className="featurette-divider" />
            </div>

          }

          {Generalform()}
          {Gallery_small(true)}
        </div>

      </div>


      <footer className="mt-0 footer text-dark"
        style={{ backgroundColor: " #cc99ff", border: "1px solid #b366ff", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
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
    </div>
  );
}
