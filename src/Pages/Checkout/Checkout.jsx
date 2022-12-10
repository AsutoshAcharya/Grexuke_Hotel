import styled from "@emotion/styled";
import "./checkout.css";
import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { Typography } from "@mui/material";
import img1 from "../../assets/Register.jpg";

const StyledButton = styled(Button)`
  background-color: rgb(227, 34, 111);
  color: #ffffff;
  &:hover {
    background-color: rgb(255, 120, 174);
  }
`;

const Checkout = ({ route, navigation }) => {
  const { detailsData } = useContext(AuthContext);
  const [amount, setAmount] = useState();
  const navigate = useNavigate();
  console.log(detailsData);

  const send = async () => {
    const amountDue =
      detailsData.totalamount * detailsData.bookedroomnumber.length - amount;
    const res = await fetch("/booking", {
      method: "POST",
      body: JSON.stringify({
        ...detailsData,
        amountdue: amountDue,
      }),
      headers: { "Content-Type": "application/json" },
    });
    alert("Payment Successful!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        flexDirection: "column",
        backgroundImage:`url(${img1})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {detailsData && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "1rem",
            
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "1rem",
              marginLeft:'35rem'
              // justifyContent: "flex-end",
            }}
          >
            <Typography>Name: </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {detailsData.username}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginLeft:'35rem'
              // justifyContent: "flex-end",
            }}
          >
            <Typography>Email: </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {detailsData.email}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft:'35rem',
              gap: "1rem",
            }}
          >
            <Typography>City: </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {detailsData.city}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginLeft:'35rem'
            }}
          >
            <Typography>Hotel: </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {detailsData.bookedhotel}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginLeft:'35rem'
            }}
          >
            <Typography>Room No: </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {detailsData.bookedroomnumber}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginLeft:'35rem'
            }}
          >
            <Typography>CheckIn: </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {detailsData.checkindate}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginLeft:'35rem'
            }}
          >
            <Typography>CheckOut: </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {detailsData.checkoutdate}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginLeft:'35rem'
            }}
          >
            <Typography>Phone: </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {detailsData.phone}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginLeft:'35rem'
            }}
          >
            <Typography>Total: </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {detailsData.totalamount * detailsData.bookedroomnumber.length}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginLeft:'35rem'
            }}
          >
            
            <TextField
              value={amount}
              placeholder="amount you will pay now"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            ></TextField>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              marginLeft: "39rem",
            }}
          >
            <StyledButton onClick={send}>BookNow!</StyledButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Checkout;

// <Typography> Name:{detailsData.username}</Typography>
// <Typography> email:{detailsData.email}</Typography>
// <Typography> city:{detailsData.city}</Typography>
// <Typography> bookedHotel:{detailsData.bookedhotel}</Typography>
// <Typography> bookedRooms:{detailsData.bookedroom}</Typography>
// <Typography> CheckinDate:{detailsData.checkindate}</Typography>
// <Typography> CheckOutDate:{detailsData.checkoutdate}</Typography>
// <Typography> PhoneNo:{detailsData.phone}</Typography>
// <Typography> TotalAmount:{detailsData.totalamount}</Typography>
// <TextField placeholder="enter the amount you will pay now..."></TextField>

// <div className="wrapper">
// <Box
//   sx={{
//     display: "flex",
//     alignItems: "center",
//     flexDirection: "column",

//     gap: "0.3rem",
//   }}
// >
//   {detailsData && (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         width: "50vw",
//         gap: "0.3rem",
//         backgroundColor: "white",
//         borderRadius: "0.5rem",
//         marginTop: "0.2rem",

//         padding: "0.1rem",
//       }}
//     >
//       <TextField
//         sx={{ width: "100%", color: "red" }}
//         value={detailsData.username}
//         disabled="true"
//       />
//       <TextField
//         sx={{ width: "100%" }}
//         value={detailsData.email}
//         disabled="true"
//       />
//       <TextField
//         sx={{ width: "100%" }}
//         value={detailsData.city}
//         disabled="true"
//       />

//       <TextField
//         sx={{ width: "100%" }}
//         value={detailsData.bookedhotel}
//         disabled="true"
//       />
//       <TextField
//         sx={{ width: "100%" }}
//         value={detailsData.bookedroomnumber}
//         disabled="true"
//       />
//       <TextField
//         sx={{ width: "100%" }}
//         value={detailsData.checkindate}
//         disabled="true"
//       />
//       <TextField
//         sx={{ width: "100%" }}
//         value={detailsData.checkoutdate}
//         disabled="true"
//       />
//       <TextField
//         sx={{ width: "100%" }}
//         value={detailsData.phone}
//         disabled="true"
//       />
//       <TextField
//         value={
//           detailsData.totalamount * detailsData.bookedroomnumber.length
//         }
//         disabled="true"
//       />
//       <TextField
//         value={amount}
//         placeholder="amount you will pay now"
//         onChange={(e) => {
//           setAmount(e.target.value);
//         }}
//       />
//     </Box>
//   )}

//   <StyledButton onClick={send}>BookNow!</StyledButton>
// </Box>
// </div>
