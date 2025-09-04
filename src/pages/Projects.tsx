import React from 'react';
import { usePortfolioData } from '../contexts';
import { Project } from '../types/interfaces';
import ProjectCard from '../components/ProjectCard';
import Testimonials from '../components/Testimonials';
import styles from '../styles/Projects.module.css';
import shared from '../styles/Shared.module.css';

const Projects: React.FC = () => {
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

  const projects: Project[] = portfolioStore.portfolioData.projects;

  return (
    <>
      <section id='projects' className={shared.section}>
        <div className={shared.sectionContent}>
          <h2 className={shared.sectionHeading}>My Projects</h2>
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {portfolioStore.portfolioData.testimonials &&
            portfolioStore.portfolioData.testimonials.length > 0 && (
              <Testimonials testimonials={portfolioStore.portfolioData.testimonials} />
            )}
        </div>
      </section>
    </>
  );
};

export default Projects;
