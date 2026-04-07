import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useCurrentUser } from "../../hooks/userHooks"
import Navbar from "../components/Navbar"
import { useUser } from "@clerk/clerk-react"

const Allblogs = () => {

    const [allblogs, setallblogs] = useState()
    const navigate = useNavigate()
    const { user } = useUser()

    //clerk call from hooks folder
    const {email,fullName} = useCurrentUser()
   
    useEffect(() => {
        // User data loaded
    }, [email]) 


    //refreshing page automatically in UI
    useEffect(() => {
        getallblogs()
    }, [allblogs])
    
    //Get all blog function
    const getallblogs = async () => {
        // All blogs fetched from backend using API
        const response = await axios.get("https://blogsphere1434.vercel.app/allblog")
        // All blogs set in allblogs
        setallblogs(response.data.allBlog);
    }

    // delete blog function
    const deleteBlog = async (id) => {
        // console.log(id)
        const response = await axios.get(`http://localhost:3000/blog/delete/${id}`)
        // console.log(response)
    }


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Latest Stories
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        </div>

        {/* Blog Grid */}
        {allblogs && allblogs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {allblogs.map((a, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/blog/${a._id}`)}
                className="group flex flex-col overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <img
                    src={a.img}
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-8">
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
                    Featured
                  </span>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {a.title}
                  </h2>
                  
                  <p className="text-gray-600 text-base leading-relaxed line-clamp-3 flex-grow mb-6">
                    {a.descripion}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <span className="text-sm text-gray-500 font-medium">By Author</span>
                    <svg className="w-5 h-5 text-blue-600 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.996 10-10.747S17.5 6.253 12 6.253z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Stories Yet</h3>
              <p className="text-gray-500 text-lg">Start exploring by creating your first blog post</p>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default Allblogs