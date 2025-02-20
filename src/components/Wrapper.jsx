import React from 'react'

function wrapper({children}) {
  return (
    <div className='wrapper'>{children}</div>
  )
}

export default wrapper;