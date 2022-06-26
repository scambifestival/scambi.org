import './Home.scss';
import React, { Component } from 'react';
import Header from './Header';
import NLSubscribe from './NLSubscribe';
import Purpose from './Purpose';
import NavbarGlobal from '../global-components/NavbarGlobal';
import UserTestimonials from './UserTestimonials';
import Explore from './Explore';

class Home extends Component {
    render() {
        return <div className='mainhome-container'>
            <NavbarGlobal/>
            <Header />
            <UserTestimonials />
            <Purpose />
            <NLSubscribe />
            <Explore />
        </div>
    }
}

export default Home;