import React from 'react';
import { useHistory } from 'react-router';
import './CardDetails.css'

const CardDetails = (props) => {

    const history = useHistory();
    
    const handleCardClick = () => {

        history.push('/destination')
        
    }

    return (
        <div className='ride-card' onClick={handleCardClick}>
            <img src={props.image} alt=""/>
            <h2>{props.name}</h2>
        </div>
    );
};

export default CardDetails;