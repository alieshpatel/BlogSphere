import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from "axios"
import { useNavigate, useParams } from 'react-router'
import Navbar from "../components/Navbar";

const Editblog = () => {
    const {id} = useParams();
    
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();

    const navigate = useNavigate()

    const editBlog = async (data) => {
        const response = await axios.post("https://blogsphere1434.vercel.app/update",{
            id,
            ...data,
        });
        navigate("/all");
    }

    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Edit Your Story
            </h1>
            <p className="text-purple-200 text-lg">
              Update your blog post
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            <form onSubmit={handleSubmit(editBlog)} className="space-y-6">
              
              {/* Title Input */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Blog Title
                </label>
                <input
                  placeholder="Enter blog title..."
                  {...register("title", { required: "Title is required" })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all"
                />
                {errors.title && (
                  <span className="text-red-400 text-sm mt-1 block">{errors.title.message}</span>
                )}
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Description
                </label>
                <textarea
                  placeholder="Update your story description..."
                  {...register("descripion", { required: "Description is required" })}
                  rows="6"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all resize-none"
                />
                {errors.descripion && (
                  <span className="text-red-400 text-sm mt-1 block">{errors.descripion.message}</span>
                )}
              </div>

              {/* Image URL Input */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Image URL
                </label>
                <input
                  placeholder="Update image URL..."
                  {...register("img", { required: "Image URL is required" })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all"
                />
                {errors.img && (
                  <span className="text-red-400 text-sm mt-1 block">{errors.img.message}</span>
                )}
              </div>

              {/* Button Group */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/all")}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 border border-white/20"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>
    )
}

export default Editblog