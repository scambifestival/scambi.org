import React, { Component } from 'react';
import './UserTestimonials.scss';
import UserTestimonialsPicture from '../images/UserTestimonial.png';
import UserTestimonialsCard from './UserTestimonialsCard'


class UserTestimonials extends Component {
    render() {
        return <div>
            <div className='main-container'>
                <div className='heading'>An experience people love to talk about</div>
                <div className='cards'>
                    <UserTestimonialsCard name="Anna" 
                    quote='"To me, Scambi is where I can be free and be hopeful for the future; in these confusing and uncertain times we 
                    all need to go back to focusing on what living together really means."'
                    image={UserTestimonialsPicture}
                    />
                    <UserTestimonialsCard name="Luce" 
                    quote='"I decided to join Scambi because I saw what last year the team was able to create thanks to 
                    everybodys dedication and commitment, and I would d love to help to recreate the same magic for the next edition of the 
                    festival."'
                    image={UserTestimonialsPicture}
                    />
                    <UserTestimonialsCard name="Luisa" 
                    quote='"I like Scambi because it brought together young people from all over Italy with the goal of inventing 
                    something new, of combining music, dancing and a lot of curiosity." '
                    image={UserTestimonialsPicture}
                    />
                </div>
            </div>
        </div>
    }
}

export default UserTestimonials;