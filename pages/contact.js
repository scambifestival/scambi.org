import Button from '../components/button';
import Link from 'next/link';

export default function Contact() {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [subject, setSubject] = useState();
	const [message, setMessage] = useState();

	const handleChange = (e) => {
		e.preventDefault();
		switch (e.target.id) {
			case 'name':
				setName(e.target.value);
				break;
			case 'subject':
				setSubject(e.target.value);
				break;
			case 'msg':
				setMessage(e.target.value);
				break;
			case 'email':
				break;
		}
	};

	return (
		<section className='my-40 text-center'>
			<h1>Contact Us</h1>
			<div className='mt-5 mx-auto'>
				<h3>
					Contact us with any general questions and we will try to get back to
					you as soon as we can.{' '}
				</h3>
				<form className='bg-white lg:mx-auto mt-10 p-10 max-w-3xl space-y-5 border-2 border-primary rounded-md'>
					<div className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:justify-center max-w-full'>
						<div className='lg:mr-5 w-full'>
							<input
								id='name'
								type='text'
								placeholder='Name'
								required
								onChange={handleChange}
								className='w-full px-0.5 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-primary placeholder:text-gray-400 '
							/>
							<p className='text-red-600 text-left mt-2 invisible '>
								This field is required
							</p>
						</div>
						<div className='w-full'>
							<input
								id='email'
								type='email'
								placeholder='Email'
								required
								onChange={handleChange}
								className='w-full px-0.5 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-primary placeholder:text-gray-400 '
							/>
							<p className='text-red-600 text-left mt-2 invisible '>
								Please enter a valid email address
							</p>
						</div>
					</div>
					<div className='max-w-full'>
						<input
							id='subject'
							type='text'
							placeholder='Subject'
							required
							onChange={handleChange}
							className='w-full px-0.5 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-primary placeholder:text-gray-400 '
						/>
						<p className='text-red-600 text-left mt-2'>
							This field is required
						</p>
					</div>
					<div className='w-full'>
						<textarea
							id='msg'
							placeholder='Message'
							required
							rows={10}
							onChange={handleChange}
							className='w-full px-0.5 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-primary placeholder:text-gray-400 '
						/>
						<p className='text-red-600 text-left mt-2 invisible '>
							This field is required
						</p>
					</div>
					<Button classes='btn-primary'>Send</Button>
				</form>
			</div>
			<div className='mt-20 px-10'>
				<div className='bg-white p-5 shadow-lg rounded-lg lg:flex lg:justify-between lg:items-center'>
					<div className='text-left'>
						<p className='font-bold'>FAQ</p>
						<p>Have questions?</p>
					</div>
					<Link href='/faq'>
						<a className='text-primary flex items-center'>
							<span>Go to FAQ</span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 ml-2'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth={2}>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M17 8l4 4m0 0l-4 4m4-4H3'
								/>
							</svg>
						</a>
					</Link>
				</div>
			</div>
			<div className='mt-20 px-10'>
				<div className='bg-white p-5 shadow-lg rounded-lg lg:flex lg:justify-between lg:items-center'>
					<div className='text-left'>
						<p className='font-bold'>PressKit</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</div>
					<Link href='/'>
						<a className='text-primary flex items-center'>
							<span>Download</span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 ml-2'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth={2}>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M17 8l4 4m0 0l-4 4m4-4H3'
								/>
							</svg>
						</a>
					</Link>
				</div>
			</div>
		</section>
	);
}
