import { Avatar, Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import React,{useState , useEffect } from 'react'
import './App.css';
import CovidMap from './Components/CovidMap';
import InfoBox from './Components/InfoBox';
import LineGraph from './Components/LineGraph';
import TableData from './Components/TableData';
import { SortedData } from './Util';
import "../node_modules/leaflet/dist/leaflet.css"

//make api call > https://disease.sh/v3/covid-19/countries  
//we will use useEffect() hooks 
//useEffect = runs a piece of code based on a given condition



function App() {

  const initaialmap=[
    {
      "updated": 1615648677129,
      "country": "Afghanistan",
      "countryInfo": {
        "_id": 4,
        "iso2": "AF",
        "iso3": "AFG",
        "lat": 33,
        "long": 65,
        "flag": "https://disease.sh/assets/img/flags/af.png"
      },
      "cases": 55985,
      "todayCases": 28,
      "deaths": 2457,
      "todayDeaths": 0,
      "recovered": 49471,
      "todayRecovered": 0,
      "active": 4057,
      "critical": 1091,
      "casesPerOneMillion": 1416,
      "deathsPerOneMillion": 62,
      "tests": 319049,
      "testsPerOneMillion": 8070,
      "population": 39532913,
      "continent": "Asia",
      "oneCasePerPeople": 706,
      "oneDeathPerPeople": 16090,
      "oneTestPerPeople": 124,
      "activePerOneMillion": 102.62,
      "recoveredPerOneMillion": 1251.39,
      "criticalPerOneMillion": 27.6
    }];
 
  const [countries,setCountries]=useState([]);
  const [country,setCountry] = useState('Worldwide');
  const [countryInfo,setCountryInfo]=useState({});
  const [tableInfo,setTableInfo]=useState([]);
  const [mapcenter,setMapcenter]=useState({lat:34.80746,lng: -40.4796});
  const [mapzoom,setMapzoom]=useState(3);
  const [mapCountries,setMapCountries]=useState(initaialmap);
  const [caseType, setCaseType] = useState("cases");

  useEffect(()=>{
      fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data=>{
        setCountryInfo(data);
        
      });
  },[]);


  useEffect(() => {
    //async -> send a requent, wait for it and do something with that data
    const getCountriesData =async() => {
        await fetch("https://disease.sh/v3/covid-19/countries")
            .then(response => response.json()) //return the json format of the response
            .then(data =>{
              const countries = data.map(country =>(
                {
                  name:country.country,
                  countryCode:country.countryInfo.iso2,
                  countryFlagImg:country.countryInfo.flag,
                 
                }
              ));
              console.log(countries);
              setMapCountries(data);
              setTableInfo(SortedData(data));
              setCountries(countries);
              
            
            });
        
        };

    getCountriesData(); // call it 

  },[] ); // in the [] their will be condition like if [countries] now 
            //the useEffect will be called on app loading as well as
            //the countries get updated


  const dropdownCountryChange= async (event) =>{
    const countryCode=event.target.value;
    setCountry(countryCode);

    //https://disease.sh/v3/covid-19/all > for getting total covid cases
    //https://disease.sh/v3/covid-19/countries/[countyCode] > for getting the spcesific country cases

    const url = countryCode === 'Worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data=>{
      setCountry(countryCode);
      setCountryInfo(data);
      setMapcenter({lat:data.countryInfo.lat,lng:data.countryInfo.long});
      setMapzoom(4);
    });
  }

  return (
    <div className="app">
      <div className="app__left">
          {/* header things */}
          {/* title + dropdown list of countries */}
          <div className="app__header">
        
              <h1 className="app__header__h1">COVID-19 TRACKER</h1>
              <FormControl className="app__dropdown">
                <Select variant="outlined" value={country} onChange={dropdownCountryChange}>
                <MenuItem value="Worldwide">Worldwide</MenuItem>
                  {
                    countries.map((country,index)=><MenuItem key={index} value={country.countryCode}><img className="dropdown__flag" src={country.countryFlagImg} alt="error"/> {country.name}</MenuItem>)
                  }
                  
                </Select>
              </FormControl>
          </div>
          
          <div className="app__infos">
              {/*  covid case infos */}
              <InfoBox  
                onClick={(e)=>setCaseType("cases")} 
                title="Cases" 
                newCases={countryInfo.todayCases} 
                totalCases={countryInfo.cases}
                caseType='cases'
              />
              <InfoBox  
                onClick={(e)=>setCaseType("recovered")} 
                title="Recovery" 
                newCases={countryInfo.todayRecovered} 
                totalCases={countryInfo.recovered}
                caseType='recovered'
              />
              <InfoBox  
                onClick={(e)=>setCaseType("deaths")} 
                title="Deaths" 
                newCases={countryInfo.todayDeaths} 
                totalCases={countryInfo.deaths}
                caseType='deaths'
              />
          </div>
          {/* map */}
          {/* for map we are using the react-leaflet with npm package */}
          {
            mapCountries &&
              <CovidMap 
                countries={mapCountries} 
                caseType='cases' 
                center={mapcenter} 
                zoom={mapzoom}
              />
          }

      </div>
      
      <Card className="app__right">
          <CardContent>
            <h3>Covid cases table</h3>
                  {/* table */}
                <TableData tableData={tableInfo}/>
            
                   {/* graph */}
                <LineGraph caseType={caseType}/>
          </CardContent>
      </Card>
      

    </div>
  );
}

export default App;
