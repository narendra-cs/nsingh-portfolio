import React, { useState } from 'react';
import { Project } from '../types/interfaces';
import shared from '../styles/Shared.module.css';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxDescriptionLength = 100;
  const maxTechnologies = 6;

  const toggleDescription = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const renderDescription = () => {
    if (isExpanded || !project.description) {
      return project.description;
    }

    if (project.description.length <= maxDescriptionLength) {
      return project.description;
    }

    return (
      <>
        {project.description.substring(0, maxDescriptionLength)}...
        <button
          type='button'
          onClick={toggleDescription}
          className={`${shared.button} ${shared.buttonLink}`}
          aria-label='Read more'
        >
          Read More
        </button>
      </>
    );
  };

  return (
    <div className={shared.card}>
      <div className={shared.cardImageContainer}>
        <img
          src={project.imageUrl || '/images/project-placeholder.jpg'}
          alt={project.title}
          className={shared.cardImage}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (project.imageUrl) {
              target.src = '/images/project-placeholder.jpg';
            } else {
              target.style.display = 'none';
            }
          }}
        />
      </div>
      <div className={shared.cardContent}>
        <h3 className={shared.cardTitle}>{project.title}</h3>
        <p className={shared.cardDescription}>
          {renderDescription()}
          {isExpanded && (
            <button
              type='button'
              onClick={toggleDescription}
              className={`${shared.button} ${shared.buttonLink}`}
              aria-label='Show less'
            >
              Show Less
            </button>
          )}
        </p>
        <div className={shared.technologies}>
          {project.technologies.slice(0, maxTechnologies).map((tech, index) => (
            <span key={index} className={shared.techTag}>
              {tech}
            </span>
          ))}
        </div>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target='_blank'
            rel='noopener noreferrer'
            className={`${shared.button} ${shared.primary}`}
            aria-label={`View ${project.title} on GitHub`}
          >
            <i className='fab fa-github' style={{ marginRight: '0.5rem' }}></i>
            View on GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
