import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { ChevronRight } from '../icons/chevron';

export default function Accordion() {
	const { t } = useTranslation('faq');
	const content = t('faq', { returnObjects: true });

	return (
		<motion.ul className='rounded-2xl lg:max-w-[50vw] space-y-5 break-normal'>
			{content.map((el, index) => (
				<Item key={index} question={el.question} answer={el.answer} />
			))}
		</motion.ul>
	);
}

function Item({ question, answer }) {
	const [isOpen, setIsOpen] = useState();

	const toggleOpen = () => setIsOpen(!isOpen);
	return (
		<motion.li onClick={toggleOpen}>
			<motion.div
				transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
				className={`flex items-center p-3 bg-white border-primary border-t-2 border-x-2 cursor-pointer rounded-t-2xl ${
					isOpen
						? 'bg-primary text-white border-b-[1px]'
						: 'border-b-2 rounded-b-2xl'
				}`}>
				<p className='mr-3'>{question}</p>
				<motion.div
					animate={{ rotate: isOpen ? 90 : 0 }}
					transition={{ duration: 0.4 }}>
					<ChevronRight />
				</motion.div>
			</motion.div>
			<AnimatePresence>{isOpen && <Answer answer={answer} />}</AnimatePresence>
		</motion.li>
	);
}

function Answer({ answer }) {
	return (
		<motion.div
			initial={{ height: 0, opacity: 0 }}
			animate={{ height: 'auto', opacity: 1 }}
			exit={{ height: 0, opacity: 0 }}>
			<motion.p
				variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
				transition={{ duration: 0.3 }}
				className='p-3 rounded-b-2xl border-x-2 border-b-2 border-primary bg-white'>
				{answer}
			</motion.p>
		</motion.div>
	);
}
