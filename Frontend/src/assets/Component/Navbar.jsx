import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <div>
        <nav>
          {token && (
            <button
              className="btn btn-secondary"
              onClick={logout}
              style={{ position: "absolute", right: "10px", top: "10px" }}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
