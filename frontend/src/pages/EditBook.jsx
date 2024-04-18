// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect} from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response) => {
      setAuthor(response.data.author);
      setPublishedYear(response.data.publishedYear);
      setTitle(response.data.title);
      setLoading(false);
    })
    .catch((error)=>{
      setLoading(false);
      alert('An error happened, please check console');
      console.log(error);
    });
  }, [id])
  const handleEditBook = () => {
    const data = {
      title,
      author, 
      publishedYear,
    };
    setLoading(true);
    axios.put(`http://localhost:5555/books/${id}`, data)
    .then(() => {
      setLoading(false);
      navigate('/');
    })
    .catch((error) => {
      setLoading(false)
      alert('An error has happened. Check console')
      console.log(error);
    })
  }
  return <div className="p-4">
    <BackButton/>
    <h1 className="text-3xl my-4">Edit Book</h1>
    {loading ? <Spinner/>: ''}
    <div className="flex flex-col border-2 border-sky-700 rounded-xl w-[600px] p-4 mx-auto">
      <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="border-2 border-gray-500 px-4 py-2 w-full"
        />
        <label className="text-xl mr-4 text-gray-500">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e)=>setAuthor(e.target.value)}
          className="border-2 border-gray-500 px-4 py-2 w-full"
        />
        <label className="text-xl mr-4 text-gray-500">Published Year</label>
        <input
          type="text"
          value={publishedYear}
          onChange={(e)=>setPublishedYear(e.target.value)}
          className="border-2 border-gray-500 px-4 py-2 w-full"
        />
      </div>
      <button className="p-2 bg-sky-200 m-8 rounded-md" onClick={handleEditBook}>Save</button>
    </div>
  </div>;
};

export default EditBook;
