import React, { useEffect, useState } from 'react';
import CardDetails from '../CardDetails/CardDetails';
import './Cards.css';
import Card from '../../fakeData/MOCK_DATA.json';

const Cards = () => {

    const [cards, setCards] = useState([]);
    useEffect(() => {
        setCards(Card);
    }, [])

    return (
        <div className='all-cards container'>
            {
                cards.map(card => <CardDetails image={card.img} key={card.id} name={card.name}></CardDetails>)
            }
        </div>
    );
};

export default Cards;