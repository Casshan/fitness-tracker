import React from "react";
import { Link } from 'react-router-dom';

const RenderHeader = () => {

    return (<React.Fragment>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Fitness Tracker</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#/routines">Routines</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#/myroutines">My Routines</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#/activities">Activities</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#/login">Login</a>
                        </li>

                    </ul>

                </div>
            </div>
        </nav>

        {/* <Link id='home' to='/'>Home</Link>
            <Link id='Login' to='/login'>Login</Link>
            <Link id='routines' to='/routines'>Routines</Link>
            <Link id='myroutines' to='/myroutines'>My Routines</Link>
            <Link id='activities' to='/activities'>Activities</Link> */}
    </React.Fragment>

    )
};

export default RenderHeader;