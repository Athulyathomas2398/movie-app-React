import React from 'react';

function MovieList({movies,favoriteComponent,handleFavoriteClick}) {
    const FavoriteComponent=favoriteComponent
    return (
        <>
            {movies.map((item,index) => (
                <div className="image-container d-flex justify-content-start m-1" style={{width:"264px"}}>
                    <img className='poster' src={item.Poster} alt={item.Title || 'Movie Poster'} />
                    <div onClick={()=>handleFavoriteClick(item)} className="overlay d-flex align-items-center justify-content-center">
                        <FavoriteComponent/>
                    </div>
                </div>
            ))}
        </>
    );
}

export default MovieList;