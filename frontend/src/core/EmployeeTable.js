import React, { useEffect, useState } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TextField from "@material-ui/core/TextField";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Button from "@material-ui/core/Button";
import download from "downloadjs";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import PropTypes from "prop-types";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    fontSize: 17,
    fontWeight: "bold",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  body: {
    fontSize: 14,
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    minWidth: "200px",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    // '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.action.hover
    // },
  },
}))(TableRow);

export default function EmployeeTable() {
  const classes = useStyles();

  const [rows, setMainTableRows] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    console.log(employeeId);
    var apiUrl = "http://localhost:5000/employeeBasic/";
    axios.post(apiUrl, { id: employeeId , designation: 'admin_house_allotment' }).then((repos) => {
      setMainTableRows(repos.data);
    });
  }, [employeeId]);

  const handleClickDownloadOne = (e) => {
    var apiUrl = "http://localhost:5000/employeeBasic/pdf/downloadOne";
    axios
      .post(
        apiUrl,
        { id: e.currentTarget.value },
        {
          responseType: "blob",
        }
      )
      .then((repos) => {
        const content = repos.headers["content-type"];
        download(repos.data, "filename.xlsx", content);
      });
  };

  const handleClickDownloadAll = (e) => {
    var apiUrl = "http://localhost:5000/employeeBasic/pdf/downloadAll";
    axios
      .post(
        apiUrl,
        { id: employeeId },
        {
          responseType: "blob",
        }
      )
      .then((repos) => {
        const content = repos.headers["content-type"];
        download(repos.data, "filename.xlsx", content);
      });
  };
  return (
    <div>
      <div>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          onChange={(event) => {
            setEmployeeId(event.target.value);
            // console.log(event.target.value);
          }}
          label="Employee Id"
          type="text"
          fullWidth
        />
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleClickDownloadAll}
        >
          Download All
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom paginated table">
          <TableHead>
            <StyledTableRow>
              {(rows != undefined?
              <StyledTableCell align="left" colSpan={9}>
                Basic Detail
              </StyledTableCell>:null
              )}
              {((rows.length == 0 || rows[0].emp_education_detail != undefined)?
              <StyledTableCell align="left" colSpan={6}>
                Educational Details
              </StyledTableCell>:null
              )}
              {((rows.length == 0 || rows[0].emp_family_detail != undefined)?
              <StyledTableCell align="left" colSpan={9}>
                Family Details
              </StyledTableCell>:null
              )}
              {((rows.length == 0 || rows[0].emp_last5yrstay_detail != undefined)?
              <StyledTableCell align="left" colSpan={4}>
                Last 5 Year Stay Details
              </StyledTableCell>:null
              )}
              {((rows.length == 0 || rows[0].emp_pay_detail != undefined)?
              <StyledTableCell align="left" colSpan={2}>
                Pay Details
              </StyledTableCell>:null
              )}
              {((rows.length == 0 || rows[0].emp_prev_exp_detail != undefined)?
              <StyledTableCell align="left" colSpan={6}>
                Previous Experience Details
              </StyledTableCell>:null
              )}
            </StyledTableRow>
            <StyledTableRow>
            {(rows !== undefined?<StyledTableCell align="center">Emp No</StyledTableCell>: null )}
            {(rows !== undefined?<StyledTableCell align="center">Auth Id</StyledTableCell>: null )}
            {(rows !== undefined?<StyledTableCell align="center">Designation</StyledTableCell>: null )}
            {(rows !== undefined?<StyledTableCell align="center">Office No</StyledTableCell>: null )}
            {(rows !== undefined?<StyledTableCell align="center">Fax</StyledTableCell>: null )}
            {(rows !== undefined?<StyledTableCell align="center">Joining date</StyledTableCell>: null )}
            {(rows !== undefined?<StyledTableCell align="center">Retirement Ext</StyledTableCell>: null )}
            {(rows !== undefined?<StyledTableCell align="center">Retirement Date</StyledTableCell>: null )}
            {(rows !== undefined?<StyledTableCell align="center">Employement Nature</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_education_detail != undefined)?<StyledTableCell align="center">Exam</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_education_detail != undefined)?<StyledTableCell align="center">Specialization</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_education_detail != undefined)?<StyledTableCell align="center">Institute</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_education_detail != undefined)?<StyledTableCell align="center">Year</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_education_detail != undefined)?<StyledTableCell align="center">Grade</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_education_detail != undefined)?<StyledTableCell align="center">Division</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_family_detail != undefined)?<StyledTableCell align="center">Name</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_family_detail != undefined)?<StyledTableCell align="center">Relationship</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_family_detail != undefined)?<StyledTableCell align="center">Profession</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_family_detail != undefined)?<StyledTableCell align="center">Present Post Address</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_family_detail != undefined)?<StyledTableCell align="center">Photopath</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_family_detail != undefined)?<StyledTableCell align="center">DOB</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_family_detail != undefined)?<StyledTableCell align="center">Active_Inactive</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_family_detail != undefined)?<StyledTableCell align="center">Emp Dep Allergy</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_family_detail != undefined)?<StyledTableCell align="center">Emp Dep Disease</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_last5yrstay_detail != undefined)?<StyledTableCell align="center">From</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_last5yrstay_detail != undefined)?<StyledTableCell align="center">To</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_last5yrstay_detail != undefined)?<StyledTableCell align="center">Address</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_last5yrstay_detail != undefined)?<StyledTableCell align="center">Dist_Hq_Name</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_pay_detail != undefined)?<StyledTableCell align="center">Paycode</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_pay_detail != undefined)?<StyledTableCell align="center">Basic Pay</StyledTableCell>: null )} 
            {((rows.length == 0 || rows[0].emp_prev_exp_detail != undefined)?<StyledTableCell align="center">Designation</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_prev_exp_detail != undefined)?<StyledTableCell align="center">From</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_prev_exp_detail != undefined)?<StyledTableCell align="center">To</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_prev_exp_detail != undefined)?<StyledTableCell align="center">Payscale</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_prev_exp_detail != undefined)?<StyledTableCell align="center">Address</StyledTableCell>: null )}
            {((rows.length == 0 || rows[0].emp_prev_exp_detail != undefined)?<StyledTableCell align="center">Remarks</StyledTableCell>: null )}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <StyledTableRow key={row.emp_no}>
                {(row !== undefined?<StyledTableCell align="center">{row.emp_no}</StyledTableCell>: null )}
                {(row !== undefined?<StyledTableCell align="center">{row.auth_id}</StyledTableCell>: null )}
                {(row !== undefined?<StyledTableCell align="center">{row.designation}</StyledTableCell>: null )}
                {(row !== undefined?<StyledTableCell align="center">{row.office_no}</StyledTableCell>: null )}
                {(row !== undefined?<StyledTableCell align="center">{row.fax}</StyledTableCell>: null )}
                {(row !== undefined?<StyledTableCell align="center">{row.joining_date}</StyledTableCell>: null )}
                {(row !== undefined?<StyledTableCell align="center">{row.retirement_ext}</StyledTableCell>: null )}
                {(row !== undefined?<StyledTableCell align="center">{row.retirement_date}</StyledTableCell>: null )}
                {(row !== undefined?<StyledTableCell align="center">{row.employment_nature}</StyledTableCell>: null )}
                {(row.emp_education_detail !== undefined?<StyledTableCell align="center">{row.emp_education_detail.exam}</StyledTableCell>: null )}
                {(row.emp_education_detail !== undefined?<StyledTableCell align="center">{row.emp_education_detail.specialization}</StyledTableCell>: null )}
                {(row.emp_education_detail !== undefined?<StyledTableCell align="center">{row.emp_education_detail.institute}</StyledTableCell>: null )}
                {(row.emp_education_detail !== undefined?<StyledTableCell align="center">{row.emp_education_detail.year}</StyledTableCell>: null )}
                {(row.emp_education_detail !== undefined?<StyledTableCell align="center">{row.emp_education_detail.grade}</StyledTableCell>: null )}
                {(row.emp_education_detail !== undefined?<StyledTableCell align="center">{row.emp_education_detail.division}</StyledTableCell>: null )}
                {(row.emp_family_detail !== undefined?<StyledTableCell align="center">{row.emp_family_detail.name}</StyledTableCell>: null )}
                {(row.emp_family_detail !== undefined?<StyledTableCell align="center">{row.emp_family_detail.relationship}</StyledTableCell>: null )}
                {(row.emp_family_detail !== undefined?<StyledTableCell align="center">{row.emp_family_detail.profession}</StyledTableCell>: null )}
                {(row.emp_family_detail !== undefined?<StyledTableCell align="center">{row.emp_family_detail.present_post_addr}</StyledTableCell>: null )}
                {(row.emp_family_detail !== undefined?<StyledTableCell align="center">{row.emp_family_detail.photopath}</StyledTableCell>: null )}
                {(row.emp_family_detail !== undefined?<StyledTableCell align="center">{row.emp_family_detail.dob}</StyledTableCell>: null )}
                {(row.emp_family_detail !== undefined?<StyledTableCell align="center">{row.emp_family_detail.active_inactive}</StyledTableCell>: null )}
                {(row.emp_family_detail !== undefined?<StyledTableCell align="center">{row.emp_family_detail.emp_dep_allergy}</StyledTableCell>: null )}
                {(row.emp_family_detail !== undefined?<StyledTableCell align="center">{row.emp_family_detail.emp_dep_disease}</StyledTableCell>: null )}
                {(row.emp_last5yrstay_detail !== undefined?<StyledTableCell align="center">{row.emp_last5yrstay_detail.from}</StyledTableCell>: null )}
                {(row.emp_last5yrstay_detail !== undefined?<StyledTableCell align="center">{row.emp_last5yrstay_detail.to}</StyledTableCell>: null )}
                {(row.emp_last5yrstay_detail !== undefined?<StyledTableCell align="center">{row.emp_last5yrstay_detail.res_addr}</StyledTableCell>: null )}
                {(row.emp_last5yrstay_detail !== undefined?<StyledTableCell align="center">{row.emp_last5yrstay_detail.dist_hq_name}</StyledTableCell>: null )}
                {(rows.emp_pay_detail !== undefined?<StyledTableCell align="center">{row.emp_pay_detail.paycode}</StyledTableCell>: null )}
                {(rows.emp_pay_detail !== undefined?<StyledTableCell align="center">{row.emp_pay_detail.basic_pay}</StyledTableCell>: null )}
                {(row.emp_prev_exp_detail !== undefined?<StyledTableCell align="center">{row.emp_prev_exp_detail.designation}</StyledTableCell>: null )}
                {(row.emp_prev_exp_detail !== undefined?<StyledTableCell align="center">{row.emp_prev_exp_detail.from}</StyledTableCell>: null )}
                {(row.emp_prev_exp_detail !== undefined?<StyledTableCell align="center">{row.emp_prev_exp_detail.to}</StyledTableCell>: null )}
                {(row.emp_prev_exp_detail !== undefined?<StyledTableCell align="center">{row.emp_prev_exp_detail.payscale}</StyledTableCell>: null )}
                {(row.emp_prev_exp_detail !== undefined?<StyledTableCell align="center">{row.emp_prev_exp_detail.address}</StyledTableCell>: null )}
                {(row.emp_prev_exp_detail !== undefined?<StyledTableCell align="center">{row.emp_prev_exp_detail.remarks}</StyledTableCell>: null )}
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={handleClickDownloadOne}
                    value={row.emp_no}
                  >
                    Download
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
