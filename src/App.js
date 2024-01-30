import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import icon from "./Assets/icon.jpg"


const App = () => {
  const apiKey = "b2b3af84a0fbb7f0d27129c97e06c184"
  const [data, setData] = useState({})
  const [city, setCity] = useState("")

  const getWeatherDetails = (cityname) => {
    if (!cityname) return;
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("err", err)
    })
  }

  useEffect(() => {
    getWeatherDetails("Delhi")
  }, [])

  const changeInputHandle = (e) => {
    setCity(e.target.value)
    console.log(e.target.value)
  }

  const handleSearch = () => {
    getWeatherDetails(city)
  }

  return (
    <>
      <div className='col-md-12'>
        <div className='weatherBg'>
          <h1 className='heading'>Weather App </h1>
          <div className='d-grid gap-3 col-4 mt-4'>
            <input type='text' className='form-control' onChange={changeInputHandle} value={city} />
            <button className='btn btn-primary' type='button' onClick={handleSearch}>Search</button>
          </div>
        </div>
        <div className='col-md-12 text-center mt-5'>
          <div className='shadow rounded weatherResultBox'>
            <img className='icon' src={icon} alt='icon' />
            <h5 className='weatherCity'>{data?.name}</h5>
            <h6 className='weatherTempreature'>{((data?.main?.temp) - 274.15).toFixed(2)}°C</h6>
          </div>
        </div>
      </div>
    </>
  )
}

export default App