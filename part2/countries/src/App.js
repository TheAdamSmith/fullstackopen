import React, { useState, useEffect} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY 

const CountryForm = ({filter,  onChange})  => {
 
  return (
      <form>
          <div>
            find countries:<input
                                value={filter}
                                onChange={onChange}/>
          </div>
      </form>
    )
 }

const Countries = (props) => {
  const {countries, filter, country2Show, handleButton, changeWeather, weather} = props
  const filtCountries = countries.filter(country => 
    country.name.toLowerCase().includes(filter.toLowerCase()))
  
  if(country2Show){
    
    return <CountryInfo country={country2Show} changeWeather={changeWeather} weather={weather}/>
  }
  

  return (
    
    filtCountries.length > 10 ?
    <p> Too many matches, specify another filter </p>
    :(filtCountries.length >1 ?
      <div>
        <ul>
        {filtCountries.map((country, index)=> 
              <li key={country.name}> 
                {country.name}
                <button key={country.name} onClick={() => handleButton(country={country})}>show</button>
              </li>)
        } 
        </ul>
      </div>
      : <CountryInfo country={filtCountries[0]} changeWeather={changeWeather} weather={weather}/>
    )
  
  )
}


const CountryInfo = ({country, changeWeather, weather}) => {
   
  if(country){
    axios
    .get('http://api.openweathermap.org/data/2.5/weather?q='+country.capital+'&appid='+api_key)
      .then(response => {
        
        changeWeather(response.data)
      }
      )
   }
  
   
   return(
    country && weather ?
    
    <div>
      <h1> {country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population} </p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(lang => 
          <li key={lang.name}> {lang.name} </li> )}
      </ul>
      <img src={country.flag} alt="flag" height="100" width="150"/>
      
      <h2>Weather in {country.capital}</h2>
      <p>{weather.weather[0].description}</p>
      <p>Temperature: {Math.round(weather.main.temp-270).toFixed(2)} </p>
      <p>Wind: {weather.wind.speed}</p>
    </div>
    
    : <div></div>
  )
}

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ filter, setnewFilter] = useState('')
  const [country2Show, setCountry2show] = useState(null)  
  const [weather, setWeather] = useState(null)
  
  useEffect(() => {
    axios
      .get('http://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      }
      )
  }, [])


  const handleFilterChange = (event) => { 
    event.preventDefault()
    setnewFilter(event.target.value)
    setCountry2show(null)
  }

  const handleButton = ({country})=>{
    
    setCountry2show(country)
    
  }

  const changeWeather = (weather) => {
    setWeather(weather)
    
  }

      
  return (
    <div>
      <CountryForm filter={filter} onChange={handleFilterChange}/> 
      <Countries countries={countries} filter={filter} country2Show={country2Show} 
        handleButton={handleButton} changeWeather={changeWeather} weather={weather}/>
    </div>
    )
}

export default App
