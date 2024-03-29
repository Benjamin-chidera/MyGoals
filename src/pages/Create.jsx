import React, { useEffect, useState } from "react";
import step from "../assets/amico.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const url = "https://goal-api-g1vz.onrender.com/api/goals" 
  const redirect = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [create, setCreate] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault()
    setCreate(true)
    if (!title || !description) {
      toast.error("Please fill all fields")
      setCreate(false)
      return
    }


    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title, description})
      })
      const data = await res.json()

      if (data.message) {
        toast.success("Goal successfully created")
        setCreate(false)
        redirect("/all")
      }else{
        toast.error("Goal title already exist, create another")
        setCreate(false)
      }
    } catch (error) {
      console.log(error);
    }

    setTitle("")
    setDescription("")
  }



  return (
    <div className="container d-flex justify-content-between align-items-center mt-3 pb-3 gap-lg-2">
      <div className="main-form py-5 px-1 ps-lg-2 ps-xl-3 pe-xl-3 rounded-2">
        <ToastContainer />
        <form className="create-form"  onSubmit={handleSubmit}>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Goal Title"
              className="bg-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Goal Description"
              className="bg-transparent"
            ></textarea>
          </div>
          <div className="mt-2">
            <button className="blue-bg p-2">
              {create ? "Creating Goal..." : "Create Goal"}
            </button>
          </div>
        </form>
      </div>
      <div className="d-none d-lg-block main-img">
        <img src={step} alt="image of a step" />
      </div>
    </div>
  );
};

export default Create;
