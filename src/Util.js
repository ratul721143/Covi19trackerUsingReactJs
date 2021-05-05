import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from "leaflet";

export const SortedData = (data)=>{
    const datas = [...data];
    return datas.sort((a,b)=>(a.cases > b.cases)? -1 : 1 );
};

const casesTypeColors = {
    cases:{
        hex:'#CC1034',
        multipler:800,
    },
    recovered:{
        hex:'#fb4443',
        multipler:1200,
    },
    deaths:{
        hex:'#fb4443',
        multipler:2000,
    }

};


export const showDataOnMap = (data, caseType = "cases") =>
data.map((country) => (
  <Circle
    center={[country.countryInfo.lat, country.countryInfo.long]}
    color={casesTypeColors[caseType].hex}
    fillColor={casesTypeColors[caseType].hex}
    fillOpacity={0.4}
    radius={
      Math.sqrt(country[caseType]) * casesTypeColors[caseType].multiplier
    }
  >
    <Popup>
      <div className="info-container">
        <div
          className="info-flag"
          style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
        ></div>
        <div className="info-name">{country.country}</div>
        <div className="info-confirmed">
          Cases: {numeral(country.cases).format("0,0")}
        </div>
        <div className="info-recovered">
          Recovered: {numeral(country.recovered).format("0,0")}
        </div>
        <div className="info-deaths">
          Deaths: {numeral(country.deaths).format("0,0")}
        </div>
      </div>
    </Popup>
  </Circle>
));
