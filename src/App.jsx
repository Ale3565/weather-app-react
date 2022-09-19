import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ClimateCard from './components/ClimateCard'

function App() {

  const [response, setResponse] = useState()

  useEffect(() => {
    const success = pos => {
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setResponse(latlon)
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  const [data, setData] = useState()

  console.log(response)

  useEffect(() => {
    const APIKey = "ef7182d29eda4f51bc8aa3bfbfb7efc9"
    const URL = `https://api.weatherbit.io/v2.0/current?lat=${response?.lat}&lon=${response?.lon}&key=${APIKey}&include=minutely`
    axios.get(URL)
      .then(res => setData(res.data))
      .catch(err => console.log(err.message))
  }, [])

  
  return (
    <div className="App">
      <ClimateCard
        data={data}
        key={data?.data[0].lat}
      />
    </div>
  )
}

export default App
