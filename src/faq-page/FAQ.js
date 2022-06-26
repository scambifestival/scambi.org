import React, { Component } from 'react';
import { Accordion } from 'react-bootstrap';
import NavbarGlobal from '../global-components/NavbarGlobal';
import './FAQ.scss'
import FAQImage from '../images/FAQImage.jpg'


class FAQ extends Component {
    render() {
        return <div>
            <NavbarGlobal/>
            <div className='faq-header'>
                <div className="faq-header-title">Frequently Asked Questions</div>
                <img className="faq-image" src={FAQImage} />
            </div>
            <div className='faq-general'>
                <div className='faq-general-heading'>General</div>
                <div className='faq-general-questions'>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>When and where is the next edition of Scambi Festival taking place?</Accordion.Header>
                            <Accordion.Body>
                            Scambi Festival 2022 is taking place in the neighborhood of Pigna, Sanremo, Italy, from the 25th to the 28th of August 2022.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                            I already know I cannot be in Sanremo from the 25th to the 28th of August 2022. Will I be able to follow the meetings online?
                            </Accordion.Header>
                            <Accordion.Body>
                            Unfortunately, not. Virtual meetings deny the very definition of what we are working on. Physicality is a key factor in the 
                            human exchange and mutual growth we are pursuing.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                            Can’t wait to be there! Are there any accommodation solutions?
                            </Accordion.Header>
                            <Accordion.Body>
                            It is too soon to know for sure, but we are working on offering low-cost accommodation solution to allow the 
                            participation of everyone, no matter if local or coming from Tatooine.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                            How much does the ticket cost?
                            </Accordion.Header>
                            <Accordion.Body>
                            Nothing. Scambi aims to be accessible to everyone, literally: there are no age limits, no activities inaccessible
                            to people with disabilities, and, of course, there is no fee.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>
                            How cool! Can I work with you?
                            </Accordion.Header>
                            <Accordion.Body>
                            We are always thrilled to welcome new people in our team! 
                            Everything you need to know about this is <a href='/careers'>here</a>.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                            <Accordion.Header>
                            Are the festival events being translated in English, too?
                            </Accordion.Header>
                            <Accordion.Body>
                            Last year, they were not. We are working hard to ensure language will not be an 
                            issue next time.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="6">
                            <Accordion.Header>
                            How can I keep updated about your activities?
                            </Accordion.Header>
                            <Accordion.Body>
                            There are many ways: you can subscribe to our newsletter, follow our social media 
                            pages or directly contact us.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="7">
                            <Accordion.Header>
                            I have a question still waiting for an answer!
                            </Accordion.Header>
                            <Accordion.Body>
                            We are not as clever as Sheldon Cooper, but we promise to do our best to help you. 
                            Either write a comment below, <a href='mailto:staff@scambi.org'>write us an email</a>, 
                            or send us a message on <a href ='https://instagram.com/scambifestival'>social media</a>.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </div>
    }
}

export default FAQ;