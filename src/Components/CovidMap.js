import { Circle, Popup } from 'leaflet';
import React,{useState} from 'react'
import {MapContainer , TileLayer } from 'react-leaflet'
import { showDataOnMap } from '../Util';
import './CovidMap.css'
import numeral from 'numeral'

function CovidMap({countries,caseType,center,zoom=5}) {
    const [map,setmap]=useState(null);
    const [count,setCount]=useState(null);

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
    
    if(map)
    {
      map.flyTo(center);
     }
     if(count){
         count.flyTo(countries);
     }
     console.log(countries,caseType);
    return (
        <div className="map">
            <MapContainer center={center} whenCreated={setmap} zoom={zoom}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {showDataOnMap(countries,caseType)}
            </MapContainer>
            
        </div>
    );
}

export default CovidMap;
