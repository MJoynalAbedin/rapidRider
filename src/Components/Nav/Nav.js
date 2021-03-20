import React, { useContext } from 'react';
import { userContext } from '../../App';
import './Nav.css'

const Nav = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    return (
        <div>
            <nav className="navbar nav-bar-custom navbar-expand-lg navbar-light">
                <a style={{fontSize: '30px'}} className="navbar-brand font-weight-bold" href="/home">Rapid Rider</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="home">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="destination">Destination</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="blog">Blog</a>
                        </li>
                    </ul>
                </div>
                {
                    loggedInUser.email ? loggedInUser.name ? <button className="btn btn-success">{loggedInUser.name}</button> : <button className="btn btn-danger">No Name Set</button> : <a className="nav-link" href="login"><button className="btn btn-primary">Log In</button></a>
                }
            </nav>
        </div>
    );
};

export default Nav;