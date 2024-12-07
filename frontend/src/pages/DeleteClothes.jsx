import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Back from "../components/Back";

const DeleteClothes = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:57111/cloth/${id}`);
      setSuccess(true);
      navigate("/");
    } catch (error) {
      setError("Failed to delete item.");
    }
  };

  return (
    <div className="p-4">
      <Back destination={`/cloth/details/${id}`} />
      <h1 className="text-2xl font-bold mb-4">Delete Item</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && (
        <div className="text-green-600 mb-2">Item successfully deleted!</div>
      )}
      <div className="space-y-4">
        <p>Are you sure you want to delete this item?</p>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DeleteClothes;
