import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RenderHeader from './renderheader.js';
import Home from './home.js';

const App = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('token'));

    // useEffect (() => {


    // })

    return (
        <>
            <RenderHeader/>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
            </Routes>
        </>
    )
}

export default App;