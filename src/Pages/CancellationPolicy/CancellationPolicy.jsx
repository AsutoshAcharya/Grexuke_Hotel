import { Box, Button } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const StyledButton = styled(Button)`
  background-color: rgb(227, 34, 111);
  color: #ffffff;
  &:hover {
    background-color: rgb(255, 120, 174);
  }
`;

const CancellationPolicy = () => {
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const navigate = useNavigate();
  const cancelBooking = async () => {
    try {
      await axios.delete(`/booking/${id}`);
      alert("Your booking has been cancelled redirecting to homepage");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.5rem",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgb(247, 228, 235)",
          width: "95vw",
          height: "70vh",
          padding: "1rem",
          borderRadius: "0.5rem",
          boxShadow: "0px 0px 8px rgb(54, 42, 46)",
        }}
      >
        <Box sx={{ color: "rgb(10, 55, 110)" }}>
          <Typography variant="h3">GreXuke Cancellation Policy</Typography>
        </Box>
        <Box sx={{ marginTop: "1rem", color: "rgb(10, 55, 110)" }}>
          <Typography variant="h2">
            Cancellation, deposit and prepayment policies
          </Typography>
          <Typography variant="h5">
            Clarity for your guests. Guaranteed revenue for you
            <br />
            <br />
          </Typography>
        </Box>
        <Box>
          <Typography>
            Cancellations are an unavoidable part of hospitality. No matter how
            much your guests plan their trip, any number of unexpected events
            can end up affecting their bookings. When that happens, it’s
            important that they know what to expect – just as it’s important
            that you don’t miss out on revenue.
            <br />
            <br />
            To make sure your guests know how much you’ll charge them and when,
            we recommend that you set up the cancellation, deposit and
            prepayment policies that suit your property. Not only will this help
            your guests avoid surprises, it’ll also mean that you won’t miss out
            on revenue unnecessarily.
            <br />
            <br />
            It’s now easier than ever to set up your policies on the extranet.
            All the main cancellation and payment scenarios are covered, and all
            you have to do is answer a few key questions to configure your
            preferred policies.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "rgb(247, 228, 235)",
          marginTop: "1rem",
          width: "95vw",
          marginBottom: "0.5rem",
          padding: "1rem",
          borderRadius: "0.5rem",
          boxShadow: "0px 0px 8px rgb(54, 42, 46)",
        }}
      >
        <Typography variant="h2" sx={{ color: "rgb(10, 55, 110)" }}>
          How it works – overview
        </Typography>
        <br />

        <Typography sx={{ fontSize: "1rem" }}>
          You can check your policies in your extranet by clicking on the
          ‘Property’ tab and selecting ‘Policies’. Under ‘Cancellation
          policies’, you can choose between a fully flexible or a customised
          policy – or apply different policies to different room types.
          <br />
          <br />
          - With a fully flexible policy, your guests will only pay when they
          stay at your property, and can cancel free of charge during a time
          frame of your choice prior to check-in.
          <br />
          <br />
          - With a customised policy, you can choose how long before check-in
          guests can cancel for free, and how much they’ll be charged if they do
          cancel after that point. You can also set up a prepayment before
          check-in, and define how and when you’d like to receive that payment.
          On top of that, you can apply different policies to different room
          types.
          <br />
          <br />
          - With pre-authorisation preferences, you can show guests whether
          you’ll pre-authorise their card or not, as well as how much you’ll
          pre-authorise and when. Pre-authorisation can be applied to specific
          policy types, too.
          <br />
          <br />- With a deposit, you can make sure you’re covered financially
          if a guest cancels a booking. If the guest does end up staying, you
          can give them back the money afterwards, or simply deduct it from the
          overall price of the reservation. Deposits are usually paid by bank
          transfer, so this is particularly useful if you aren’t able to charge
          credit cards.
        </Typography>
      </Box>
      <StyledButton onClick={cancelBooking}>Cancel Booking</StyledButton>
    </Box>
  );
};

export default CancellationPolicy;
