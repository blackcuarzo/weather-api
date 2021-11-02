import React, { useEffect, useState } from 'react';

import citiesData from '../cities.json'

const SearchBox = (props) =>{
    const [query, setQuery] = useState('');
    const [weatherData, setWeather] = useState(''); 
    const [confirmSearch, setSearch] = useState(false); 

    const citiesArray = citiesData.cities.map(item => item.name);

    const search = evt => { 
        if (evt.key === "Enter"|| evt === 'click') {
            setSearch(true)
            evt = '';
        }
    }

    useEffect(() => {
        // This one is donde AFTER weatherData changes
        // Runs ONCE after initial rendering
        // and after every rendering ONLY IF `prop` or `state` changes
        if (typeof(weatherData.main) !="undefined"){
            props.onSubmit({
                city: weatherData.name,
                temp: weatherData.main.temp,
                tempFormat: 'C',
                tempFeel: props.tempFeel(weatherData.main.temp)
            });
        }
        setWeather(''); // This resets weatherData
    }, [weatherData]);


    useEffect(() => {
        // This one is donde AFTER weatherData changes
        // Runs ONCE after initial rendering
        // and after every rendering ONLY IF `prop` or `state` changes
        if(confirmSearch == true){
            fetch(`${props.api.base}weather?q=${query}&units=metric&APPID=${props.api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                setQuery(''); // This resets queryData
                console.log(result);
            });
            setSearch(false);
        }
    }, [confirmSearch]);
    

    return(
        <div className ="search-box">
            <input
                className = "search-bar"
                type="text" list="cityNames" 
                //onClick = {e => {setQuery(e.target.value);search('click');}}
                onInput = {e => {setQuery(e.target.value);if(citiesArray.includes(e.target.value)){search('click')};}}
                placeholder = 'City'
                onChange={e => setQuery(e.target.value)}
                onKeyPress = {search}
                value = {query}
            />
                <datalist
                    id="cityNames"
                >
                    {citiesData.cities.map((item, id) => (
                    <option key={id} value={item.name}>
                        {item.name}
                    </option>
                    ))}
                </datalist>
        </div>
    )
}

export default SearchBox;
