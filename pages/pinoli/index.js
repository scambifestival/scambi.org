import Image from 'next/image';
import Flex from '../../components/flex';
import Map from '../../components/map';
import Button from '../../components/button';
import Card from '../../components/card';
import { pinoli } from '../../assets/pinoli';
import Carousel from '../../components/carousel';
import SupportUs from '../../components/support-cards';
import { getPinoli } from '../../lib/pinoli';

export default function Pinoli() {
	return (
		<section className='mt-40'>
			<Flex classes='py-20 mx-auto'>
				<div className='text-center lg:text-left'>
					<h1>Pinoli</h1>
					<p className='xl:w-4/5'>
						Pinoli are not just the sweet seeds that make pesto so delicious;
						when it comes to Scambi, they are events where you can meet new
						people: book presentations, exhibitions of innovative technological
						solutions, exchanges of secondhand clothing, and much more.
					</p>
				</div>
				<Image
					src='/illustrations/pinoli.png'
					alt='Two hand-drawn blue bowls full of seeds with a hand-drawn purplish acorn behind it'
					width={738}
					height={682}
				/>
			</Flex>

			<div className='lg:px-16 bg-white py-10 text-center'>
				<h2>What is a Pinolo?</h2>
				<p>
					A Pinolo is a collateral event that comes to life during Scambi
					festival.
				</p>
				<div className='mt-10'>
					<Carousel slides={pinoli} />
				</div>
			</div>

			{/* Map */}
			{/*<div className='px-20 my-10'>
				<h2 className='pt-5'>Upcoming Pinolis</h2>
				<Map />
  </div>*/}

			<div className='grid grid-cols-1 lg:grid-cols-3 mx-10 lg:mx-20'></div>

			{/*<Flex classes='mx-auto'>
				<h1>More Info Coming Soon!</h1>
				<Image
					src='/illustrations/rocket.png'
					alt=''
					width={382}
					height={500}
				/>
</Flex>*/}

			<SupportUs />
		</section>
	);
}

export async function getStaticProps() {
	const pinoli = await getPinoli();

	return {
		props: {
			pinoli,
		},
	};
}
