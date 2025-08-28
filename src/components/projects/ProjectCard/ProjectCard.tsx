import React, { useState } from 'react';
import { Project } from '../../../types/interfaces';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxDescriptionLength = 100;

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
          className={styles.readMoreButton}
          aria-label='Read more'
        >
          Read More
        </button>
      </>
    );
  };

  return (
    <div className={styles.card}>
      {project.imageUrl ? (
        <div className={styles.imageContainer}>
          <img
            src={project.imageUrl}
            alt={project.title}
            className={styles.projectImage}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/project-placeholder.jpg';
            }}
          />
        </div>
      ) : (
        <div className={styles.imageContainer}>
          <img
            src='/images/project-placeholder.jpg'
            alt={project.title}
            className={styles.projectImage}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>
          {renderDescription()}
          {isExpanded && (
            <button
              type='button'
              onClick={toggleDescription}
              className={styles.readMoreButton}
              aria-label='Show less'
            >
              Show Less
            </button>
          )}
        </p>
        <div className={styles.technologies}>
          {project.technologies.map((tech, index) => (
            <span key={index} className={styles.techTag}>
              {tech}
            </span>
          ))}
        </div>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.githubButton}
            aria-label={`View ${project.title} on GitHub`}
          >
            <i className='fab fa-github'></i>
            <span>View on GitHub</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
