import React, { useEffect, useState } from "react";
import Boxcontainer from "../Component/Boxcontainer";
import { toast } from "react-toastify";
import { getUserFeedback, updateFeedback } from "../Service/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

const ViewFeedback = () => {
  const [feedbackList, setFeednackList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [showModel, setShowModel] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await getUserFeedback();
      setFeednackList(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong with Feedbacks");
    }
  };

  const editFeedback = (id, currentFeedback) => {
    setEditId(id);
    setEditText(currentFeedback);
    console.log(currentFeedback);

    setShowModel(true);
  };

  const saveUpdatedFeedback = async () => {
    const updatedFeed = {
      feedback: editText,
    };
    await updateFeedback(editId, updatedFeed);
    toast.success("Feedback is updated");
    setShowModel(false);
    fetchFeedback();
  };

  const handleCancel = () => {
    setEditId(null);
    setEditText("");
    setShowModel(false);
  };

  return (
    <>
      <Boxcontainer>
        <h2 className="mb-4 text-center">All Feedbacks</h2>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Feedbacks</th>
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
                      onClick={() => editFeedback(fb.id, fb.feedback)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No Feedback Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/addfeedback")}
        >
          Back
        </button>
      </Boxcontainer>

      {/* Edit Modal */}

      <Modal show={showModel} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="feedbackTextarea">
            <Form.Label>Your Feedback</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Update your feedback here..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveUpdatedFeedback}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewFeedback;
