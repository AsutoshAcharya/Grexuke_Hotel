import React, { useContext, useState } from "react";
import "./hotels.css";
import Navbar from "./../../Components/Navbar/Navbar";
import Header from "./../../Components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import MailList from "../../Components/MailList/MailList";
import useFetch from "./../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { searchContext } from "./../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../Components/reserve/Reserve";

const Hotels = () => {
  const location = useLocation();
  const id = location.pathname.toString().split("/");
  const hotelId = id[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [bookingInfo, setBookingInfo] = useState({});

  const { data, loading } = useFetch(`/hotels/find/${hotelId}`);
  const { dates, options } = useContext(searchContext);
  // console.log(dates);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const { user } = useContext(AuthContext);
  // console.log(user);
  const navigate = useNavigate();

  // const bookingInfo={
  //   username:user.username,
  //   email:user.email,
  //   bookedhotel:data.name,
  //   city:user.city,
  //   phone:user.phone,
  //   checkindate:dates[0].startDate,
  //   checkoutdate:dates[0].endDate,
  // }

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideIndex;
    if (direction === "l") {
      newSlideIndex = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideIndex = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideIndex);
  };

  const handleClick = () => {
    
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
    setBookingInfo({
      username: user.username,
      email: user.email,
      bookedhotel: data.name,
      city: user.city,
      phone: user.phone,
      checkindate: dates[0].startDate.toString(),
      checkoutdate: dates[0].endDate.toString(),
      totalamount: days * data.cheapestPrice * options.room,
    });
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => {
                  setOpen(false);
                }}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent Location - {data.distance}m from center
            </span>
            <span className="hotelPricingHighlight">
              Book a stay over Rs {data.cheapestPrice} at this property and get
              a free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => {
                return (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      src={photo}
                      onClick={() => handleOpen(i)}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                );
              })}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Prefer for {days}-night stay!</h1>
                <span>
                  Located in {data.city},this property has an excellent location
                  score of 9.8!
                </span>
                <h2>
                  <b>Rs.{days * data.cheapestPrice * options.room}</b>
                </h2>
                ({days} nights)
                <button onClick={handleClick}>Reserve or Book now</button>
              </div>
            </div>
          </div>
          <MailList />

          {/*--------------footer to add----------------*/}
        </div>
      )}
      {openModal && (
        <Reserve
          setOpen={setOpenModal}
          bookingInfo={bookingInfo}
          hotelId={hotelId}
        />
      )}
    </div>
  );
};

export default Hotels;
