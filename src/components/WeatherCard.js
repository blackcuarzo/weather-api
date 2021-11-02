import React, { useEffect, useState } from 'react';
import weatherDataExample from '../weather-response-example2.json';
import './WeatherCard.css'
/*
import leanTech from '../icons/leanTech.svg'
          <div>
            <img src={leanTech} className="App-logo" alt="logo" />
          </div>

*/
const WeatherCard = ({cards, removeCard, updateCard, tempFeel, api}) => {
    const [weatherData, setWeather] = useState(''); 
    const [temporalIndex,setTemporalIndex] = useState ('');
    const [query, setQuery] = useState('');


    let changeTempFormat = (card,targetTempFormat) => {
        // this is supposing an origin format of Celcious
        let tempValue = card.temp;
        if (card.tempFormat == 'C'){
            if (targetTempFormat == 'F'){
                tempValue = (tempValue * 9/5) + 32; // convert to Farenheit
            }else if(targetTempFormat == 'K') {
                tempValue += 273.15; // convert to Kelvin
            }
        }
        // Aqui hay que poner las otras condiciones
        else if (card.tempFormat == 'F'){
            if (targetTempFormat == 'C'){
                tempValue = ( tempValue - 32) * 5/9; // convert to celcius
            }else if (targetTempFormat == 'K'){
                tempValue = (tempValue - 32) * 5/9 + 273.15 // farenheit to kelvin

            }
        }
        else if (card.tempFormat == 'K'){
            if (targetTempFormat == 'C'){
                tempValue -= 273.15; // convert to Kelvin
            }else if (targetTempFormat == 'F') {
                tempValue = (tempValue - 273.15) * 9/5 + 32;
            }
        }
        
        if (targetTempFormat !== 'K'){
            card.temp = parseFloat(tempValue.toFixed(2));
            
        }
        else {
            card.temp = parseFloat(tempValue.toFixed(2));
        }
        
        //card.temp = tempValue;
        card.tempFormat = targetTempFormat;
        return card
    }

    const updateWeather = (index,city) => { 
        //We have to use this index
        setTemporalIndex(index)
        //setWeather(weatherDataExample); //this temporal while I learn how to use fetch
        
        fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
            setWeather(result);
            console.log(result);
        });
    }

    useEffect(() => {
        // This one is donde AFTER weatherData changes
        // Runs ONCE after initial rendering
        // and after every rendering ONLY IF `weatherData` changes
        if (typeof(weatherData.main) !="undefined"){
            updateCard(temporalIndex,
                {
                city: weatherData.name,
                temp: weatherData.main.temp,
                tempFormat: 'C',
                tempFeel: tempFeel(weatherData.main.temp)
            },);
            
        }
        setWeather(''); // This resets weatherData
    }, [weatherData]);

    
    return cards.map((card, index) => (
        <div
            className= "cardbox"
            key={index}
        >
            <div className = "delete-box">
                <button
                        onClick={() => removeCard(index)}
                        className='delete-icon'
                    >
                        X
                </button>
            </div>
            
            <div className = "city-box">
                {card.city}
            </div>
            <div className = "temperature-box">
                <div className = "temperature-info"> {card.temp} ° {card.tempFormat}</div>
                <div className = "temperature-buttons">
                    <button
                        onClick={() => updateCard(index,changeTempFormat(card,'C'))}
                        className='c-icon'
                    >
                        C
                    </button>
                    <button
                        onClick={() => updateCard(index,changeTempFormat(card,'F'))}
                        className='f-icon'
                    >
                        F
                    </button>
                    <button
                        onClick={() => updateCard(index,changeTempFormat(card,'K'))}
                        className='k-icon'
                        placeholder = 'boton'
                    >
                        K
                    </button>
                </div>

            </div>

            <div className = "temperature-feeling"> {card.tempFeel}</div>
            <div className='update-box'>
                <button
                    onClick={() =>{updateWeather(index, card.city)}}
                    className='updatebutton'
                >
                    Update
                </button>
            </div>
        </div>
    ));
}
export default WeatherCard;