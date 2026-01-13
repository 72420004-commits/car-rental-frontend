import React from 'react';
import Navbar from '../components/Navbar';
import WelcomeSection from '../components/WelcomeSection';
import Services from '../components/Services';
import Stats from '../components/Stats';
import CarsHome from '../components/CarsHome';
import BrandCarousel from '../components/BrandCarousel';
import Footer from '../components/Footer';
import Hero1 from '../components/Hero1';
import CarSlider from '../components/CarSlider';





function Home() {
  return (
    <>
      <Navbar />
      <div className='nav-spacer'></div>
      <br></br>
      <Hero1 />
      <CarSlider />

      <WelcomeSection />
      <Services />
      <Stats />
      <CarsHome />
      <BrandCarousel />
      <Footer />
    


    </>
  );
}

export default Home;