"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import schoolImage from "../../public/a.gif";

const AddSchool = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsSuccess(false);
      const response = await fetch("http://localhost:3001/api/addSchool", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("School added successfully");
        setIsSuccess(true);
        reset();
      } else {
        console.error("Failed to add school");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 ">
      <div className="md:flex-shrink-0 md:mr-8 mb-4 md:mb-0">
        <Image src={schoolImage} width={400} height={400} alt="School Logo" />
      </div>

      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md mt-8 md:mt-0 border border-gray-300 md:ml-28">
        <h1 className="text-4xl font-serif font-extrabold mb-6 text-center text-gray-700">
          Add School
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Name:
            </label>
            <input
              className="form-input border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline w-full"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Address:
            </label>
            <input
              className="form-input border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline w-full"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              City:
            </label>
            <input
              className="form-input border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline w-full"
              {...register("city", { required: true })}
            />
            {errors.city && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              State:
            </label>
            <input
              className="form-input border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline w-full"
              {...register("state", { required: true })}
            />
            {errors.state && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Contact:
            </label>
            <input
              className="form-input border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline w-full"
              {...register("contact", {
                required: true,
                pattern: /^\d{10}$/,
              })}
            />
            {errors.contact && (
              <span className="text-red-500 text-xs">
                Please enter a 10-digit number
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Image URL:
            </label>
            <input
              className="form-input border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline w-full"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Email ID:
            </label>
            <input
              className="form-input border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline w-full"
              {...register("email_id", {
                required: true,
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              })}
            />
            {errors.email_id && (
              <span className="text-red-500 text-xs">
                Please enter a valid email address
              </span>
            )}
          </div>

          <div className="mt-6 p-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>

          {isSuccess && (
            <div className="text-green-500 font-bold text-center mt-4">
              Added Successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddSchool;
