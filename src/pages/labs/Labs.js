import labVid from "../../assets/lab/labVid.png";
import lab from "../../assets/lab/lab.png";
import {
	rec1,
	rec2,
	rec3,
	rec4,
	rec5,
	rec6,
	rec7,
	rec8,
	rec9,
	rec10,
} from '../../assets/lab/gallery/index';
import Flex from '../../components/Flex/Flex';
import LabCard from './components/card';

export default function Labs() {
	const dummyData = [
		{
			title: "Lorem Ipsum",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. "
		},
		{
			title: "Lorem Ipsum",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. "
		},
		{
			title: "Lorem Ipsum",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. "
		},
		{
			title: "Lorem Ipsum",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. "
		}
	];
	return (
		<div className="pt-10 px-10">
			<Flex classes="items-center">
				<div className="text-left">
					<h1 className="font-semibold mb-3">Labs</h1>
					<p className="italic mb-10">
						Scambi’s workshops are the place where the exchange becomes reality.
					</p>
					<p className="mb-5">
						Participants are involved in{" "}
						<span className="font-bold italic">paneuretic</span> experiences and
						can create their own path through laboratories, approaching the
						theme from different perspectives, in order to know better
						themselves, others and the world around them.
					</p>
					<button className="px-10 py-2 rounded-lg bg-[#69088D] text-white">
						Get Tickets
					</button>
				</div>
				<img src={labVid} alt='' />
			</Flex>
			<Flex classes="items-center justify-around">
				<img className="w-[436px] h-[425px]" src={lab} alt="" />
				<div className="text-left w-[500px]">
					<h1 className="text-5xl font-semibold mb-10">What are Labs?</h1>
					<p>
						Laboratories are work-groups guided by an external host aimed at
						exploring the current edition theme.{" "}
					</p>
				</div>
			</Flex>
			<div className="mt-20 text-5xl font-semibold">
				<div className="mb-10 text-center">
					<h1>Scambi 2021:</h1>
					<h1>Lab Photo Gallery</h1>
				</div>
				<div className="flex justify-center">
					<div className="space-y-5">
						<img
							src={rec1}
							className='rounded-2xl border-4 border-yellow-300 shadow-md  w-[200px] h-[260px]'
							alt=''
						/>
						<img
							src={rec3}
							className='rounded-2xl border-4 border-yellow-300 shadow-md w-[200px] h-[134px]'
							alt=''
						/>
					</div>
					<div className="flex flex-col space-y-5 mx-5">
						<div className="flex space-x-5">
							<img
								src={rec2}
								className='rounded-2xl border-4 border-yellow-300 shadow-md w-[309px] h-[134px]'
								alt=''
							/>
							<img
								src={rec6}
								className='rounded-2xl border-4 border-yellow-300 shadow-md w-[200px] h-[134px]'
								alt=''
							/>
						</div>
						<div className="flex space-x-5">
							<img
								src={rec4}
								className='rounded-2xl border-4 border-yellow-300 shadow-md w-[200px] h-[256px]'
								alt=''
							/>
							<img
								src={rec5}
								className='rounded-2xl border-4 border-yellow-300 shadow-md w-[310px] h-[256px]'
								alt=''
							/>
						</div>
					</div>
					<div className="flex">
						<div className="mr-5">
							<img
								src={rec9}
								className='rounded-2xl border-4 border-yellow-300 shadow-md mb-5 w-[200px] h-[256px]'
								alt=''
							/>
							<img
								src={rec10}
								className='rounded-2xl border-4 border-yellow-300 shadow-md w-[200px] h-[134px]'
								alt=''
							/>
						</div>
						<div>
							<img
								src={rec7}
								className='rounded-2xl border-4 border-yellow-300 shadow-md mb-5 w-[310px] h-[256px]'
								alt=''
							/>
							<img
								src={rec8}
								className='rounded-2xl border-4 border-yellow-300 shadow-md w-[309px] h-[134px]'
								alt=''
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-20">
				<h1 className="text-5xl font-semibold mb-10">Upcoming Labs</h1>
				<div className="grid grid-cols-2 gap-x-5 gap-y-10">
					{dummyData.map((el, index) => {
						return (
							<LabCard
								index={index}
								title={el.title}
								description={el.description}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
