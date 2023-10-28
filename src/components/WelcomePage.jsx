import Button from 'react-bootstrap/Button';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import gif from '../assets/giphy(2).gif'
function WelcomePage() {
    const navigate = useNavigate()
     const handleOnClick = () => {
        navigate('/main-page')
     }
  return (
    <div className='d-flex , flex-column justify-content-center w-50 align-items-center m-auto mt-5'>
        <p className='fw-bold '>Welcome to my products listing project</p>
        <Button onClick={handleOnClick} variant="secondary">Go to listing</Button>
        <img src={gif} alt='giphy' width={250}/>
        
    </div>
  )
}

export default WelcomePage