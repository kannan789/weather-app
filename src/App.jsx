import { useState , useEffect} from 'react'
import './App.css'

function App() {

  const [weatherData, setWeatherData] = useState({});

  const [tempList,setTempList]=useState([[]]);


   useEffect(()=> {
    fetchWeatherData();
   },[])

   const fetchWeatherData = async () => {

          let response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m");
           
          let data = await response.json();

          console.log(data);

          setWeatherData(data);

          for(let i=0;i<24;i++)
          {
           setTempList[i][0]=weatherData?.hourly?.temperature_2m[i];
           setTempList[i][1]=weatherData?.hourly?.time[i];
          }
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

      <div> 
        
        <h1 style={{color:"#FFFFFF"}}>Hourly Temperature Today</h1> 
        {/* <div style={{color:"#FFFFFF", display:"flex",gap:"10px", flexWrap:"wrap"}}>{weatherData?.hourly?.temperature_2m.map((temp)=>
        
       {
        return <div style={{color:"#FFFFFF", display:"flex"}}>{temp}</div>
      
    
        }
        
        )}</div>

        <div style={{color:"#FFFFFF", display:"flex",gap:"10px", flexWrap:"wrap"}}>{weatherData?.hourly?.time.map((temp)=>
        
        {
         return <div style={{color:"#FFFFFF", display:"flex"}}>{temp.substr(11,16)}</div>}
        
         
         )}</div> */}

          <div style={{color:"#FFFFFF", display:"flex",gap:"10px", flexWrap:"wrap"}}>{tempList.map((temp)=>
        
       {
        return
        
        <div style={{color:"#FFFFFF",display:"flex",flexDirection:"column"}}>
        <div style={{color:"#FFFFFF"}}>{temp[0]}</div>
        <div style={{color:"#FFFFFF"}}>{temp[1]}</div>
        </div>
        
      
    
        }
        
        )}</div>
        
        
        </div>

     
    </>
  )
}

export default App
