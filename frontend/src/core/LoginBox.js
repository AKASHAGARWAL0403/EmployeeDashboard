import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router";
import history from "../HistoryContainer/History";

export default function LoginTable() {
  const [employeeId, setEmployeeId] = useState(null);

  const handleClick = () => {
    console.log(employeeId);
    sessionStorage.setItem("employeeId" , employeeId);
    history.push("/employee");
  }
  return (
    <div>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        onChange={(event) => {
          setEmployeeId(event.target.value);
        }}
        label="Enter employee Id"
        type="text"
        fullWidth
      />
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handleClick}
        // value={row.emp_no}
      >
        Submit
      </Button>
    </div>
  );
}
