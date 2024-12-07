import { useEffect, useState } from 'react'
import './App.css'
import MovieList from './Components/MovieList'
import MovieListHeading from './Components/MovieListHeading'
import SearchBox from './Components/SearchBox'
import AddFavorites from './Components/AddFavorites'
import RemoveFavorites from './Components/RemoveFavorites'
import axios from 'axios'



function App() {
  const [movies, setMovies] = useState([])
  console.log(movies);

  const[favorites,setFavorites]=useState([])
  console.log(favorites);
  
  const[searchValue,setSearchValue]=useState('')
  console.log(searchValue);
  
  const getMovieRequest = async (searchValue) => {
    try{
      const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=4aaa12`;
      const url1=`https://www.omdbapi.com/?apikey=fa1c9c03&t=${searchValue}`
      const response = await axios.get(url); // Using axios.get() instead of fetch()
      // console.log(response.data);

      if (response.data.Search) {
        setMovies(response.data.Search);
      }
     
    }
    catch(err){
      console.log(err);
      
    }
    
   

  }

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue])


  // const saveToLocalStorage=(items)=>{
  //   localStorage.setItem('p',JSON.stringify(items))
  // }  

  // useEffect(() => {
  //   const favMovie=JSON.parse(localStorage.getItem('p'))
  //   setFavorites(favMovie)
  // }, [favorites])
  
  
const addFavoriteMovie=(movie)=>{
  const newFavoriteList=[...favorites,movie]
  setFavorites(newFavoriteList)

  saveToLocalStorage(newFavoriteList)

}

const removeFavoriteMovie = (movie) => {
  const newFavoriteList = favorites.filter(
    (favorite) => favorite.imdbID !== movie.imdbID
  );
  setFavorites(newFavoriteList);
  saveToLocalStorage(newFavoriteList);
};


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
