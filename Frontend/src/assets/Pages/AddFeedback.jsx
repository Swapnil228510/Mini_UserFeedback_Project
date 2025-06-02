import React, { useState } from "react";
import Boxcontainer from "../Component/Boxcontainer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addUserFeedback } from "../Service/axiosInstance";

const AddFeedback = () => {
  const [feedback, setFeedback] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const Userfeedback = async () => {
    if (feedback.trim().length === 0) {
      toast.error("Please add feedback");
      return;
    }

    const feedbackData = {
      feedback: feedback,
    };

    try {
      console.log(userId + " ididididi");
      const response = await addUserFeedback(feedbackData);

      if (response.data.success === true) {
        toast.success("Successfully Feedback is added");
        setFeedback("");
        setShowForm(false);
      } else {
        toast.error("Please add Feedback again");
      }
    } catch (err) {
      console.error(err);
      toast.error("Somethig went wrong");
    }
  };
  return (
    <>
      <Boxcontainer>
        <div className="container p-5 mt-5 col-md-5">
          <h2 className="mb-4 text-center">Feedback</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Add Feedback
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-primary"
            onClick={() => navigate("/viewfeedback")}
          >
            View Feedbacks
          </button>
          <br />
          <br />
          {showForm && (
            <div>
              <h8>Your Feedback</h8>
              <textarea
                rows={5}
                // className="feedback-text"
                className="form-control mb-3"
                placeholder="Write your feedback here.."
                value={feedback}
                onChange={(e) => {
                  setFeedback(e.target.value);
                }}
              ></textarea>{" "}
              <br />
              <button className="btn btn-secondary" onClick={Userfeedback}>
                Submit
              </button>
            </div>
          )}
        </div>
      </Boxcontainer>
    </>
  );
};

export default AddFeedback;
