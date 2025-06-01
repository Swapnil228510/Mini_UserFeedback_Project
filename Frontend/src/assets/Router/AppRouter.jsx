import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../Pages/SignIn";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import AddFeedback from "../Pages/AddFeedback";
import Admin from "../Pages/Admin";
import ViewFeedback from "../Pages/ViewFeedback";
import ViewFeedDetailsAdmin from "../Pages/ViewFeedDetailsAdmin";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/addfeedback"
        element={
          <PrivateRoute role="ROLE_CUSTOMER">
            <AddFeedback />
          </PrivateRoute>
        }
      />

      <Route
        path="/viewfeedback"
        element={
          <PrivateRoute role="ROLE_CUSTOMER">
            <ViewFeedback />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute role="ROLE_ADMIN">
            <Admin />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/viewfeedback/:id"
        element={
          <PrivateRoute role="ROLE_ADMIN">
            <ViewFeedDetailsAdmin />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
