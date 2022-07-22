import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import Careers from './pages/careers/Careers';
// import Blog from './pages/blog/Blog';
import About from './pages/about/About';
import MiniEvents from './pages/minievents';
import Labs from './pages/labs/Labs';
import FAQ from './pages/faq/FAQ';
// import FilmContest from './pages/filmcontest/FilmContest';
import LabInfo from './pages/labs/LabInfo';
import OurTeam from './pages/ourTeam/OurTeam';
import PageLayout from './PageLayout';
import Volunteer from './pages/volunteer/Volunteer';
import SummerVolunteer from './pages/volunteer/SummerVolunteer';
import Team from './pages/ourTeam/Team'

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<PageLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='about' element={<About />} />
					<Route path='contact' element={<Contact />} />
					{/* <Route path='blog' element={<Blog />} /> */}
					<Route path='minievents' element={<MiniEvents />} />
					<Route path='labs'>
						<Route index element={<Labs />} />
						<Route path=':labId' element={<LabInfo />} />
					</Route>
					<Route path='faq' element={<FAQ />} />
					<Route path='careers' element={<Careers />} />
					<Route path="ourteam">
						<Route index element={<OurTeam />} />
						<Route path="team" element={<Team />} />
					</Route>
					<Route path='volunteer'>
						<Route index element={<Volunteer />} />
						<Route path='summer' element={<SummerVolunteer />} />
					</Route>
					{/* <Route path='filmcontest' element={<FilmContest />} /> */}
				</Route>
			</Routes>
		</div>
	);
}

export default App;
