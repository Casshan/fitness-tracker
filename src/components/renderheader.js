import React from "react";
import {Link} from 'react-router-dom';

const RenderHeader = () => {

    return (
        <>
            <Link id='home' to='/'>Home</Link>
            <Link id='Login' to='/login'>Login</Link>
            <Link id='routines' to='/routines'>Routines</Link>
            <Link id='myroutines' to='/myroutines'>My Routines</Link>
            <Link id='activities' to='/activities'>Activities</Link>

        </>)
}

export default RenderHeader;