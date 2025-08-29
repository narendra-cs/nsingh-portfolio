import React, { useCallback } from 'react';
import { usePortfolioData } from '../contexts';
import styles from '../styles/Home.module.css';
import shared from '../styles/Shared.module.css';
import ReactMarkdown from 'react-markdown';

const Home: React.FC = () => {
  const portfolioStore = usePortfolioData();
  const title = portfolioStore.portfolioData?.title ?? '';
  const name = portfolioStore.portfolioData?.name ?? '';
  const imageUrl = portfolioStore.portfolioData?.imageUrl ?? '';

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        // Calculate the header height dynamically
        const header = document.querySelector('header') ?? document.querySelector('nav');
        const headerHeight = header?.getBoundingClientRect().height ?? 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        // Smooth scroll to section with dynamic offset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        // Update URL without page reload
        window.history.pushState({}, '', `${window.location.pathname}${href}`);
      }
    },
    []
  );

  return (
    <section id='home' className={`${styles.homeSection} ${shared.section}`}>
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
