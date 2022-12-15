import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import regs from "../../assets/pexels-pixabay-258154.jpg";
import reg from "../../assets/Register.jpg";
const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [regError, SetRegError] = useState(null);

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
    try {
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
      alert("Registration successful! redirecting to homepage");
    } catch (err) {
      SetRegError(err);
      alert(`${err}`)
      console.log(err);
    }
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
        backgroundImage: `url(${regs})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
     
      <form
        autoComplete="off"
        style={{
          backgroundColor: "#41f2e9",
          opacity: ".8",
          padding: "2rem",
          borderRadius: ".6rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            justifyContent: "flex-end",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Enter Your Name
          </Typography>
          <TextField
            id="outlined-basic"
            placeholder="Name"
            variant="outlined"
            required
            size="small"
            // helperText={username.length > 4 ? " " : "Enter a valid name"}
            sx={{ backgroundColor: "white", color: "black" }}
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
          <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Enter Your Email
          </Typography>
          <TextField
            id="outlined-basic"
            placeholder="Email"
            variant="outlined"
            required
            size="small"
            sx={{ backgroundColor: "white", color: "black" }}
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
          <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Enter Your Phone Number
          </Typography>
          <TextField
            type="number"
            id="outlined-basic"
            placeholder="phone number"
            variant="outlined"
            required
            sx={{ backgroundColor: "white", color: "black" }}
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
          <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Enter Your City
          </Typography>
          <TextField
            id="outlined-basic"
            placeholder="City"
            variant="outlined"
            sx={{ backgroundColor: "white", color: "black" }}
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
          <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Enter Your Country
          </Typography>
          <TextField
            id="outlined-basic"
            placeholder="Country name"
            variant="outlined"
            sx={{ backgroundColor: "white", color: "black" }}
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
          <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Enter Your Password
          </Typography>
          <TextField
            type={"password"}
            id="outlined-basic"
            placeholder="password"
            sx={{ backgroundColor: "white", color: "black" }}
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

//  { /*regError && (
//           <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
//             regError
//           </Typography>
//         )*/ }

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
