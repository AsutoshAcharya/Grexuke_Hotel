import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Checkout = ({ route, navigation }) => {
  const { detailsData } = useContext(AuthContext);
  //   const {data} = useParams();
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
    <div>
      <button onClick={send}>Send</button>
    </div>
  );
};

export default Checkout;
