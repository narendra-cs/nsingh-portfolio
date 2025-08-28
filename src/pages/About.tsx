import React from 'react';
import { usePortfolioData } from '../contexts';

const About: React.FC = () => {
  const portfolioStore = usePortfolioData();

  if (portfolioStore.isLoading) {
    return <div>Loading...</div>;
  }

  if (portfolioStore.error) {
    return <div>Error: {portfolioStore.error}</div>;
  }

  if (!portfolioStore.portfolioData) {
    return <div>No portfolio data available</div>;
  }

  return (
    <section id='about' className='section about-section'>
      <div className='container'>
        <h2>About Me</h2>
        <div className='about-content'>
          <div className='about-text'>
            {portfolioStore.portfolioData.about.length > 0 ? (
              portfolioStore.portfolioData.about.map((about, index) => (
                <p key={index}>
                  {index === 0 ? 'Hello! ' : ''} {about}
                </p>
              ))
            ) : (
              <p>Hello! Welcome to my portfolio.</p>
            )}
          </div>
          <div className='skills'>
            <h3>Skills & Technologies</h3>
            <div className='skills-grid'>
              {portfolioStore.portfolioData.skills.map((skill, index) => (
                <div key={index} className='skill-tag'>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
