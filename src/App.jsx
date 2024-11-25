import { useEffect, useState } from 'react'
import './App.css'
import MovieList from './Components/MovieList'
import MovieListHeading from './Components/MovieListHeading'
import SearchBox from './Components/SearchBox'
import AddFavorites from './Components/AddFavorites'
import RemoveFavorites from './Components/RemoveFavorites'


function App() {
  const [movies, setMovies] = useState([])
  console.log(movies);

  const[favorites,setFavorites]=useState([])
  console.log(favorites);
  
  const[searchValue,setSearchValue]=useState('')
  console.log(searchValue);
  
  const getMovieRequest = async (searchValue) => {
    try{
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=4aaa12`
    const response = await fetch(url)
    const responsJson = await response.json()
    // console.log(responsJson);
    if(responsJson.Search){
      setMovies(responsJson.Search)
    }
    }
    catch(err){
      console.log(err);
      
    }
    
   

  }

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue])


  const saveToLocalStorage=(items)=>{
    localStorage.setItem('p',JSON.stringify(items))
  }  

  // useEffect(() => {
  //   const favMovie=JSON.parse(localStorage.getItem('p'))
  //   setFavorites(favMovie)
  // }, [])
  
  
const addFavoriteMovie=(movie)=>{
  const newFavoriteList=[...favorites,movie]
  setFavorites(newFavoriteList)

  // saveToLocalStorage(newFavoriteList)

}

const removeFavoriteMovie=(movie)=>{
  const newFavoriteList=favorites.filter((favorite)=>favorite.imdbID!==movie.imdbID)
  setFavorites(newFavoriteList)
  // saveToLocalStorage(newFavoriteList)
}


  return (

    <div className="container-fluid movie-app">

      <div className="row d-flex align-items-center mt-4 mb-4 ">
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>

      <div className="row">
        <MovieList movies={movies} handleFavoriteClick={addFavoriteMovie} favoriteComponent={AddFavorites}/>
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4 ">
        <MovieListHeading heading='Favorites' /> 
      </div>

      <div className="row">
        <MovieList movies={favorites} handleFavoriteClick={removeFavoriteMovie} favoriteComponent={RemoveFavorites}/>
      </div>



    </div>

  )
}

export default App
