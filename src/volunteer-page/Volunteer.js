import React, { Component } from 'react';
import './Volunteer.scss'
import NavbarGlobal from '../global-components/NavbarGlobal';
import VolunteerCard from './VolunteerCard'

class Volunteer extends Component {
    render() {
        return <div className='volunteer-main-container'>
            <NavbarGlobal/>
            <div className='volunteer-inner-container'>
                <div className='volunteer-title'>
                    Volunteer With Us
                </div>
                <div className='volunteer-cards'>
                    <VolunteerCard
                        title = {"Summer Volunteer"}
                        subtitle = {"(Aug 22-29, 2022)"}
                        description = {`Are you looking for a volunteer experience to crank up your resume?
                        Would you love to participate in the creation of a cultural youth exchange? Are 
                        you not afraid of some challenging and insightful work? Would you love to come 
                        join us in Italy this summer? Then volunteering for Scambi is something made for 
                        you!`}
                        buttonText = {`Learn More`}
                        buttonLink = {"/"}
                    />

                    <VolunteerCard
                        title = {"Join the Scambi Team"}
                        subtitle = {"(Year-round)"}
                        description = {`We are looking for new energies and people who are ready to take on a 
                        challenge, who share the founding values of our Festival and want to contribute to its 
                        realisation. If you are under 30 and have time to invest in an ever-developing project… 
                        welcome! You have found the place for you.`}
                        buttonText = {`Check for open positions`}
                        buttonLink = {"/"}
                    />
                </div>
            </div>
        </div>
    }
}

export default Volunteer;