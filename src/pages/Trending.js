import React, { useState, useEffect } from "react";
import MovieContent from "../components/MovieContent/MovieContent";
import './styles/Trending.css'
import CustomPagination from '../components/Pagination/CustomPagination'

const Trending = () => {
  const [content, setContent] = useState([]);
  const [loading, setisLoading] = useState(true);
  const [error, setError] = useState(null);

    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    
  const fetchTrending = async () => {
    setisLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
      );

      if (!response.ok) {
        throw Error("Something went wrong");
      }

      const data = await response.json();

      console.log(data);

      setContent(data.results);
      setisLoading(false);
    } catch(error) {
      setError(error.message);
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <div>
      <span className="pageTitle">Trending</span>

      <div className="trending">
        {loading && error && <h1>{error}</h1>}
        {loading && !error ? (
          <h1>Loading...</h1>
        ) : (
          content.map((movie) => (
            <MovieContent 
                  key={movie.id} 
                  id={movie.id}
                  poster={movie.poster_path}
                  title={movie.title || movie.name}
                  date={movie.release_date || movie.first_air_date}
                  media_type={movie.media_type}
                  voteAverage={movie.vote_average}
                  />
          ))
        )}
          </div>
          <CustomPagination setContentPage={setCurrentPage} />
    </div>
  );
};

export default Trending;
