import React, { Children } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import { Gallery_small, Writings, homecards, sociallinks } from "./helper/homeutils";
let isAdmin_ =false;


export default function Home() {

  return (
    <Base>
      <main>
        
        <div className="text-center pt-4 ">
          <div className="img-fluid pt-5 d-flex flex-column justify-content-evenly align-items-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1564429238817-393bd4286b2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80")', height: '80vh', backgroundRepeat: "no-repeat", backgroundPositionX: "center", backgroundSize: 'cover' }}>

            <div className="container text-center" style={{ fontFamily: "'Dancing Script', cursive", color: "white" }}>
              <p className="fs-1 text-xl">
                <span className="p-2" style={{ fontSize: "3rem", background: "rgba(0,0,0, 0.2)", borderRadius: "12px" }}>
                  Welcome to <span style={{ fontFamily: "'Zen Dots', cursive", fontSize: "2rem" }}>Play School Name</span>
                </span>
              </p>
            </div>

            <div className="mb-2" style={{}}>
              <a href="/admission">
              <div className="btn hoverit" style={{ borderRadius: "20px", background: "rgba(255, 209, 26)" }} >
                <span style={{ fontFamily: "'Baloo Bhai 2', cursive", fontSize: "2rem", color: "white" }}> ADMISSION>></span>
              </div>
              </a>
            </div>

          </div>
        </div>

        <div className="container marketing">
          {homecards()}
          {Writings()}
        </div>
          {Gallery_small(isAdmin_)}

      </main>
    </Base>
  );
}
