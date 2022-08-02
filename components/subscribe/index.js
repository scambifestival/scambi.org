import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { subscribe } from '../../lib/communications';

import SubscribeImg from '../../public/illustrations/subscribe.png';
import Button from '../button';
import { useState } from 'react';

export default function Subscribe() {
	const { t } = useTranslation('subscribe');
	const [email, setEmail] = useState('');

	const handleInput = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		subscribe(email);
	};

	return (
		<div className='flex rounded-[32px] bg-primary text-white mx-16 drop-shadow-2xl md:flex-row GalaxyFold:flex-col GalaxyFold:w-60 iPhoneSE:w-full'>
			<Image
				src={SubscribeImg}
				alt='Subscribe illustration'
				className='hidden lg:block lg:rounded-l-[32px] md:rounded-tr-[0px] GalaxyFold:rounded-t-[32px] md:rounded-l-[32px] object-fill'
			/>
			<div className='flex flex-col items-center justify-center lg:pr-10 p-6 GalaxyFold:p-12'>
				<div className='lg:ml-10 GalaxyFold:p-2'>
					<p className='uppercase'>exchanges of letters, our newsletter</p>
					<h2>Scambi Epistolari</h2>
					<p className='mb-5'>
						Join the conversation - sign up now to receive updates on Scambi
						activities.
					</p>
					<form>
						<input
							type='email'
							placeholder={t('input')}
							className='rounded-md lg:w-[300px] lg:mr-5 peer mr-2'
						/>
						<Button classes='bg-primary-yellow peer-invalid:disabled text-black GalaxyFold:mt-2'>
							{t('button')}
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
