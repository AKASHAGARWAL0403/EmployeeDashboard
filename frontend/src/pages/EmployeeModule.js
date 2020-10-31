import React from "react";
import history from "../HistoryContainer/History";

import EmployeeTable from "../core/EmployeeTable";

export default function EmployeeModule(props) {
  {sessionStorage.getItem("employeeId") == null && history.push("/")}
  return (
    <div>
      <h2>Employee Details</h2>
      <EmployeeTable />
    </div>
  );
}
