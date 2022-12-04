import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import reg from "../../assets/Register.jpg";
const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
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
        city: city,
        phone: phone,
        country: country,
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
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        flexDirection: "column",
        backgroundImage: "{reg}",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#FFFFFF",
          display: "flex",
          justifyContent: "center",
          marginLeft: "2rem",
        }}
      >
        <Typography variant="h3" sx={{ color: "blue", fontWeight: "bold" }}>
          Registration Page
        </Typography>
      </Box>
      <form autocomplete="off">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            justifyContent: "flex-end",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Enter Your Name</Typography>
          <TextField
            id="outlined-basic"
            placeholder="Name"
            variant="outlined"
            required
            size="small"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            justifyContent: "flex-end",
            marginTop: "1rem",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Enter Your Email</Typography>
          <TextField
            id="outlined-basic"
            placeholder="Email"
            variant="outlined"
            required
            size="small"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            justifyContent: "flex-end",
            marginTop: "1rem",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Enter Your Phone Number
          </Typography>
          <TextField
            id="outlined-basic"
            placeholder="phone number"
            variant="outlined"
            required
            size="small"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          {/* {password.length <= 7 && (
            <p className="validate">Enter password of length higher than 7</p>
          )} */}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            justifyContent: "flex-end",
            marginTop: "1rem",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Enter Your City</Typography>
          <TextField
            id="outlined-basic"
            placeholder="City"
            variant="outlined"
            required
            size="small"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          {/* {password.length <= 7 && (
            <p className="validate">Enter password of length higher than 7</p>
          )} */}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            justifyContent: "flex-end",
            marginTop: "1rem",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Enter Your Country
          </Typography>
          <TextField
            id="outlined-basic"
            placeholder="Country name"
            variant="outlined"
            required
            size="small"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
          {/* {password.length <= 7 && (
            <p className="validate">Enter password of length higher than 7</p>
          )} */}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            justifyContent: "flex-end",
            marginTop: "1rem",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Enter Your Password
          </Typography>
          <TextField
            type={"password"}
            id="outlined-basic"
            placeholder="password"
            required
            variant="outlined"
            size="small"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {/* {password.length <= 7 && (
            <p className="validate">Enter password of length higher than 7</p>
          )} */}
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
        >
          <Button variant="contained" disabled={disabled} onClick={handleClick}>
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;

/*const registerPage = `// <div className="login register">
//   <form className="lContainer">
//     <input
//       required={true}
//       type="text"
//       placeholder="Enter Username..."
//       id="un"
//       onChange={(e) => {
//         setUserName(e.target.value);
//       }}
//       className="lInput"
//     />
//     <input
//       type="email"
//       placeholder="Enter Your Email..."
//       id="email"
//       onChange={(e) => {
//         setEmail(e.target.value);
//       }}
//       className="lInput"
//       required={true}
//     />
//     {!email.includes("@") && <p className="validate">{err}</p>}
//     <input
//       type="password"
//       placeholder="Enter Password..."
//       id="pw"
//       onChange={(e) => {
//         setPassword(e.target.value);
//       }}
//       className="lInput"
//       required={true}
//     />
//     {password.length <= 7 && (
//       <p className="validate">Enter password of length higher than 7</p>
//     )}

//     <button onClick={handleClick} className="lButton" disabled={disabled}>
//       Register
//     </button>
//     {message && (
//       <p>
//         {message} <br />
//         Navigating to homepage in 3 secs
//       </p>
//     )}
//   </form>
// </div>
`;*/
