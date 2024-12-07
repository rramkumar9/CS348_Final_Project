import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Back from "../components/Back";
import { useLocation } from "react-router-dom";

const ShowClothes = () => {
  const { id } = useParams();
  const [cloth, setCloth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  console.log(location);
  console.log(id);

  useEffect(() => {
    const fetchClothDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:57111/cloth/${id}`);
        setCloth(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch cloth details");
        setLoading(false);
      }
    };

    fetchClothDetails();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;
  if (!cloth) return <div>No cloth found</div>;

  return (
    <div className="p-4">
      <Back destination="/" />
      <h1 className="text-2xl font-bold mt-4">Cloth Details</h1>
      <div className="mt-2">
        <p>
          <strong>Name:</strong> {cloth.name}
        </p>
        <p>
          <strong>Type:</strong> {cloth.typeOfCloth}
        </p>
        <p>
          <strong>Size:</strong> {cloth.size}
        </p>
        <p>
          <strong>Color:</strong> {cloth.color}
        </p>
        <p>
          <strong>Company:</strong> {cloth.company}
        </p>
        <p>
          <strong>Gender:</strong> {cloth.gender}
        </p>
        <p>
          <strong>Description:</strong> {cloth.des}
        </p>

        <div className="mt-4">
          <Link
            to={`/cloth/edit/${id}`}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-4"
          >
            Edit
          </Link>
          <Link
            to={`/cloth/delete/${id}`}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowClothes;
