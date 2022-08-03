import Flex from '../components/flex';
import Image from 'next/image';
import Accordion from '../components/accordion';

import { data } from '../assets/data';

export default function FAQ() {
	return (
		<section>
			<div className='flex flex-col items-center lg:flex-row mx-auto justify-between'>
				<h2 className='text-center lg:px-16'>Frequently Asked Questions</h2>
				<Image src='/faq.png' alt='' width={660} height={500} />
			</div>
			<div className='mx-auto mt-20 py-20 bg-white w-full'>
				<div className='flex justify-center'>
					<Accordion content={data} />
				</div>
			</div>
		</section>
	);
}
