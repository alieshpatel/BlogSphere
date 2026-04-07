import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { useCurrentUser } from "../../hooks/userHooks"
import Navbar from "../components/Navbar"

const SingleBlog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { email } = useCurrentUser()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getSingleBlog()
  }, [id])

  const getSingleBlog = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`https://blogsphere1434.vercel.app/blog/${id}`)
      setBlog(response.data.singleBlog)
      setError(null)
    } catch (err) {
      setError("Failed to load blog")
    } finally {
      setLoading(false)
    }
  }

  const isAuthor = blog && blog.email === email

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-white text-lg">Loading story...</p>
        </div>
      </div>
      </>
    )
  }

  if (error || !blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4"></div>
          <h1 className="text-3xl font-bold text-white mb-4">Story Not Found</h1>
          <p className="text-gray-400 mb-8 text-lg">{error || "This story could not be found"}</p>
          <button
            onClick={() => navigate("/all")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200"
          >
            Back to Stories
          </button>
        </div>
      </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/all")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Stories
        </button>

        {/* Main Article */}
        <article className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Featured Image */}
          <div className="w-full h-96 overflow-hidden bg-gray-200">
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full text-sm">
                Featured Story
              </span>
              <span className="text-gray-600">
                <span className="font-semibold text-gray-900">By</span> {blog.email}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Description */}
            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {blog.descripion}
              </p>
            </div>

            {/* Action Buttons */}
            {isAuthor && (
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                <button
                  onClick={() => navigate(`/edit/${blog._id}`)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Story
                </button>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this story?")) {
                      axios.get(`http://localhost:3000/blog/delete/${blog._id}`)
                      navigate("/my")
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Story
                </button>
              </div>
            )}

            {!isAuthor && (
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                <button
                  onClick={() => navigate("/all")}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Explore More Stories
                </button>
              </div>
            )}
          </div>
        </article>

        {/* Author Card */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
              {blog.email.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-wider">Author</p>
              <p className="text-xl font-bold text-gray-900">{blog.email}</p>
            </div>
          </div>
          <p className="text-gray-600">
            A passionate writer sharing stories and insights with readers around the world.
          </p>
        </div>

        {/* Related Stories CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to read more?</h2>
          <p className="text-gray-600 mb-6">Explore all amazing stories from our community</p>
          <button
            onClick={() => navigate("/all")}
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Explore All Stories
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default SingleBlog
