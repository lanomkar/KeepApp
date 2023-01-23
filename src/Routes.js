import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import UpdateItem from "./components/UpdateItem";
import PrivateRoute from "./components/helper/PrivateRoutes";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute
          path="/item/update/:itemId"
          exact
          component={UpdateItem}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
