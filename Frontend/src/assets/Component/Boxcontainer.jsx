import React from "react";

const Boxcontainer = ({ children }) => {
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <div style={boxStyle.container}>{children}</div>
      </div>
    </>
  );
};

const boxStyle = {
  container: {
    display: "inline-block",
    margin: "100px auto 0 50px", //top, right(auto), bottom(0), left(50px)

    padding: "2px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    minWidth: "50%",
    boxSizing: "border-box",
  },
};

export default Boxcontainer;
