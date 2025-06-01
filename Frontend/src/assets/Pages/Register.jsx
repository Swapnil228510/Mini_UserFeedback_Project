import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignUp } from "../Service/axiosInstance";
import Boxcontainer from "../Component/Boxcontainer";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [mobNo, setMobNo] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const RegisterUser = async () => {
    if (userName.trim().length === 0) {
      toast.error("Enter User Name");
      return;
    } else if (email.trim().length === 0) {
      toast.error("Enter email address");
      return;
    } else if (password.trim().length === 0) {
      toast.error("Enter password");
      return;
    } else if (mobNo.trim().length === 0) {
      toast.error("Enter mobile number");
      return;
    } else if (gender.trim().length === 0) {
      toast.error("Please select Gender");
      return;
    }

    const userInfo = {
      userName: userName,
      email: email,
      password: password,
      mobNo: mobNo,
      gender: gender,
    };

    try {
      const response = await SignUp(userInfo);

      if (response.data.success == true) {
        toast.success("Successfully Registered");
        navigate("/");
      }
    } catch (error) {
      console.log("error while register " + error);
    }
  };
  return (
    <>
      <Boxcontainer>
        <div className="container p-5 mt-5 col-md-5">
          <h2 className="mb-4 text-center">Register</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="userName"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              id="MobNo"
              placeholder="Mobile Number"
              value={mobNo}
              onChange={(e) => setMobNo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="text">Select Gender</label>
            <div className="mb-3">
              <input
                type="radio"
                className="form-check-input"
                id="male"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label className="text">Male</label>
            </div>

            <div className="mb-3">
              <input
                type="radio"
                className="form-check-input"
                id="female"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label className="text">Female</label>
            </div>
          </div>
          <button className="btn btn-primary" onClick={RegisterUser}>
            Register
          </button>
          &nbsp;
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </Boxcontainer>
    </>
  );
};

export default Register;
