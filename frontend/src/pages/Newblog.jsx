import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios"
import { useNavigate } from "react-router";
import { useCurrentUser } from "../../hooks/userHooks";

// navigation 
const Newblog = () => {
    const navigate = useNavigate()
    // react hook form from documentation
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {email} = useCurrentUser()

  //send data to backend
  const Createblog = async (data) => {
    // console.log(data);
    const response = await axios.post("http://localhost:3000/newblog",{
      ...data,email
    })
    // console.log(response);
    navigate("/all")
    
  }
  return (
    <div>
      <form onSubmit={handleSubmit(Createblog)}>

        <input placeholder="enter title" {...register("title", { required: true })} />
        {errors.title && <span>This field is required</span>}

        <input placeholder="enter description"{...register("descripion", { required: true })} />
        {errors.descripion && <span>This field is required</span>}

        <input placeholder="enter img"{...register("img", { required: true })} />
        {errors.img && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default Newblog;