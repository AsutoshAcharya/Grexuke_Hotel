import React from "react";
import "./featuredProperties.css";
import useFetch from "./../../hooks/useFetch";
const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

  return (
    <div className="fp">
      {loading ? (
        "Loading please wait"
      ) : (
        <React.Fragment>
          {data.map((item, i) => {
            return (
              <div className="fpItem" key={item?._id}>
                {/*"https://cf.bstatic.com/xdata/images/hotel/square600/123801934.webp?k=27073a18101dd5a4eefc76251f7d476be72e19ed03e98819f2d94667dd60f31a&o=&s=1"*/}
                <img src={item.photos[0]} alt="" className="fpImg" />
                <span className="fpName">{item?.name}</span>
                <span className="fpCity">{item?.city}</span>
                <span className="fpPrice">
                  Starting from Rs.{item?.cheapestPrice}
                </span>
                {item?.rating && (
                  <div className="fpRating">
                    <button>{item?.rating}</button>

                    <span>Excellent</span>
                  </div>
                )}
              </div>
            );
          })}
        </React.Fragment>
      )}
    </div>
  );
};

export default FeaturedProperties;
