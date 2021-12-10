const useGenre = (selectedGenre) => {
    if(selectedGenre < 1){
        return ''
    }

    const GenreId = selectedGenre.map(genre => genre.id)

    return GenreId.reduce((acc, curr) => {
        return acc + ',' + curr
        // returning genreId like this: 1,2,3,4,5
    })
}

export default useGenre;

