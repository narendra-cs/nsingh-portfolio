import React from 'react';
import { usePortfolioData } from '../contexts';
import { scrollToSection } from '../utils/scrollUtils';
import styles from '../styles/Home.module.css';
import shared from '../styles/Shared.module.css';
import ReactMarkdown from 'react-markdown';

const Home: React.FC = () => {
  const portfolioStore = usePortfolioData();
  const title = portfolioStore.portfolioData?.title ?? '';
  const name = portfolioStore.portfolioData?.name ?? '';
  const imageUrl = portfolioStore.portfolioData?.imageUrl ?? '';

  return (
    <section id='home' className={styles.homeSection}>
      <div className={shared.container}>
        <div className={shared.content}>
          <h1 className={shared.title}>
            Hi, I'm <span className={shared.highlight}>{name}</span>
          </h1>
          <h2 className={shared.subtitle}>{title && <>{title} & </>}Tech Enthusiast</h2>
          <div className={shared.markdownContainer}>
            <ReactMarkdown
              components={{
                strong: ({ ...props }) => <strong className={shared.highlight} {...props} />,
              }}
            >
              I build **data solutions** and create meaningful user experiences through **code**.
            </ReactMarkdown>
          </div>
          <div className={shared.ctaButtons}>
            <a
              href='#about'
              className={`${shared.button} ${shared.primary}`}
              onClick={(e) => scrollToSection(e, '#about')}
            >
              Learn More
            </a>
            <a
              href='#contact'
              className={`${shared.button} ${shared.secondary}`}
              onClick={(e) => scrollToSection(e, '#contact')}
            >
              Contact Me
            </a>
          </div>
        </div>
        {imageUrl && (
          <div className={styles.imageContainer}>
            <img
              src={imageUrl}
              alt={name}
              className={styles.profileImage}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
