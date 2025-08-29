import React from 'react';
import { observer } from 'mobx-react-lite';
import { usePortfolioData } from '../../contexts';
import ExperienceItem from './ExperienceItem';
import styles from './Experiences.module.css';

const Experiences: React.FC = observer(() => {
  const { portfolioData } = usePortfolioData();

  if (!portfolioData?.professionalExperience?.length) {
    return null;
  }

  // Sort experiences by start date (newest first)
  const sortedExperiences = [...portfolioData.professionalExperience].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <section id="experience" className={styles.experienceSection}>
      <div className="container">
        <h2 className="section-heading">Professional Experience</h2>
        <div className={styles.experienceList}>
          {sortedExperiences.map((exp, index) => {
            const isLast = index === sortedExperiences.length - 1;
            return (
              <ExperienceItem
                key={`${exp.company}-${exp.startDate}`}
                isLast={isLast}
                experience={exp}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default Experiences;
