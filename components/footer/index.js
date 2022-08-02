import Link from "next/link";
import Button from "../button";

import {
	Twitter,
	Facebook,
	Mastodon,
	Instagram,
	Peertube,
	Pixelfed
} from "../icons/social-media";
import useMediaQuery from "../../lib/hooks/media-query";

export default function Footer() {
	const isLarge = useMediaQuery("(max-width: 940px)");
	const isMedium = useMediaQuery("(max-width: 767px)");
	const isSmall = useMediaQuery("(max-width: 430px)");
	const isXSmall = useMediaQuery("(max-width: 400px)");
	const isIPhoneSE = useMediaQuery("(max-width: 375px)");
	const isGalaxyS8 = useMediaQuery("(max-width: 360px)");

	return (
		<footer className="h-full bg-white rounded-t-[32px]">
			<div className="flex justify-between items-center SurfaceDuo:px-1 sm:px-10 pt-10 GalaxyFold:px-0 GalaxyFold:justify-end sm:justify-between">
				<h2 className="GalaxyFold:hidden sm:block">Scambi</h2>
				<div className="flex">
					<div className="w-2/3 p-3">
						<p className="text-[18px]">
							<b>Ready to join us?</b>
						</p>
					</div>
					<Button classes="btn-primary SurfaceDuo:mr-0 GalaxyFold:mr-2 GalaxyFold:p-4 GalaxyFold:h-14 iPhoneSE:px-12 iPhoneSE:h-auto iPhoneSE:mt-auto">
						ATTEND
					</Button>
				</div>
			</div>
			<div className="w-full h-fit flex flex-row md:flex-row sm:flex-col lg:flex-row md:space-x-4 md:space-y-0 items-center iPhoneSE:flex-col GalaxyFold:flex-col SurfaceDuo:flex-col md:-mt-10">
				<div className="md:w-1/3 lg:w-1/4 sm:w-1/3 md:h-1/2 sm:h-1/2 xs:w-1/2 lg:ml-20 md:ml-12 sm:ml-2">
					<div className="relative lg:mt-6 md:-mt-20 sm:-mt-10 SurfaceDuo:-mt-2 iPhoneSE:mt-0 iPhoneSE:mb-10 GalaxyFold:mt-2">
						<div className="blobFooter drop-shadow-lg">
							<div className="flex flex-col justify-center items-center relative">
								<svg
									width={
										isGalaxyS8
											? 280
											: isIPhoneSE
											? 300
											: isXSmall
											? 375
											: isSmall
											? 400
											: isMedium
											? 400
											: isLarge
											? 340
											: 400
									}
									height={
										isGalaxyS8
											? 280
											: isIPhoneSE
											? 300
											: isXSmall
											? 375
											: isSmall
											? 400
											: isMedium
											? 400
											: isLarge
											? 340
											: 400
									}
									viewBox="0 0 437 385"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<g filter="url(#filter0_d_4572_33029)">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M259.757 30.2453C307.315 39.7447 361.414 41.1139 391.562 76.3805C422.908 113.048 417.818 162.249 410.762 206.887C403.306 254.047 393.335 304.526 351.158 331.96C307.592 360.297 246.244 366.435 194.792 347.366C148.464 330.195 137.375 278.95 108.147 241.892C77.1488 202.59 18.1299 174.135 21.0246 127.045C24.0276 78.1922 72.9156 42.2192 121.635 22.4646C164.586 5.04909 212.626 20.8313 259.757 30.2453Z"
											fill="#EDBBFF"
										/>
									</g>
									<defs>
										<filter
											id="filter0_d_4572_33029"
											x="0.921875"
											y="0.645752"
											width="435.158"
											height="383.708"
											filterUnits="userSpaceOnUse"
											colorInterpolationFilters="sRGB">
											<feFlood floodOpacity="0" result="BackgroundImageFix" />
											<feColorMatrix
												in="SourceAlpha"
												type="matrix"
												values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
												result="hardAlpha"
											/>
											<feOffset dy="6" />
											<feGaussianBlur stdDeviation="10" />
											<feColorMatrix
												type="matrix"
												values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
											/>
											<feBlend
												mode="normal"
												in2="BackgroundImageFix"
												result="effect1_dropShadow_4572_33029"
											/>
											<feBlend
												mode="normal"
												in="SourceGraphic"
												in2="effect1_dropShadow_4572_33029"
												result="shape"
											/>
										</filter>
									</defs>
								</svg>
							</div>
						</div>
						<div className="flex flex-col text-center bottom-28 absolute justify-center content-center items-center w-full GalaxyFold:top-40 iPhoneSE:bottom-28 iPhoneSE:pl-12 GalaxyFold:ml-0 pl-6 pb-10">
							<p className="GalaxyFold:pb-0 iPhoneSE:w-full iPhoneSE:pr-8 lg:pr-0 GalaxyFold:w-3/4 GalaxyFold:mr-0 sm:w-60 md:w-96 iPhoneSE:pb-2 iPhoneSE::mb-2 iPhonseSE:ml-0 iPhoneSE:mb-2 SurfaceDuo:pb-2 GalaxyS8:mb-1 md:mt-6 lg:mr-2">
								<b className="items-center text-fuchsia-800">
									Subscribe to our Newsletter!
								</b>
							</p>
							<form className="flex flex-col GalaxyFold:mb-12">
								<input
									type="email"
									placeholder="Enter your email"
									className="rounded-md lg:w-[260px] lg:ml-5 peer GalaxyFold:w-[180px] iPhoneSE:mr-8 iPhoneXR:w-72 iPhoneXR:mb-2 iPhoneSE:w-[250px] md:w-[220px] md:mr-8 iPhonseSE:mb-2"
								/>
								<Button classes="btn-primary peer-invalid:disabled lg:w-48 lg:ml-12 lg:mb-8 lg:pl-4 lg:pr-4 mt-5 blobBtn md:pr-0 md:pl-0 md:w-30 md:ml-10 GalaxyFold:w-28 GalaxyFold:ml-8 GalaxyFold:pl-2 GalaxyFold:pr-2 GalaxyFold:mt-2 iPhoneSE:mr-30 iPhoneSE:mt-3 iPhoneXR:w-36 iPhoneXR:ml-20 iPhoneSE:w-36 md:w-36 GalaxyFold:py-2 GalaxyFold:rounded-xl iPhoneSE:ml-16 iPhoneSE:py-4 iPhoneXR:rounded-2xl GalaxyS8:ml-10">
									Subscribe
								</Button>
							</form>
						</div>
					</div>
				</div>
				<div className="flex flex-col GalaxyFold:mb-0 md:pl-20  lg:ml-96 GalaxyFold:ml-4 iPhoneSE:ml-0">
					<div className="flex flex-row">
						<div className="iPhoneSE:columns-3 GalaxyFold:columns-2 sm:gap-x-20 md:gap-x-9 SurfaceDuo:gap-x-24 lg:gap-x-24 xl:gap-x-44 w-full md:mt-20 md:ml-0 sm:mt-2 iPhoneSE:mt-0 GalaxyFold:mt-0 GalaxyFold:ml-6 SurfaceDuo:ml-0">
							<ul>
								<li className="">
									<Link href="/about">
										<a>About</a>
									</Link>
								</li>
								<li className="mt-2">
									<Link href="/teams">
										<a>Team</a>
									</Link>
								</li>
								<li className="mt-2">
									<Link href="/">
										<a>Manifesto</a>
									</Link>
								</li>
								<li className="mt-2">
									<Link href="/">
										<a>Accessibility</a>
									</Link>
								</li>
								<li className="mt-2">
									<Link href="/lab">
										<a>Labs</a>
									</Link>
								</li>
								<li className="mt-2">
									<Link href="/pinoli">
										<a>Pinoli</a>
									</Link>
								</li>
								<li className="mt-2">
									<Link href="/">
										<a>Dissolvenze</a>
									</Link>
								</li>
								<li className="mt-2">
									<Link href="/">
										<a>Ideas</a>
									</Link>
								</li>
								<li className="mt-2">
									<Link href="/">
										<a>Join Team</a>
									</Link>
								</li>
								<li className="mt-2">
									<Link href="https://www.paypal.com/paypalme/apsoltre">
										<a>Donate</a>
									</Link>
								</li>
								<li className="mt-2">
									<Link href="/contact">
										<a>Volunteer</a>
									</Link>
								</li>
							</ul>
						</div>
					</div>

					<div className="flex lg:flex-row SurfaceDuo:flex-row w-full iPhoneSE:pl-6 SurfaceDuo:pl-0">
						<div className="flex flex-col mt-12 w-full sm:flex-row md:flex-col lg:flex-row">
							<div className="pt-6 text-left w-full md:w-full">
								<p className="lg:w-full">
									<b>Sede legale</b>
								</p>
								<p className="lg:w-full">Via Dante Alighieri, 81</p>
								<p className="lg:w-full">18038 Sanremo(IM), Italia</p>
							</div>
							<div className="pt-6 text-left pb-12 lg:w-full md:w-1/2 sm:w-1/2">
								<p>
									<b>Codice Fiscale:</b> 900098410088
								</p>
								<p className="flex flex-wrap lg:w-full GalaxyFold:pr-2">
									<b>IBAN:</b> IT63E05018014600000016986952
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-row GalaxyFold:flex-col justify-between px-16 pb-10 items-center SurfaceDuo:flex-row">
				<p className="">Privacy Policy</p>
				<div className="flex GalaxyFold:space-x-3 space-x-5 items-center">
					<Link href="https://twitter.com/scambifestival">
						<a>
							<Twitter className="btn-primary" />
						</a>
					</Link>
					<Link href="https://www.facebook.com/cambisfestival/">
						<a>
							<Facebook className="btn-primary" />
						</a>
					</Link>
					<Link href="https://www.instagram.com/scambifestival/?hl=en">
						<a>
							<Instagram className="btn-primary" />
						</a>
					</Link>
					<Link href="https://pixelfed.uno/scambi">
						<a>
							<Pixelfed className="btn-primary" />
						</a>
					</Link>
					<Link href="https://peertube.uno/c/scambifestival/videos">
						<a>
							<Peertube className="btn-primary" />
						</a>
					</Link>
					<Link href="https://mastodon.uno/@scambi">
						<a>
							<Mastodon className="btn-primary" />
						</a>
					</Link>
				</div>
				<div
					className="p-2 rounded-full cursor-pointer GalaxyFold:hidden SurfaceDuo:block btn-primary"
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
					}}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 text-white"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M5 15l7-7 7 7"
						/>
					</svg>
				</div>
			</div>
		</footer>
	);
}
