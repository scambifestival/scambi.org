import Flex from '../components/flex';
import Image from 'next/image';
import Accordion from '../components/accordion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { data } from '../assets/data';

export default function FAQ() {
	return (
		<Flex classes='my-32 w-full mx-auto items-center md:flex-col lg:flex-row'>
			<div className='flex flex-col items-center self-start mx-auto iPhoneSE:mx-4 sm:mx-12 lg:mx-0 lg:mr-24'>
				<h2 className='text-center lg:mb-10'>Frequently Asked Questions</h2>
				<div className='hidden lg:block'>
					<Image src='/faq.png' alt='' className='rounded-xl' width={660} height={500} />
				</div>
			</div>
			<div className='mx-auto w-full'>
				<div className='flex justify-center mx-1 iPhoneSE:mx-3 sm:mx-6 lg:mx-0'>
					<Accordion content={data} />
				</div>
			</div>
		</Flex>
	);
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, 'faq')),
		},
	};
}
