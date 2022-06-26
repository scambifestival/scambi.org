import React, { Component } from 'react';
import './VolunteerCard.scss'


class VolunteerCard extends Component {
    render() {
        return <div className='volunteer-card-main-container'>
                <div className='volunteer-card-header'>
                    <div className='volunteer-card-heading'>{this.props.title}</div>
                    <div className='volunteer-card-heading'>{this.props.subtitle}</div>
                </div>
                <div className='volunteer-card-description'>
                    {this.props.description}
                </div>
                <a href={this.props.buttonLink} className='volunteer-card-button'>{this.props.buttonText}</a>
        </div>
    }
}

export default VolunteerCard;