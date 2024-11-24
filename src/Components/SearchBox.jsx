import React from 'react'

function SearchBox({searchValue,setSearchValue}) {
  return (
    <div className='col col-sm-4'>
        <input onChange={(e)=>setSearchValue(e.target.value)} className="form-control" placeholder='Type to search...' />
    </div>
  )
}

export default SearchBox