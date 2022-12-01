import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const [message, setMessage] = useState(null);

  const [err, setErr] = useState("");

  const { loading, error, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (username.length === 0) {
      setDisabled(true);
    }
    if (!password.length > 7) {
      setDisabled(true);

      console.log(err);
    }
    if (!email.includes("@")) {
      setErr("enter valid email");

      setDisabled(true);
    }
    if (password.length > 7 && email.includes("@") && username !== "") {
      setErr(null);
      setDisabled(false);
    }
  }, [password, email, err, username]);
  const handleClick = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8800/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setTimeout(() => {
      navigate("/");
    }, 3000);
    setMessage(data);
  };

  return (
    <div className="login register">
      <form className="lContainer">
        <input
          required={true}
          type="text"
          placeholder="Enter Username..."
          id="un"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          className="lInput"
        />
        <input
          type="email"
          placeholder="Enter Your Email..."
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="lInput"
          required={true}
        />
        {!email.includes("@") && <p className="validate">{err}</p>}
        <input
          type="password"
          placeholder="Enter Password..."
          id="pw"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="lInput"
          required={true}
        />
        {password.length <= 7 && (
          <p className="validate">Enter password of length higher than 7</p>
        )}

        <button onClick={handleClick} className="lButton" disabled={disabled}>
          Register
        </button>
        {message && (
          <p>
            {message} <br />
            Navigating to homepage in 3 secs
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;
