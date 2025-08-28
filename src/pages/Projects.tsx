import React from 'react';
import { usePortfolioData } from '../contexts';
import { Project } from '../types/interfaces';
import ProjectCard from '../components/projects/ProjectCard';
import styles from './Projects.module.css';

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
    <section id='projects' className='section projects-section'>
      <div className='container'>
        <h2>My Projects</h2>
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
