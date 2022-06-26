import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './home-page/Home'
import Contact from './contact-page/Contact';
import Careers from './careers-page/Careers';
import Blog from './blog-page/Blog';
import About from './about-page/About';
import MiniVents from './minivents-page/MiniVents';
import Labs from './labs-page/Labs';
import FAQ from './faq-page/FAQ';
import FilmContest from './filmcontest-page/FilmContest';
import Volunteer from './volunteer-page/Volunteer';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />
        <Route path="minivents" element={<MiniVents />} />
        <Route path="labs" element={<Labs />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="careers" element={<Careers />} />
        <Route path="filmcontest" element={<FilmContest />} />
        <Route path="volunteer" element={<Volunteer />} />
      </Routes>
      {/* <Home />
      <Contact />
      <About />
      <Blog />
      <MiniVents />
      <Labs />
      <FAQ />
      <Careers />
      <FilmContest /> */}
    </div>
  );
}

export default App;
