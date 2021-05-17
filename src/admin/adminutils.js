import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useParams } from "react-router-dom"

import { Gallery_utility } from "../core/helper/homeutils";
import { isAuthenticated, signin, authenticate, getGeneral, updateGeneral } from "./auth";
import AdminBase from "./Base";
import { getEventById, getImagesOfEventId } from "../core/helper/galleryHelper";

let isAdmin = true;

export function Login() {

  const [values, setValues] = useState({
    user_name: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  })

  const { user_name, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handelChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value })
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signin({ user_name, password })
      .then(data => {
        // console.log("data from My BAckend : ", data)
        if (data.error || data.err) {
          var _error = data.err ? data.err : data.error;

          setValues({ ...values, error: _error, success: false })
        }
        else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            })
          })
        }
      })
      .catch(
        console.log("Custom error from F_E (onsubmit ) : Signin request Failed ")
      )
  }

  const perFormRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/admin/dashboard" />
    }
  }

  const signinForm = () => (
    <main className="form-signin container text-center d-felx justify-content-center align-items-center" style={{ height: "100vh", paddingTop: "30vh" }}>
      <div className="container">
        <form>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating mb-1">
            <input type="text"
              className="form-control"
              value={user_name}
              onChange={handelChange("user_name")}
            />
            <label htmlFor="floatingInput">User Name</label>
          </div>
          <div className="form-floating mt-1">
            <input type="password"
              className="form-control"
              value={password}
              onChange={handelChange("password")}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary mt-2"
            onClick={onSubmit}
          >Sign in</button>
          <p className="mt-5 mb-3 text-muted">© S.P</p>
        </form>
      </div>
    </main>
  )

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>
            Loading.......
          </h2>
        </div>
      )
    )

  }

  const errorMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-danger text-left"
          style={{ display: error ? "" : "none" }}>
          Error occured : {error}
        </div>
      </div>
    </div>
  )


  return (
    <div>
      {loadingMessage()}
      {errorMessage()}
      {signinForm()}
      {perFormRedirect()}
      {/* <p className="text-success text-center">
        {JSON.stringify(values)}
      </p> */}
    </div>
  )
}

export function AdminGallery() {
  const { id } = useParams();

  const [values, setValues] = useState({
    event_name: "",
    _discription: "",
    images_data: [],
    error: false
  });

  const { event_name, error, _discription, images_data } = values;

  const preload = () => {
    getEventById(id).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      }
      else {
        getImagesOfEventId(id).then(img_data => {
          if (img_data.error) {
            setValues({ ...values, error: img_data.error })
          }
          else {
            setValues({
              ...values,
              event_name: data.name,
              _discription: data.discription,
              images_data: img_data
            })
          }
        })
      }

    })
  }


  useEffect(() => {
    preload();
  }, []);

  if (error) {
    return (
      <AdminBase>
        <div>
          {"ERROR WHILE FETCHING EVENT : " + error}
        </div>
      </AdminBase>
    )
  }

  return (
    <AdminBase>
      {
        Gallery_utility({ isAdmin: true, 
          eventName: event_name, 
          _discription: _discription, 
          imageArray: images_data,
          eventId: id
        })
      }
    </AdminBase>
  )
}

export function Generalform() {

  const [values, setValues] = useState({
    address: "",
    email: "",
    contactNumber: "",
    photo: "",
    error: "",
    loading: false,
    createdGeneral: "",
    getaRedirect: false,
    formData: ""
  })

  const {
    address, email, contactNumber, photo, error, loading,
    createdGeneral, getaRedirect, formData
  } = values;

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
            contactNumber: data.contactNumber,
            formData: new FormData()
          })
        }
      }
    )
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({
      ...values,
      error: "",
      loading: true
    });

    updateGeneral(formData).then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        }
        else {
          setValues({
            ...values,
            address: "",
            contactNumber: "",
            email: "",
            loading: false,
            createdGeneral: data.email
          });
        }
      }
    )

  };

  const handelChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value })
  };

  const successMessage = () => (
    <div className="alert alert-success  mt-3"
      style={{ display: createdGeneral ? "" : "none" }}
    >
      <h4 className="text-success">{createdGeneral} {"General utilities"} Updated successfully</h4>
    </div>
  );

  const updateGeneralForm = () => (
    <form className="row g-3">
      <h2 className="text-center text-underline" ><u>  Edit General Utils </u></h2>
      <div className="col-12">
        <label htmlFor="inputAddress" className="form-label">Address</label>
        <input type="text"
          className="form-control"
          name="address"
          value={address}
          onChange={handelChange("address")}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputEmail4" className="">Email</label>
        <input type="email"
          className="form-control"
          name="email"
          value={email}
          onChange={handelChange("email")}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputNumber" className="form-label">Contact Number</label>
        <input type="number"
          className="form-control"
          name="contactNumber"
          value={contactNumber}
          onChange={handelChange("contactNumber")}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">Home Page Image</label>
        <input className="form-control"
          type="file"
          name="photo"
          accept="image"
          onChange={handelChange("photo")}
        />
      </div>

      <div className="col-12 mb-5">
        <button type="submit"
          className="btn btn-success"
          onClick={onSubmit}
        >Update General Information</button>
      </div>
    </form>
  );


  return (
    <div>
      {successMessage()}
      {updateGeneralForm()}
    </div>
  )


}