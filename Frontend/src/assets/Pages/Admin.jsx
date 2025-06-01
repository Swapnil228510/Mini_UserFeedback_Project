import React, { useEffect, useState } from "react";
import Boxcontainer from "../Component/Boxcontainer";
import { deleteFeedback, getAllFeedbacks } from "../Service/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllFeedback();
  }, []);
  const fetchAllFeedback = async () => {
    try {
      const response = await getAllFeedbacks();
      setFeedbackList(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong with Feedbacks");
    }
  };

  const removeFeedback = async (feedId) => {
    try {
      const response = await deleteFeedback(feedId);
      toast.success("Feedback is Deleted");
      fetchAllFeedback();
    } catch (err) {
      console.error(err);
      toast.error("Feedback is not deleted");
    }
  };

  return (
    <>
      <Boxcontainer>
        <h2 className="mb-4 text-center">Admin Feedback Dashboard</h2>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Feedback</th>
              <th>Date and Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.length > 0 ? (
              feedbackList.map((fb, index) => (
                <tr key={fb.id}>
                  <td>{index + 1}</td>
                  <td>{fb.feedback}</td>
                  <td>{fb.Date_Time}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/admin/viewfeedback/${fb.id}`)}
                    >
                      View
                    </button>
                    &nbsp;&nbsp;
                    <button
                      className="btn btn-primary"
                      onClick={() => removeFeedback(fb.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No Feedbacks are Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Boxcontainer>
    </>
  );
};

export default Admin;
