import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./../../Components/Header/Header";
import Navbar from "./../../Components/Navbar/Navbar";
import { useState } from "react";
import { format } from "date-fns";
import "./list.css";
import { DateRange } from "react-date-range";
import SearchItem from "./../../Components/SearchItem/SearchItem";
import useFetch from "./../../hooks/useFetch";
const List = () => {
  const location = useLocation();

  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);

  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  //using custom hook
  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 20000}`
  );

  //
  const handleClick = () => {
    console.log(max);
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="">Destination</label>
              <input
                type="text"
                placeholder={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
              />
            </div>
            <div className="lsItem">
              <label htmlFor="">Check-In-Date</label>
              <span
                onClick={(e) => {
                  setOpenDate(!openDate);
                }}
              >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => {
                    setDates([item.selection]);
                  }}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min Price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => {
                      setMin(e.target.value);
                    }}
                    className="lsOptionInput"
                    placeholder=""
                  />
                </div>

                <div className="lsOptionItem" style={{ visibility: "hidden" }}>
                  <span className="lsOptionText">
                    Max Price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => {
                      setMax(e.target.value);
                    }}
                    className="lsOptionInput"
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    placeholder={options.adult}
                    min={1}
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    placeholder={options.children}
                    min={0}
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    placeholder={options.room}
                    min={1}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "Loading"
            ) : (
              <>
                {data.map((item) => {
                  return <SearchItem item={item} key={item._id} />;
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
