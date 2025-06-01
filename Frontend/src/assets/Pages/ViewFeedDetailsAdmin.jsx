import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Boxcontainer from "../Component/Boxcontainer";
import { feedbackDetails } from "../Service/axiosInstance";

const ViewFeedDetailsAdmin = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const aboutFeedback = async () => {
      try {
        const response = await feedbackDetails(id);

        setFeedback(response.data);
      } catch (err) {
        console.error(err);
        toast.error("Feedback is not loaded");
      } finally {
        setLoading(false);
      }
    };
    aboutFeedback();
  }, [id]);
  if (loading) {
    return (
      <Boxcontainer>
        <div className="text-center mt-5">
          <h4>Loading feedback details...</h4>
        </div>
      </Boxcontainer>
    );
  }

  if (!feedback) {
    return (
      <Boxcontainer>
        <div className="text-center mt-5">
          <h4>No feedback found.</h4>
        </div>
      </Boxcontainer>
    );
  }

  return (
    <>
      {id}
      <Boxcontainer>
        <div className="container mt-4">
          <h2 className="mb-4 text-center">Feedback Details</h2>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>User Name</th>
                <td>{feedback.userName}</td>
              </tr>
              <tr>
                <th>Email Id </th>
                <td>{feedback.email}</td>
              </tr>
              <tr>
                <th>Mobile Number </th>
                <td>{feedback.mobNo}</td>
              </tr>

              <tr>
                <th>Gender</th>
                <td>{feedback.gender}</td>
              </tr>
              <tr>
                <th>Feedback</th>
                <td>{feedback.feedDto.feedback}</td>
              </tr>
              <tr>
                <th>Date and Time</th>
                <td>{feedback.feedDto.Date_Time}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          {" "}
          Back
        </button>
      </Boxcontainer>
    </>
  );
};

export default ViewFeedDetailsAdmin;
