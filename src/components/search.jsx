import React from 'react'

const Search = ({searchTerm,setsearchTerm}) => {
  return (
    <div className='search'>
      <div>
        <img src="./search.svg" alt="" className='searchImg' />
        <input 
        type="text" 
        name="search" 
        id="search" 
        placeholder='Search 1000+ Movies' 
        value={searchTerm} 
        onChange={(e) => setsearchTerm(e.target.value)} />
      </div>
    </div>
  )
}

export default Search