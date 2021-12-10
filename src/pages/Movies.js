import React, {useState, useEffect} from 'react'
import MovieContent from '../components/MovieContent/MovieContent'
import './styles/Trending.css'
import CustomPagination from '../components/Pagination/CustomPagination'
import Genres from '../components/Genres/Genres'
import useGenre from '../hooks/useGenre'

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState();
  const [selectedGenre, setSelectedGenre] = useState([])
  const [genres, setGenres] = useState([])

  const genreforURL = useGenre(selectedGenre)
  const fetchMovies = async () => {

    setIsLoading(true)
    setError(null)

    try {

      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreforURL}`
      );

      if (!response.ok) {
        throw Error("Something Went Wront")
      
      }

      const data = await response.json()

      setMovies(data.results)
      setTotalPages(data.total_pages)
      setIsLoading(false)

    } catch (error) {
      setError(error.message)
      setIsLoading(false)
    }

  }

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page, genreforURL])

    return (
      <div>
        <span className="pageTitle">Movies</span>

        <Genres
          type="movie"
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />

        <div className="trending">
          {loading && error && <h1>{error}</h1>}
          {loading && !error ? (
            <h1>Loading...</h1>
          ) : (
            movies.map((movie) => (
              <MovieContent
                key={movie.id}
                id={movie.id}
                poster={movie.poster_path}
                title={movie.title || movie.name}
                date={movie.release_date || movie.first_air_date}
                media_type= "movie"
                voteAverage={movie.vote_average}
              />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <CustomPagination setContentPage={setPage}
            numofPages={totalPages}
          />
        )}
      </div>
    );
}

export default Movies
