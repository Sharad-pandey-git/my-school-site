import Base from "./Base";
import React, { useState } from "react";
import emailjs from "emailjs-com";

export default function Admission() {

  const sendMail = (event) => {
    event.preventDefault();

    emailjs.sendForm('service_keuvvyq', 'template_o6atz9b', event.target, 'user_ZFSzjFLJqf6rFjpHfh6dX')
      .then((result) => {
          console.log(result.text);
          alert(`Your response has been Recorded successfully`)
          event.target.reset()
        }, (error) => {
          console.log(error.text);
          alert("Error in submission plz check all the fields properly ")
          event.target.reset()
      },
      
      );

  }

  return (
    <Base>
      <div className="bg-light">
        <div className="container mt-3 pt-5 text-center"
          style={{
          }}
        >
          <h2 className="fw-bold text-decoration-underline">Admission</h2>

          <div className="text-start">
            <div className="container">
              <h4 className="mt-4 fst-italic">Fill The Form For Admission</h4>
              {/* ################################################# */}
              <form className="py-2 row g-3 fw-bold" onSubmit={sendMail}>
                <div className="col-md-4">
                  <label htmlFor="validationDefault01" className="form-label" >Parent's name</label>
                  <input type="text"
                  name="parentName"
                    className="form-control"
                    id="validationDefault01"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="validationDefault02" className="form-label">Child's name</label>
                  <input type="text"
                  name="childName"
                    className="form-control"
                    id="validationDefault02"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="validationDefault04" className="form-label">Sex</label>
                  <select className="form-select" id="validationDefault04"
                  name="sex"
                    required>
                    <option selected disabled value>Choose...</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="col-12">
                  <label htmlFor="validationDefaultUsername" className="form-label">Child's D.O.B</label>
                  <input type="date" 
                  name="DOB"
                  className="form-control" id="validationDefault02" 
                  required
                  />
                </div>


                <div className="col-md-6">
                  <label htmlFor="validationDefaultUsername" className="form-label" defaultValue="example@gmail.com">Email</label>
                  <input type="email" 
                  name="email"
                  className="form-control" 
                  id="validationDefault02" required 
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationDefaultUsername" className="form-label">Phone Number</label>
                  <input type="number" 
                  name="phoneNumber"
                  className="form-control" 
                  id="validationDefault02" required 
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="validationDefault03" className="form-label">City</label>
                  <input type="text" className="form-control" id="validationDefault03" 
                  name="city"
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="validationDefault05" className="form-label">Zip</label>
                  <input type="number" className="form-control" id="validationDefault05" 
                  name="zipCode"
                  />
                </div>
                <div className="col-12">
                  <button className="btn btn-primary" type="submit"
                  >Submit form</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </Base>
  )
}

