import React from 'react';
import { usePortfolioData } from '../contexts';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  const portfolioStore = usePortfolioData();
  const title = portfolioStore.portfolioData?.title ?? '';
  const name = portfolioStore.portfolioData?.name ?? '';
  const imageUrl = portfolioStore.portfolioData?.imageUrl ?? '';

  return (
    <section id='home' className={styles.homeSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Hi, I'm <span className={styles.highlight}>{name}</span>
          </h1>
          <h2 className={styles.subtitle}>{title && <>{title} & </>}Tech Enthusiast</h2>
          <p className={styles.description}>
            I build data solutions and create meaningful user experiences through code.
          </p>
          <div className={styles.ctaButtons}>
            <a href='#about' className={`${styles.button} ${styles.primary}`}>
              Learn More
            </a>
            <a href='#contact' className={`${styles.button} ${styles.secondary}`}>
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
