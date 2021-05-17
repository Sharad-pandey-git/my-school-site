import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home"
import Gallery from "./core/Gallery";
import About from "./core/about"
import Admission from "./core/admission";
import {Login, AdminGallery} from "./admin/adminutils";
import AdminDashboard from "./admin/AdminHome"
import AdminRoute from "./admin/AdminRoutes"

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/admission" exact component={Admission} />
        <Route path="/gallery/:id" exact component={Gallery} />
        <Route path="/admin" exact component={Login} />
        {/* <Route path="/admin/dashboard" exact component={adminDashboard} /> */}
        {/* <Route path="/admin/gallery" exact component={adminGallery} /> */}
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/gallery/:id" exact component={AdminGallery} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
