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
    axios.post(apiUrl, { id: employeeId }).then((repos) => {
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
              <StyledTableCell align="left" colSpan={9}>
                Basic Details
              </StyledTableCell>
              <StyledTableCell align="left" colSpan={6}>
                Educational Details
              </StyledTableCell>
              <StyledTableCell align="left" colSpan={9}>
                Family Details
              </StyledTableCell>
              <StyledTableCell align="left" colSpan={4}>
                Last 5 Year Stay Details
              </StyledTableCell>
              <StyledTableCell align="left" colSpan={2}>
                Pay Details
              </StyledTableCell>
              <StyledTableCell align="left" colSpan={6}>
                Previous Experience Details
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell align="center">Emp No</StyledTableCell>
              <StyledTableCell align="center">Auth Id</StyledTableCell>
              <StyledTableCell align="center">Designation</StyledTableCell>
              <StyledTableCell align="center">Office No</StyledTableCell>
              <StyledTableCell align="center">Fax</StyledTableCell>
              <StyledTableCell align="center">Joining Date</StyledTableCell>
              <StyledTableCell align="center">Retirement Ext</StyledTableCell>
              <StyledTableCell align="center">Retirement Date</StyledTableCell>
              <StyledTableCell align="center">
                Employment Nature
              </StyledTableCell>
              <StyledTableCell align="center">Exam</StyledTableCell>
              <StyledTableCell align="center">Specialization</StyledTableCell>
              <StyledTableCell align="center">Institute</StyledTableCell>
              <StyledTableCell align="center">Year</StyledTableCell>
              <StyledTableCell align="center">Grade</StyledTableCell>
              <StyledTableCell align="center">Division</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Relationship</StyledTableCell>
              <StyledTableCell align="center">Profession</StyledTableCell>
              <StyledTableCell align="center">
                Present Post Address
              </StyledTableCell>
              <StyledTableCell align="center">Photopath</StyledTableCell>
              <StyledTableCell align="center">DOB</StyledTableCell>
              <StyledTableCell align="center">Active Inactive</StyledTableCell>
              <StyledTableCell align="center">Emp Dep Allergy</StyledTableCell>
              <StyledTableCell align="center">Emp Dep Disease</StyledTableCell>
              <StyledTableCell align="center">From</StyledTableCell>
              <StyledTableCell align="center">To</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Dist_Hq_Name</StyledTableCell>
              <StyledTableCell align="center">Paycode</StyledTableCell>
              <StyledTableCell align="center">Basic Pay</StyledTableCell>
              <StyledTableCell align="center">Designation</StyledTableCell>
              <StyledTableCell align="center">From</StyledTableCell>
              <StyledTableCell align="center">To</StyledTableCell>
              <StyledTableCell align="center">Payscale</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Remarks</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <StyledTableRow key={row.emp_no}>
                <StyledTableCell align="center" style={{ width: 5000 }}>
                  {row.emp_no}
                </StyledTableCell>
                <StyledTableCell align="center">{row.auth_id}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.designation}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.office_no}
                </StyledTableCell>
                <StyledTableCell align="center">{row.fax}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.joining_date}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.retirement_ext}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.retirement_date}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.employment_nature}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_education_detail.exam}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_education_detail.specialization}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_education_detail.institute}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_education_detail.year}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_education_detail.grade}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_education_detail.division}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_family_detail.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_family_detail.relationship}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_family_detail.profession}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_family_detail.present_post_addr}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_family_detail.photopath}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_family_detail.dob}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_family_detail.active_inactive}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_family_detail.emp_dep_allergy}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_family_detail.emp_dep_disease}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_last5yrstay_detail.from}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_last5yrstay_detail.to}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_last5yrstay_detail.res_addr}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_last5yrstay_detail.dist_hq_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_pay_detail.pay_code}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_pay_detail.basic_pay}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_prev_exp_detail.designation}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_prev_exp_detail.from}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_prev_exp_detail.to}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_prev_exp_detail.payscale}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_prev_exp_detail.address}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.emp_prev_exp_detail.remarks}
                </StyledTableCell>
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
