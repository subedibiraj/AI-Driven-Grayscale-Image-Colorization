import React from 'react'
import loading from './loading.gif'

export default function Loader() {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{height: '100vh'}}>
    <img className='my-3' src={loading} alt="loading.."/>
    <p>Processing...</p>
  </div>
  )
}
