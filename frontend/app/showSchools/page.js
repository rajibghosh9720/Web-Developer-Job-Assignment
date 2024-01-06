"use client";
import React, { useEffect, useState } from "react";

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/getSchools");

        if (response.ok) {
          const data = await response.json();
          setSchools(data);
        } else {
          throw new Error("Failed to fetch schools");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch schools. Please try again.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 my-8">
      <h1 className="text-gray-700 text-3xl font-bold mb-6">List of Schools</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {schools.map((school) => (
            <div
              key={school.id}
              className="bg-opacity-70 backdrop-filter backdrop-blur-lg bg-white p-6 rounded-3xl shadow-xl border border-gray-300 transition-transform transform hover:scale-105 lg:p-8"
            >
              <img
                className="w-full h-50 object-cover mb-4 rounded-md transition-transform transform hover:scale-105"
                src={school.image}
                alt={school.name}
              />
              <hr className="w-1/3  mb-4 border-2 border-blue-400" />
              <h2 className="text-xl font-semibold mb-2">{school.name}</h2>
              <p className="text-gray-700">Address: {school.address}</p>
              <p className="text-gray-700">City: {school.city}</p>
              <p className="text-gray-700">State: {school.state}</p>
              <p className="text-gray-700">Contact: {school.contact}</p>
              <p className="text-gray-700">Email ID: {school.email_id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowSchools;

