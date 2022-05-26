import { BrowserRouter, Switch, Route } from "react-router-dom";

import Homepage from "./Homepage";
import Profile from "./Profile";
import SignIn from "./Signin";
import React from "react";
import Header from "./Header";
import SignUp from "./SignUp";
import AudioButton from "./AudioButton";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <div>
        <Header />
        <AudioButton />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/users/:id">
            <Profile />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
