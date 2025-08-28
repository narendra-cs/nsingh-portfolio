import React from 'react';
import { usePortfolioData } from '../contexts';
import { Project } from '../types/interfaces';

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
        <div className='projects-grid'>
          {projects.map((project) => (
            <div key={project.id} className='project-card'>
              <div className='project-content'>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className='project-technologies'>
                  {project.technologies.map((tech, index) => (
                    <span key={index} className='tech-tag'>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className='project-links'>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='btn btn-outline'
                    >
                      View Code
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='btn btn-primary'
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
