import React from 'react'

const MovieCard = ({ singleMovie: { title, vote_average, poster_path, overview, release_date, original_language } }) => {
    return (
        <div className="movie-card">
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : './No-Poster.png'} alt={title} />

            <div className='mt-[20px]'>
                <h3>{title}</h3>

                <div className='content'>
                    <div className='rating'>
                        <img src="./star.svg" alt="star icon" width={50}/>
                        <p>{vote_average ? vote_average : "N/A"}</p>
                    </div>
                    
                    <span>•</span>
                    <p className='lang'>{original_language}</p>

                    <span>•</span>
                    <p className='year'>{release_date}</p>
                </div>
            </div>
        </div>

    )
}

export default MovieCard