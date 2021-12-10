import { Chip } from '@mui/material'
import React, { useEffect } from 'react'

const Genres = (
    {
        genres,
        selectedGenre,
        setSelectedGenre,
        type,
        setGenres,
        setPage
    }
) => {

    const handleAdd = (genre) => {
        setSelectedGenre([...selectedGenre, genre])
        setGenres(genres.filter(g => g.id !== genre.id))
        setPage(1)
        // Adding selected genre to the genres array
    }

    const handleRemove = (genre) => {
        setSelectedGenre(selectedGenre.filter(g => g.id !== genre.id))
        setGenres([...genres, genre])
        setPage(1)
        // Removing selected genre from the genres array
    }
    const fetchGenres = async () => {

        const response = await fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=7f9cf0a5145044472a50f5d1a0a80210&language=en-US`)

        const data = await response.json()

        setGenres(data.genres)

    }

    console.log(genres);

    useEffect(() => {
      fetchGenres();
      // eslint-disable-next-line
      return () => {
        setGenres([]);
      };
    },[])

    return (
      <div
        style={{
          padding: "5px 0 10px",
        }}
      >
        {selectedGenre &&
          selectedGenre.map((genre) => (
            <Chip
              label={genre.name}
              style={{
                margin: "2px",
                color: "white",
                backgroundColor: "rgba(255,255,255, 0.2)",
              }}
              size="small"
              variant="outlined"
              key={genre.id}
                  clickable
                  onDelete={() => handleRemove(genre)}
            />
          ))}

        {genres &&
          genres.map((genre) => (
            <Chip
              label={genre.name}
              style={{
                margin: "2px",
                color: "white",
                backgroundColor: "rgba(0, 19, 26, 0.2)",
              }}
              size="small"
              variant="outlined"
              key={genre.id}
                  clickable
                  onClick={() => handleAdd(genre)}
            />
          ))}
      </div>
    );
}

export default Genres
