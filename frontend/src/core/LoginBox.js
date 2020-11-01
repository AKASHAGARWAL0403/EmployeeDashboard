import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import history from "../HistoryContainer/History";
import axios from "axios";

export default function LoginTable() {
  const [employeeId, setEmployeeId] = useState(null);
  const [employeePassword, setEmployeePassword] = useState(null);

  const handleClick = () => {
    console.log(employeeId);
    var apiUrl = "http://localhost:5000/employeeBasic/verifyEmpNo";
    console.log(employeePassword);
    axios.post(apiUrl,{ 
        id: employeeId,
        password: employeePassword
      })
    .then((repos) => {
        console.log(repos);
      if(repos.data['exist'] && repos.data['password']){
        sessionStorage.setItem("employeeId" , employeeId);
        sessionStorage.setItem("employeeDesignation" , repos.data['designation']);
        history.push("/employee");
        window.location.reload();
      }
      else if(repos.data['exist'] && repos.data['password'] == false){
        alert("Wrong Password for Employee Id " + employeeId);
      }
    else{
        alert("No employee with id " + employeeId);
      }
    });
    
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
        label="Enter Your employee Id"
        type="text"
        fullWidth
      />
      <TextField
        autoFocus
        margin="dense"
        id="name"
        onChange={(event) => {
          setEmployeePassword(event.target.value);
        }}
        label="Enter Your PassWord"
        type="password"
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
