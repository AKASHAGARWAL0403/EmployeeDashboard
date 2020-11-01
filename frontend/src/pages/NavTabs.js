import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import history from "../HistoryContainer/History";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("employeeId");
    sessionStorage.removeItem("employeeDesignation");
    history.push("/");
    window.location.reload();
  }
  return (
    <Paper className={classes.root}>
      <Tabs
        //value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {sessionStorage.getItem("employeeId") == null && <Tab label="Login" onClick={() => history.push("/")} />}
        {sessionStorage.getItem("employeeId") && <Tab label="Logout" onClick={handleLogout} />}
        <Tab label="Employee" onClick={() => history.push("/employee")} />
      </Tabs>
    </Paper>
  );
}
