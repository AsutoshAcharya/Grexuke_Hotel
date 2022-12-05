// import sgMail from "@sendgrid/mail";
import styled from "@emotion/styled";
import "./checkout.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

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
    const res = await fetch("/booking", {
      method: "POST",
      body: JSON.stringify({
        ...detailsData,
        amountdue: detailsData.totalamount - amount,
      }),
      headers: { "Content-Type": "application/json" },
    });
    alert("Payment Successful!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

 
  return (
    <div className="wrapper">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",

          gap: "0.3rem",
        }}
      >
        {detailsData && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50vw",
              gap: "0.3rem",
              backgroundColor: "white",
              borderRadius:"0.5rem",
              marginTop: "0.2rem",
              
              padding: "0.1rem",
            }}
          >
            <TextField
              sx={{ width: "100%", color: "red" }}
              value={detailsData.username}
              disabled="true"
            />
            <TextField
              sx={{ width: "100%" }}
              value={detailsData.email}
              disabled="true"
            />
            <TextField
              sx={{ width: "100%" }}
              value={detailsData.city}
              disabled="true"
            />

            <TextField
              sx={{ width: "100%" }}
              value={detailsData.bookedhotel}
              disabled="true"
            />
            <TextField
              sx={{ width: "100%" }}
              value={detailsData.bookedroomnumber}
              disabled="true"
            />
            <TextField
              sx={{ width: "100%" }}
              value={detailsData.checkindate}
              disabled="true"
            />
            <TextField
              sx={{ width: "100%" }}
              value={detailsData.checkoutdate}
              disabled="true"
            />
            <TextField
              sx={{ width: "100%" }}
              value={detailsData.phone}
              disabled="true"
            />
            <TextField
              value={
                detailsData.totalamount * detailsData.bookedroomnumber.length
              }
              disabled="true"
            />
            <TextField
              value={amount}
              placeholder="amount you will pay now"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </Box>
        )}

        <StyledButton onClick={send}>BookNow!</StyledButton>
      </Box>
    </div>
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
