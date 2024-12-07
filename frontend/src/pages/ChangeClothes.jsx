import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Back from "../components/Back";

const ChangeClothes = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    typeOfCloth: "",
    size: "",
    color: "",
    company: "",
    gender: "",
    des: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCloth = async () => {
      try {
        const response = await axios.get(`http://localhost:57111/cloth/${id}`);
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch cloth details.");
      }
    };

    if (id) fetchCloth();
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:57111/cloth/${id}`, data);
      navigate("/");
    } catch (error) {
      setError("Failed to update item.");
    }
  };

  return (
    <div className="p-4">
      <Back destination={`/cloth/details/${id}`} />
      <h1 className="text-2xl font-bold mb-4">Change Item</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Type</label>
          <input
            type="text"
            name="typeOfCloth"
            value={data.typeOfCloth}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Size</label>
          <input
            type="text"
            name="size"
            value={data.size}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Color</label>
          <input
            type="text"
            name="color"
            value={data.color}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={data.company}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Gender</label>
          <select
            name="gender"
            value={data.gender}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded-lg"
            required
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="des"
            value={data.des}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded-lg"
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeClothes;
