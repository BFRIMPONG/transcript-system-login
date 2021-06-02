// Pages
import React from 'react';
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Trainee from "./pages/trainee";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";


// auth & redux
import { connect } from "react-redux";
import AuthRoute from "./components/AuthRoute";
import BasicRoute from "./components/BasicRoute";

function App({ checked }) {
  return (
    <Router>
      {checked && (

          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <AuthRoute path="/admin">
              <Admin />
            </AuthRoute>
            <BasicRoute path="/trainee">
              <Trainee />
            </BasicRoute>           
          </Switch>

      )}
    </Router>
  );
}
const mapStateToProps = ({ session }) => ({
  checked: session.checked,
});

export default connect(mapStateToProps)(App);
