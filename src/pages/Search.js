import { createTheme } from '@material-ui/core';
import { Button, TextField, ThemeProvider } from '@mui/material';
import React, {useState, useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MovieContent from '../components/MovieContent/MovieContent';
import CustomPagination from '../components/Pagination/CustomPagination';

const Search = () => {

  const [type, setType] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)
  const [content, setContent] = useState([])
  const [totalPages, setTotalPages] = useState(1)
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


  const darkTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#ccc',
      }
    }
  })


  const fetchSearch = async () => { 
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=true`
      );

      if (!response.ok) {
        throw Error("Something Went Wront");
      }

      const data = await response.json();

      setContent(data.results);
      setTotalPages(data.total_pages);
      setIsLoading(false);

    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {

    window.scroll(0,0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div
          style={{
            display: "flex",
            margin: "10px auto",
          }}
        >
          <TextField
            style={{
              width: "100%",
            }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />

          <Button
            variant="contained"
            style={{
              marginLeft: "10px",
              backgroundColor: "#ccc",
              borderRadius: "3px",
            }}
            onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>

        <Tabs value={type} indicatorColor="primary" textColor="white">
          <Tab
            style={{ width: "50%" }}
            label="Search Movies"
            onClick={() => setType(0)}
          />
          <Tab
            style={{ width: "50%" }}
            label="Search TV Series"
            onClick={() => setType(1)}
          />
        </Tabs>
      </ThemeProvider>
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
              media_type={type ? "tv" : "movie"}
              voteAverage={movie.vote_average}
            />
          ))
        )}
      
      {searchText && !content && (
        type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2> 
      )}
      </div>
      
      {totalPages > 1 && (
        <CustomPagination setContentPage={setPage} numofPages={totalPages} />
      )}
      
    </div>
  );
}

export default Search
