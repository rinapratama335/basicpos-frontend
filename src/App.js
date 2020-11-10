import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/dashboard";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Sidebar from "./components/sidebar/sidebar";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <div>
            <Header />
            <Sidebar />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Footer />
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
