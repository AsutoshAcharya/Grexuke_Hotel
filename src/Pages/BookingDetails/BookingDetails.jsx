import React, { useState } from "react";
import axios from "axios";
// import { PDFDownloadLink } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { Box, Typography } from "@mui/material";
// import PdfFile from "../../Components/PdfFile/PdfFile";

// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
// import PdfFile from "../../Components/PdfFile/PdfFile";

const BookingDetails = () => {
  const location = useLocation();

  const { id } = location.state;
  const { data, reFetch } = useFetch(`/booking/find/${id}`);

  useEffect(() => {
    reFetch();
  }, []);
  const findUser = async (e) => {
    e.preventDefault();
    console.log(id);
    console.log(data);
  };
  // <PdfFile />
  return <div></div>;
};

export default BookingDetails;

// <PDFDownloadLink document={<PdfFile />} fileName="bookingdetails.pdf">
//         {({ loading }) =>
//           loading ? (
//             <button>Loading Document</button>
//           ) : (
//             <button>Download</button>
//           )
//         }
//       </PDFDownloadLink>

// <Box
//     sx={{
//       display: "flex",
//       alignItems: "center",
//       flexDirection: "column",
//       marginTop: "10rem",
//       gap: "0.7rem",
//     }}
//   ></Box>

// {data && (
//         <>
//           <Typography> Name:{data.username}</Typography>
//           <Typography> email:{data.email}</Typography>
//           <Typography> city:{data.city}</Typography>
//           <Typography> bookedHotel:{data.bookedhotel}</Typography>
//           <Typography> bookedRooms:{data.bookedroom}</Typography>
//           <Typography> CheckinDate:{data.checkindate}</Typography>
//           <Typography> CheckOutDate:{data.checkoutdate}</Typography>
//           <Typography> PhoneNo:{data.phone}</Typography>
//           <Typography> TotalAmount:{data.amountpaid}</Typography>
//         </>
//       )}
