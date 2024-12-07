import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";

const Default = () => {
  const [cloth, setCloth] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:57111/cloth")
      .then((response) => {
        setCloth(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await axios.get("http://localhost:57111/cloth/sizes");
        setSizes(response.data);
      } catch (error) {
        console.log("Error fetching sizes:", error);
      }
    };

    fetchSizes();
  }, []);

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setSelectedSize(size);
    setLoading(true);

    const url = size
      ? `http://localhost:57111/cloth?size=${size}`
      : "http://localhost:57111/cloth";
    axios
      .get(url)
      .then((response) => {
        setCloth(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error filtering by size:", error);
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Clothes</h1>
        <Link to="/cloth/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>

      <div className="mb-4">
        <label className="mr-2">Sort by Size</label>
        <select
          value={selectedSize}
          onChange={handleSizeChange}
          className="border px-4 py-2 rounded-md"
        >
          <option value="">Select a Size</option>
          {sizes.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cloth.map((cloth, index) => (
            <div
              key={cloth._id}
              className="border border-slate-300 p-4 rounded-lg shadow-md"
            >
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold">{cloth.name}</h2>
                <p className="text-sm text-gray-600">
                  Company: {cloth.company}
                </p>
                <p className="text-sm text-gray-600">
                  Type: {cloth.typeOfCloth}
                </p>
                <p className="text-sm text-gray-600">Size: {cloth.size}</p>
                <p className="text-sm text-gray-600">Color: {cloth.color}</p>
                <p className="text-sm text-gray-600">Gender: {cloth.gender}</p>
              </div>
              <div className="flex justify-center mt-4">
                <Link
                  to={`/cloth/details/${cloth._id}`}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  More Info
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Default;
