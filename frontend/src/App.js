import React from "react";
import "./App.css";
import NavTabs from "./pages/NavTabs";
import EmployeeModule from './pages/EmployeeModule';
import LoginModule from './pages/LoginModule';
import { Switch, Route, Redirect } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
import history from "./HistoryContainer/History";
import { Router } from "react-router-dom";

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <NavTabs />
        <Switch>
          <Route path="/" exact component={LoginModule} />
          <Route path="/employee" exact>
            <EmployeeModule/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
