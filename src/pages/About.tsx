import React from 'react';
import ReactMarkdown from 'react-markdown';
import { usePortfolioData } from '../contexts';
import styles from '../styles/About.module.css';
import shared from '../styles/Shared.module.css';
import Certifications from '../components/Certifications';
import Skills from '../components/Skills';

const About: React.FC = () => {
  const portfolioStore = usePortfolioData();

  const { portfolioData, isLoading } = portfolioStore;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!portfolioData) {
    return <div>No portfolio data available</div>;
  }

  const { about, skills } = portfolioData;

  return (
    <section id='about' className={shared.section}>
      <div className={shared.sectionContent}>
        <h2 className={shared.sectionHeading}>About Me</h2>
        <div className={`${shared.content} ${styles.aboutContent}`}>
          <div className={styles.aboutText}>
            {about.length > 0 ? (
              about.map((paragraph: string, idx: number) => (
                <div key={idx} className={shared.markdownContainer}>
                  <ReactMarkdown
                    components={{
                      strong: ({ ...props }) => <strong className={shared.highlight} {...props} />,
                    }}
                  >
                    {paragraph}
                  </ReactMarkdown>
                </div>
              ))
            ) : (
              <p>Hello! Welcome to my portfolio.</p>
            )}
          </div>
          {/* Skills Section */}
          <Skills skills={skills} />

          {/* Certifications Section */}
          <Certifications certifications={portfolioData.certifications} />
        </div>
      </div>
    </section>
  );
};

export default About;
