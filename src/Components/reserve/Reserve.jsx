import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { searchContext } from "./../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Reserve = ({ setOpen, hotelId, bookingInfo }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [roomNumbers, setRoomNumbers] = useState([]);

  const [rooms, setRooms] = useState([]);

  const [disabled, setDisabled] = useState(true);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(searchContext);

  const { user, setdetailsData } = useContext(AuthContext);
  console.log(user);

  // console.log(bookingInfo);

  //getting dates
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // const roomSet=new Set();
    // const roomNumbers=new Set();

    const date = new Date(start.getTime());

    const dates = [];

    while (date < end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    // console.log(roomNo);
    // console.log(e.target.dataset.info);
    const roomNumberValue = e.target.dataset.info;
    // if (!roomNumbers.includes(e.target.dataset.info)) {
    //   const newRoomNumbers = [...roomNumbers, e.target.dataset.info];
    //   setRoomNumbers(newRoomNumbers);
    // }

    if (!rooms.includes(e.target.name)) {
      const newRooms = [...rooms, e.target.name];
      setRooms(newRooms);
    }
    // console.log(roomNumbers);
    // console.log(rooms);
    const value = e.target.value;

    if (checked) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setRoomNumbers(
      checked
        ? [...roomNumbers, roomNumberValue]
        : roomNumbers.filter((room) => room !== roomNumberValue)
    );

    // setRooms(
    //   checked
    //     ? [...rooms, e.target.name]
    //     : roomNumbers.filter((room) => room !== e.target.name)
    // );
    // console.log(rooms);

    // console.log(roomNumbers);

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
    console.log(selectedRooms);
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      // await Promise.all(
      //   selectedRooms.map((roomId) => {
      //     const res = axios.put(`/rooms/availability/${roomId}`, {
      //       dates: alldates,
      //     });
      //     return res.data;
      //   })
      // );
      setOpen(false);
      setdetailsData({
        ...bookingInfo,
        bookedroom: rooms,
        bookedroomnumber: roomNumbers,
      });
      navigate("/checkout");
    } catch (err) {}
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              {/*<div className="rPrice">{item.price}</div>*/}
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    name={item.title}
                    data-info={roomNumber.number}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} disabled={disabled} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
