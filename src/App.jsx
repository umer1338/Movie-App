import React, { useState, useEffect } from 'react'
import Search from './components/search';
import Spinner from './components/spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateCount } from './appwrite';

//API-Application Programming Interface
const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  }
}

const App = () => {

  const [searchTerm, setsearchTerm] = useState("");
  const [errMessage, seterrMessage] = useState("")
  const [moviesList, setmoviesList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [tendingMovies, settendingMovies] = useState([])
  //Debounce to Prevent More Than One API Call....No too many requests
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState('');

  useDebounce(()=> setdebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query='') => {

      setisLoading(true),
      seterrMessage("");

    try {
      const endPoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endPoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to Fetch Data of API");
      } else {
        const data = await response.json();

        if (data.response == 'False') {
          seterrMessage("No Movies Found");
          setmoviesList([]);
          return;
        }

        setmoviesList(data.results || []);
        if(query && data.results.length>0){
          await updateCount(query,data.results[0])
        }
      }

    } catch (err) {
      console.error(err + " Fetching Data Error");
      seterrMessage("Error Fetching Movies, Please Try Again");
    } finally {
      setisLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try{
      const movies = await getTrendingMovies()
      settendingMovies(movies)

    }catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm])

  useEffect(() => {
    loadTrendingMovies()
  }, [])
  



  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img src='/hero-img.png' alt='hero banner' />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle</h1>

          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
        </header>

        {tendingMovies.length>0 && (
          <section className='trending'>
            <h2 className='trending-title'>Trending Movies</h2>

            <ul>
              {tendingMovies.map((movie,index)=>(
                <li key={movie.$id}>
                  <p>{index+1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2 className=''>All Movies</h2>

          {isLoading ? (
            <Spinner className='text-white' />
          ) : errMessage ? (
            <p className='text-red'>{errMessage}</p>
          ) : (
            <ul>
              {moviesList.map((singleMovie) => (
                <MovieCard className='text-white' key={singleMovie.id} singleMovie={singleMovie} />
              ))}
            </ul>
          )}


        </section>
      </div>

    </main>

  )
}


export default App;