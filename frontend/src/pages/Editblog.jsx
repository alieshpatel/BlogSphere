import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from "axios"
import { useNavigate, useParams } from 'react-router'

const Editblog = () => {
    const {id} = useParams();
    
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    } = useForm();

    const navigate = useNavigate()

    //edit specific blog function
    const editBlog = async (data) => {
        //edited blog redirects to this route 
        const response = await axios.post("http://localhost:3000/blog/update",{
            id,
            ...data,
        });
        // console.log(response);
        navigate("/all");
    }
  return (
    <div>
        <form onSubmit={handleSubmit(editBlog)}>

        <input placeholder="enter title" {...register("title", { required: true })} />
        {errors.title && <span>This field is required</span>}

        <input placeholder="enter description"{...register("descripion", { required: true })} />
        {errors.descripion && <span>This field is required</span>}

        <input placeholder="enter img"{...register("img", { required: true })} />
        {errors.img && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  )
}

export default Editblog