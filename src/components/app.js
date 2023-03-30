import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RenderHeader from './renderheader.js';
import Home from './home.js';
import Login from './login.js';
import Routines from './routines.js';
import MyRoutines from './myroutines.js';
import Activities from './activities.js';


const App = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('token'));

    // useEffect (() => {


    // })

    return (
        <>
            <RenderHeader/>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/routines' element={<Routines/>}></Route>
                <Route path='/myroutines' element={<MyRoutines/>}></Route>
                <Route path='/activities' element={<Activities/>}></Route>
                
            </Routes>
        </>
    )
}

export default App;