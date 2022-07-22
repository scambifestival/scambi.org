import React from 'react';
import UserTestimonialsPicture from '../../assets/home/UserTestimonial.png';
import Card from '../../components/card';

const testimonials = [
	{
		name: 'Anna',
		quote:
			'To me, Scambi is where I can be free and be hopeful for the future; in these confusing and uncertain times we all need to go back to focusing on what living together really means.',
		image: UserTestimonialsPicture,
	},
	{
		name: 'Luce',
		quote:
			'I decided to join Scambi because I saw what last year the team was able to create thanks to everybodys dedication and commitment, and I would d love to help to recreate the same magic for the next edition of the festival.',
		image: UserTestimonialsPicture,
	},
	{
		name: 'Luisa',
		quote:
			'I like Scambi because it brought together young people from all over Italy with the goal of inventing something new, of combining music, dancing and a lot of curiosity.',
		image: UserTestimonialsPicture,
	},
];

const Testimonials = () => {
	return (
		<div className='mt-20 sm:mt-6 lg:mt-10 xl:mt-32'>
			<h2 className='px-5 mb-14 sm:mb-0 sm:px-10 leading-tight'>
				An experience people love to talk about
			</h2>
			<div className='flex flex-wrap justify-center mb-5 lg:mt-0 xl:mt-16'>
				{testimonials.map((testimonial, index) => (
					<Card
						classes='relative max-w-[80%] p-10 my-8 bg-white text-left lg:max-w-[27%] lg:mx-5 lg:my-20 xl:max-w-[20%] xl:m-16'
						key={`testimonial-${index}`}>
						<img
							alt=''
							src={testimonial.image}
							className='absolute max-w-[12rem] -top-14 -right-10 sm:-top-12 sm:-right-14 lg:-top-14 lg:-right-10 xl:-top-24 xl:-right-20'
						/>
						<div className='pb-8 text-lg font-semibold'>{testimonial.name}</div>
						<p>{`"${testimonial.quote}"`}</p>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Testimonials;
