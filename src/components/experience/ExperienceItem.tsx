import React from 'react';
import styles from './ExperienceItem.module.css';
import { Experience } from '../../types/interfaces';

interface ExperienceItemProps{
  experience: Experience;
  isLast: boolean;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  experience,
  isLast,
}) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className={`${styles.experienceItem} ${!isLast ? styles.withTimeline : ''}`}>
      {isLast && <div className={styles.timelineLineTop} />}
      <div className={styles.timelineDot} />
      {!isLast && <div className={styles.timelineLine} />}
      
      <div className={styles.experienceContent}>
        <h3 className={styles.jobTitle}>{experience.title}</h3>
        <div className={styles.companyInfo}>
          <div className={styles.companyDetails}>
            <span className={styles.companyName}>{experience.company}</span>
            <span className={styles.location}>
              <i className="fas fa-map-marker-alt"></i> {experience.location}
            </span>
            <span className={styles.duration}>
              {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
            </span>
          </div>
        </div>
        <p className={styles.description}>{experience.description}</p>
        {experience.technologies.length > 0 && (
          <div className={styles.technologies}>
            {experience.technologies.map((tech, index) => (
              <span key={index} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceItem;
