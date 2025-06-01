import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../Service/axiosInstance";
import { jwtDecode } from "jwt-decode";
import Boxcontainer from "../Component/Boxcontainer";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signinUser = async () => {
    if (email.trim().length === 0) {
      toast.error("Enter email address");
      return;
    } else if (password.trim().length === 0) {
      toast.error("Enter password");
      return;
    }

    try {
      const response = await logIn({ email, password });
      const token = response.data.jwt;

      localStorage.setItem("token", token);

      const decode = jwtDecode(token);

      localStorage.setItem("user", JSON.stringify(response.data));

      toast.success("Welcome " + response.data.userName);

      switch (decode.authorities) {
        case "ROLE_CUSTOMER":
          navigate("/addfeedback");
          break;
        case "ROLE_ADMIN":
          navigate("/admin");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      toast.error("Invalid email or Password");
      console.error(err);
    }
  };

  return (
    <>
      <Boxcontainer>
        <div className="container p-5 mt-5 col-md-5">
          <h2 className="mb-4 text-center">Login</h2>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              id="email"
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

          <button className="btn btn-primary" onClick={signinUser}>
            Sign in
          </button>

          <p>
            Don't have an account?{" "}
            <Link to="/register" className="link-info">
              Register here
            </Link>
          </p>
        </div>
      </Boxcontainer>
    </>
  );
};

export default SignIn;
