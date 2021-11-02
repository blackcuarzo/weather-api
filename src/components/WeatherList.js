import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
import SearchBox from './SearchBox';
import './WeatherList.css'

const api = {
    key: "11d52a7fc9db86a74f05e12dcef8dfb9",
    //key: "8123987",
    base: "https://api.openweathermap.org/data/2.5/"
}

const WeatherList = () =>{
    const [cards, setCards] = useState([]);
    
    
    const addCard = card => {
        setCards([...cards,card ]);
    };

    const updateCard = (newCardId, newCard) => {
        setCards(prev => prev.map((oldCard,i) => (i === newCardId ? newCard : oldCard)));
    };

    const removeCard = (index) => {
        setCards([...cards].filter((e,i) => i !== index));
    };

    let tempFeel = (tempValue) => {
        // Now some conditions over a celcius temperature
        if (tempValue < 19){
            return 'Cold'
        }else if (tempValue > 26){
            return 'Hot'
        }else{
            return 'Warm'
        }
    }

    return(
        <div>
            <div className = 'searchBox'>
            <SearchBox 
                onSubmit = {addCard}
                tempFeel = {tempFeel}
                api = {api}
            />

            <div className = "cardlist">
                <WeatherCard
                    cards = {cards}
                    removeCard={removeCard}
                    updateCard={updateCard}
                    tempFeel = {tempFeel}
                    api = {api}
                />
            </div>
            

            </div>
        </div>
    )
}

export default WeatherList;



