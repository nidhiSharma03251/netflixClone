import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ apiData, setApiData ] = useState({
    name: "",
    key: "",
    published_at:"",
    typeof: ""
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTEyZDk1NGYyMmUwODIxODQyZTYzZGZiOTVlZTkyMiIsIm5iZiI6MTc1NjQwNzI3MS42MjQsInN1YiI6IjY4YjBhNWU3NDE1YzY2YjU4OTVlZDhjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t8N3I9zC5sAUjHGoOkQ8NS0gr8KBfNzui5JGCC4Pxv8'
  }
};

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res =>  setApiData(res.results[0]))
  .catch(err => console.error(err));
},[])


  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-1)}} />
      {apiData?.key ? (
    <iframe
      width="90%"
      height="90%"
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title="trailer"
      style={{ border: 0 }}
      allowFullScreen
    ></iframe>
  ) : (
    <p>Loading trailer...</p>
  )}
      <div className='player-info'>
        <p>{apiData?.published_at ? apiData.published_at.slice(0, 10) : "N/A"}</p>
        <p>{apiData?.name || "No name found"}</p>
        <p>{apiData?.type || "Unknown type"}</p>
      </div>
    </div>
  )
}

export default Player