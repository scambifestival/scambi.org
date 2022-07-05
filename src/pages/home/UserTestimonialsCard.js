import React, { Component } from 'react';
import './UserTestimonialsCard.scss';
// import UserTestimonialsPicture from '../images/UserTestimonial.png';

class UserTestimonialsCard extends Component {
    render() {
        return <div className='utc-profile-card'>
        <div>
            <img className='utc-picture' src={this.props.image} />
            <div className='utc-main-div'>
                <div className='utc-name'>{this.props.name}</div>
                <div className='utc-quote'>
                    {this.props.quote}
                </div>
            </div>
        </div>
    </div>
    }
}

export default UserTestimonialsCard;