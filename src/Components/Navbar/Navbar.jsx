import * as React from "react";
import "./datatable.scss";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { bookingColumns } from "../../datasource.js";
import "./Navbar.css";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import styled from "@emotion/styled";

const StyledButton = styled(Button)`
  float: right;
  background-color: rgb(237, 29, 14);
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  color: #ffffff;
  box-shadow: 0px 0px 5px rgb(247, 116, 106);
  &:hover {
    background-color: rgb(245, 76, 64);
  }
`;

const Navbar = () => {
  const [list, setList] = useState();

  const { user } = useContext(AuthContext);
  const { data } = useFetch(`/booking/${user?.username}`);

  useEffect(() => {
    setList(data);
  }, [data, list]);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  const logoutHandler = () => {
    localStorage.clear();
    window.location.reload();
  };

  // const handleBookingDelete = () => {
  //   // navigate("/Cancellation")
  // };
  const viewDetails = () => {};

  //loading userBooking data

  // <Link to="/booking" style={{ textDecoration: "none" }} state={{ id: params.row._id }}>
  //             <div className="viewButton" onClick={viewDetails}>
  //               ViewDetails
  //             </div>
  //           </Link>
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to="/cancel"
              style={{ textDecoration: "none" }}
              state={{ id: params.row._id }}
            >
              <div className="deleteButton">Cancel Booking</div>
            </Link>
          </div>
        );
      },
    },
  ];
  //params.row._id
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">GreXuke Booking Application</span>
        </Link>

        {user ? (
          <div className="userProfile">
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              className="profile-btn"
              sx={{ borderRadius: "25px" }}
            >
              {user.username} &nbsp;
              <div>
                <img src={user?.img} alt="" className="userImage" />
              </div>
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              className="pop"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div className="datatable">
                {list !== undefined && (
                  <DataGrid
                    className="datagrid"
                    rows={list}
                    columns={bookingColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    getRowId={(row) => row._id}
                  />
                )}
              </div>
              <StyledButton onClick={logoutHandler}>Logout</StyledButton>
            </Popover>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={handleRegister}>
              Register
            </button>
            <button className="navButton" onClick={handleLogin}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
