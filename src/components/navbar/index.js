import Dropdown from '../dropdown';
import Button from '../button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const aboutUsDropdown = [
	{ title: 'About Scambi', href: 'about' },
	{ title: 'Our Story', href: '' },
	{ title: 'Our Team', href: 'ourTeam' },
];

const festivalDropdown = [
	{ title: 'Labs', href: 'labs' },
	{ title: 'Pinolis', href: 'minievents' },
	// {title: "Film Contest", href:"filmcontest"}
];

const supportDropdown = [
	{ title: 'Donate', href: 'donate' },
	{ title: 'Volunteer', href: 'volunteer' },
	{ title: 'Join Team', href: '' },
];

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav
			aria-label='Scambi'
			className='w-full space-y-7 py-5 flex flex-col items-center justify-around bg-white rounded-b-3xl mr-20 lg:flex-row lg:rounded-b-full lg:space-y-0 lg:px-20 2xl:px-10'>
			<div className='w-full lg:w-auto flex justify-between px-20 lg:px-0'>
				<Link to='/' className='text-5xl font-["Londrina_Solid"]'>
					Scambi
				</Link>
				<i className='fa fa-bars fa-3x lg:hidden' onClick={handleClick} />
			</div>
			<ul
				role='menubar'
				aria-label='scambi'
				className={`${
					isOpen ? 'flex' : 'hidden'
				} space-y-3 lg:space-y-0 flex-col lg:w-auto 2xl:w-auto lg:flex lg:flex-row justify-around items-center`}>
				<Dropdown
					content='ABOUT US'
					btnStyle='text-xl font-bold'
					children={aboutUsDropdown}
				/>
				<Dropdown
					content='FESTIVAL'
					btnStyle='text-xl font-bold'
					children={festivalDropdown}
				/>
				<Dropdown
					content='SUPPORT'
					btnStyle='text-xl font-bold'
					children={supportDropdown}
				/>
				<li role='none'>
					<a role='menuitem' href='/faq' className='text-xl font-bold'>
						FAQ
					</a>
				</li>
			</ul>

			<Button classes={`${isOpen ? '' : 'hidden'} lg:inline-block`}>
				ATTEND
			</Button>
		</nav>
	);
};

export default Navbar;
