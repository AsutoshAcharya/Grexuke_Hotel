import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Checkout = ({ route, navigation }) => {
  const { detailsData } = useContext(AuthContext);

  console.log(detailsData);

  const send = async () => {
    const res = await fetch("/booking", {
      method: "POST",
      body: JSON.stringify({
        ...detailsData,
        amountpaid: detailsData.totalamount - 4500,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = res.json();
    console.log(data);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "10rem",
        gap:"0.7rem"
      }}
    >
      <Typography> Name:{detailsData.username}</Typography>
      <Typography> email:{detailsData.email}</Typography>
      <Typography> city:{detailsData.city}</Typography>
      <Typography> bookedHotel:{detailsData.bookedhotel}</Typography>
      <Typography> bookedRooms:{detailsData.bookedroom}</Typography>
      <Typography> CheckinDate:{detailsData.checkindate}</Typography>
      <Typography> CheckOutDate:{detailsData.checkoutdate}</Typography>
      <Typography> PhoneNo:{detailsData.phone}</Typography>
      <Typography> TotalAmount:{detailsData.totalamount}</Typography>
      <TextField placeholder="enter the amount you will pay now..."></TextField>

      <Button onClick={send}>Send</Button>
    </Box>
  );
};

export default Checkout;
