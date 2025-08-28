import React from 'react';
import { usePortfolioData } from '../contexts';

const Home: React.FC = () => {
  const portfolioStore = usePortfolioData();
  const title = portfolioStore.portfolioData?.title ?? '';

  return (
    <section id='home' className='section home-section'>
      <div className='container'>
        <h1>Welcome to My Portfolio</h1>
        <p className='subtitle'> {title ? title + ' & ' : ''}Tech Enthusiast</p>
        <div className='cta-buttons'>
          <a href='#about' className='btn btn-primary'>
            Learn More
          </a>
          <a href='#contact' className='btn btn-secondary'>
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
