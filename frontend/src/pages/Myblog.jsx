import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useCurrentUser } from "../../hooks/userHooks";
import Navbar from "../components/Navbar";

const Myblog = () => {
  const [allblogs, setallblogs] = useState();
  const navigate = useNavigate();
  const { email, isLoaded } = useCurrentUser();

  useEffect(() => {
    if (!isLoaded) return;
    getallblogs();
  }, [email, isLoaded]);

  const getallblogs = async () => {
    const response = await axios.post("https://blogsphere1434.vercel.app/myblog", {
      email,
    });
    setallblogs(response.data.myblog);
  };

  const deleteBlog = async (id) => {
    await axios.get(`http://localhost:3000/blog/delete/${id}`);
    setallblogs(allblogs.filter(blog => blog._id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            My Stories
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Manage and edit your published content
          </p>
          <button
            onClick={() => navigate("/new")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            + Create New Story
          </button>
        </div>

        {/* Blogs List */}
        {allblogs && allblogs.length > 0 ? (
          <div className="space-y-6">
            {allblogs.map((a, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden bg-gray-200">
                    <img
                      src={a.img}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {a.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-2 mb-4">
                        {a.descripion}
                      </p>
                      <p className="text-sm text-gray-500">
                        By: <span className="font-semibold">{a.email}</span>
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                      <button
                        onClick={() => navigate(`/edit/${a._id}`)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBlog(a._id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border-2 border-dashed border-gray-300">
            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Stories Yet</h3>
            <p className="text-gray-600 mb-6">Create your first blog post to get started</p>
            <button
              onClick={() => navigate("/new")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Create Story
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Myblog;
