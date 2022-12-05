import React, { useState } from "react";
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

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

  return (
    <div>
      <button onClick={findUser}>Find</button>
    </div>
  );
};

export default BookingDetails;
