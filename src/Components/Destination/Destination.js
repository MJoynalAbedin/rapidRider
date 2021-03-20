import React from 'react';
import './Destination.css';
import map from '../../images/Map.png';
import Car from '../../images/Frame-2.png';
import Bus from '../../images/Frame-1.png';
import Bike from '../../images/Frame.png';
import People from '../../images/peopleicon.png'

const Destination = () => {


    const handleSearchLocation = () => {
        document.getElementById('selectBox').style.display = 'none';
        document.getElementById('destinationBox').style.display = 'block';
    }

    return (
        <div className="container motherOfMap">
            <div id="selectBox" className="pick-form">
                <p className="float-left pick-text">Pick From</p>
                <select className="select-field">
                    <option>Mirpur</option>
                    <option>Dhaka</option>
                    <option>Ctg</option>
                </select>
                <p className="float-left pick-text">Pick To</p>
                <select className="select-field" name="" id="">
                    <option>Mirpur</option>
                    <option>Dhaka</option>
                    <option>Ctg</option>
                </select>
                <button onClick={handleSearchLocation} className='btn-search'>Search</button>
            </div>
            <div id="destinationBox" style={{ display: 'none' }} className=" destination-container">
                <div className="place-name">
                    <h5>Mirpur-1</h5>
                    <h5>Dhanmondi-2</h5>
                </div>
                <div className="carImg d-flex justify-content-between align-items-center">
                    <img src={Car} alt="" />
                    <span className="peopleIcon"><img src={People} alt=""/>4</span>
                    <h6>$34</h6>
                </div>
                <div className="carImg d-flex justify-content-between align-items-center">
                    <img src={Bus} alt="" />
                    <span className="peopleIcon"><img src={People} alt=""/>6</span>
                    <h6>$36</h6>
                </div>
                <div className="carImg d-flex justify-content-between align-items-center">
                    <img src={Bike} alt="" />
                    <span className="peopleIcon"><img src={People} alt=""/>2</span>
                    <h6>$36</h6>
                </div>
            </div>
            <div className='map'>
                <img src={map} alt="" />
            </div>
        </div>
    );
};

export default Destination;