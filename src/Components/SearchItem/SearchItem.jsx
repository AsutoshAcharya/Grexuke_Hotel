import React from "react";
import "./searchItem.css";
import { Link } from "react-router-dom";
const SearchItem = ({ item }) => {
  // src="https://cf.bstatic.com/xdata/images/hotel/square200/326407531.webp?k=5c43961ad7134cc37e4c1d8de225bcd90f74d5df4c5daa8dace98305e3c5a387&o=&s=1"

  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport Taxi</span>
        <span className="siSubtitle">Room with Air conditioning</span>
        {/* <span className="siFeatures">{item.desc}</span>*/}
        <span className="siCancelOp">Free Cancellation</span>
        <span className="siCancelOpSubtitle">
          You Can cancel later,so lock in this great price today
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailsTexts">
          <span className="siPrice">Rs.{item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availabilities</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
