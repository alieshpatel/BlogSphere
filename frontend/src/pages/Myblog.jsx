import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useCurrentUser } from "../../hooks/userHooks"
const Myblog = () => {

    const [allblogs, setallblogs] = useState()

    //clerk call from hooks folder
    const {email,fullName, isLoaded} = useCurrentUser()
   
    useEffect(() => {
        console.log(email,fullName)
    }, [email]) 


    //refreshing page automatically in UI
    useEffect(() => {
        if(!isLoaded) return 
        getallblogs()
    }, [email, isLoaded])
    
    //Get all blog function
    const getallblogs = async () => {
        // All blogs fetched from backend using API
        const response = await axios.post("http://localhost:3000/myblog", {email})
        // All blogs set in allblogs
        console.log(response);
        
        setallblogs(response.data.myblog);
    }

    // delete blog function
    const deleteBlog = async (id) => {
        // console.log(id)
        const response = await axios.get(`http://localhost:3000/blog/delete/${id}`)
        // console.log(response)
    }


  return (

    //maping of array to sequential way
    <div>{allblogs && allblogs.map((a,idx) => 
    <div key={idx}>
        <img src={a.img}/>
        <p>{a.title}</p>
        <p>{a.descripion}</p>
        <p>{a.email}</p>
        <a href={`/edit/${a._id}`}><button>edit</button></a>
        <button onClick={() => deleteBlog(a._id)}>Delete</button>
        <p>-------------------------------------</p>
    </div>
    )}</div>
  )
}

export default Myblog