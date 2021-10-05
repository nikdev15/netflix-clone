import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import './Row.css'

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original/";
    const base_url_video = "https://api.themoviedb.org/3/movie/";
    const API_KEY = "55599696e8b9e524f59aace597d7ea85";

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
        console.log(movies);
    }, [fetchUrl]);

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n-1) + '...' : string;
    }


    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map(
                    (movie) => 
                    
                        ((isLargeRow && movie.poster_path) ||
                        (!isLargeRow && movie.backdrop_path)) && (
                       <>
                       <div className="row_poster_container">
                          <img className={`row_poster ${isLargeRow && "row_posterLarge"}`} key={movie.id} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} /> 
                           <h3>{truncate(movie?.title || movie?.name || movie?.original_name, 15)}</h3>
                       </div>
                       </>
                    ) 
                    
  
                )}
            </div>
            {/*
            <div className="trailerPlayer">
                {movies.map((movie) => 
                    <ReactPlayer
                    key={movie.id}
                    url= {`${base_url_video}${movie.id}/videos?api_key=${API_KEY}&language=en-US`}
                    width="100%"
                    height="500px"
                    playing
                    playIcon={<button>Play</button>}
                    light={`${base_url}${movie.backdrop_path}`}
                    />  
                )}
            </div>
            */}

        </div>
    );
}

export default Row;
