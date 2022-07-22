import React from 'react';
import ReactPlayer from 'react-player'

const Header = () => {
    return (
        <div>
            <div className='w-11/12 flex flex-col justify-between mt-10 mx-auto sm:w-10/12 sm:mx-auto sm:my-10 sm:text-left xl:items-center xl:flex-row'>
                <div>
                    <h1 className='leading-none'>Scambi Festival</h1>
                    <h3>The Festival of Paneuretic Workshops, free for all to attend</h3>
                </div>
                <p className='font-semibold'>
                    <span className='text-2xl'>August 25 - 28, 2022</span> <br />
                    <span className='text-lg'>La Pigna, Sanremo, Italy</span>
                </p>
            </div>
            <div className='mx-5 my-7 flex justify-center sm:min-h-[20rem] md:min-h-[32rem] md:mx-10 md:mt-10 xl:mt-16'>
                <ReactPlayer width='100%' height='auto' url='https://vimeo.com/658183199' />
            </div>
        </div>
    );
};

export default Header;