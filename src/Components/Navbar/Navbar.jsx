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

const Navbar = () => {
  const [list, setList] = useState();

  const { user } = useContext(AuthContext);
  const { data } = useFetch(`/booking/${user?.username}`);

  useEffect(() => {
    setList(data);
    /*console.table(list);*/
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

  const handleBookingDelete = () => {};

  //loading userBooking data
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleBookingDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

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
              className="user_profile_btn"
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
                    checkboxSelection
                    getRowId={(row) => row._id}
                  />
                )}
              </div>
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
