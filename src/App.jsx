import { useState , useEffect} from 'react'
import './App.css'

function App() {

  const [weatherData, setWeatherData] = useState({});


   useEffect(()=> {
    fetchWeatherData();
   },[])

   const fetchWeatherData = async () => {

          let response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m");
           
          let data = await response.json();

          console.log(data);

          setWeatherData(data);
   }
 

  return (
    <>

    <h1 style={{color:"lightpink"}}>Today's Weather</h1>
      
      <div style={{color:"#FFFFFF",marginTop:"100px",fontSize:"25px",marginLeft:"20px",textAlign:"left"}}>

        <h3>Latitude:{weatherData.latitude}</h3>

        <h3>Longitude:{weatherData.longitude}</h3>

        <h3>Current time: {weatherData?.current?.time}{weatherData?.timezone}</h3>

        <h3>Current temperature: {weatherData?.current?.temperature_2m}{weatherData?.current_units?.temperature_2m}</h3>


      </div>

     
    </>
  )
}

export default App
