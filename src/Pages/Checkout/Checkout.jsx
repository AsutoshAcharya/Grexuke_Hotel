// import sgMail from "@sendgrid/mail";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
// import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Checkout = ({ route, navigation }) => {
  const { detailsData } = useContext(AuthContext);

  console.log(detailsData);

  const send = async () => {
    const res = await fetch("/booking", {
      method: "POST",
      body: JSON.stringify({
        ...detailsData,
        amountdue: detailsData.totalamount - 4500,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = res.json();
    console.log(data);
  };

  // const sendEmail = async () => {
  //   const API_KEY =
  //     "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";
  //   sgMail.setApiKey(API_KEY);
  //   const message = {
  //     to: "victorbiju9@gmail.com",
  //     from: "asutosha109@gmail.com",
  //     subject: "GreXukeBooking",
  //     text: "Hello from GreXuke Booking",
  //     html: "<h1>Hello User</h1>",
  //   };
  //   await sgMail.send(message).then((data) => {
  //     console.log("email sent...");
  //   });
  // };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "10rem",
        gap: "0.7rem",
      }}
    >
      <Box sx={{ backgroundColor: "lightblue" }}>
        <Box>
          <Typography>Your name</Typography>
        </Box>
      </Box>
      <Button onClick={send}>Send</Button>
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
