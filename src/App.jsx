import { useState , useEffect} from 'react'
import './App.css'

function App() {

  const [weatherData, setWeatherData] = useState({});

  const [tempList,setTempList]=useState([[]]);


   useEffect(()=> {
    fetchWeatherData();
   },[]);

   useEffect(() => {
    if (weatherData?.hourly) {
      setWeatherInfo();
    }
  }, [weatherData]); 

   const fetchWeatherData = async () => {

          let response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m");
           
          let data = await response.json();

          console.log(data);

          setWeatherData(data);
         
   }

   const setWeatherInfo = () =>
   {
   let tempArr=[];
   for(let i=0;i<24;i++)
   {
    tempArr.push([
      weatherData?.hourly?.temperature_2m[i],
      weatherData?.hourly?.time[i]
    ]);
   }
   setTempList(tempArr);

  console.log(tempList)

   
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
        
      //  {
      //   return <div style={{color:"#FFFFFF", display:"flex"}}>{temp}</div>
      //   }
        
      //   )}</div>

      //   <div style={{color:"#FFFFFF", display:"flex",gap:"10px", flexWrap:"wrap"}}>{weatherData?.hourly?.time.map((temp)=>
        
      //   {
      //    return <div style={{color:"#FFFFFF", display:"flex"}}>{temp.substr(11,16)}</div>
      //   }
      //    )}</div> */}

          <div style={{color:"#FFFFFF", display:"flex",gap:"10px", flexWrap:"wrap"}}>
            {tempList.map(([temp,times],index) =>
        (
        
        <div key={index} style={{color:"#FFFFFF",display:"flex",flexDirection:"column"}}>
        <div><img src="./assets/istockphoto-824800468-1024x1024.jpg" width="100" height="100"/></div>
        <div style={{color:"#FFFFFF"}}>{temp}{weatherData?.current_units?.temperature_2m}</div>
        <div style={{color:"#FFFFFF"}}>{times?.substring(11,16)}</div>
        </div>
            )
    

        
        )}</div>
        
        
        </div>

     
    </>
  )
}

export default App
