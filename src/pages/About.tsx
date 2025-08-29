import React, { useState, useMemo } from 'react';
import { usePortfolioData } from '../contexts';
import { Skill } from '../types/interfaces';
import styles from '../styles/About.module.css';
import shared from '../styles/Shared.module.css';
import SkillFilters from '../components/SkillFilters';
import Certifications from '../components/Certifications';
import Icon from '../components/common/Icon';
import ReactMarkdown from 'react-markdown';

const About: React.FC = () => {
  const portfolioStore = usePortfolioData();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { portfolioData, isLoading } = portfolioStore;

  const allCategories = useMemo(() => {
    if (!portfolioData?.skills) return [];
    return Array.from(
      new Set(portfolioData.skills.flatMap((skill: Skill) => skill.category).filter(Boolean))
    );
  }, [portfolioData?.skills]);

  const filteredSkills = useMemo(() => {
    if (!portfolioData?.skills) return [];
    if (selectedCategories.length === 0) {
      return portfolioData.skills;
    }
    return portfolioData.skills.filter((skill: Skill) =>
      skill.category.some((category: string) => selectedCategories.includes(category))
    );
  }, [portfolioData?.skills, selectedCategories]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!portfolioData) {
    return <div>No portfolio data available</div>;
  }

  const { about, skills } = portfolioData;

  const handleCategoryToggle = (category: string) => {
    if (category === 'all') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev: string[]) => {
        if (prev.includes(category)) {
          return prev.filter((c: string) => c !== category);
        } else {
          return [...prev, category];
        }
      });
    }
  };

  return (
    <section id='about' className={shared.section}>
      <div className={shared.sectionContent}>
        <h2 className={shared.sectionHeading}>About Me</h2>
        <div className={`${shared.content} ${styles.aboutContent}`}>
          <div className={styles.aboutText}>
            {about.length > 0 ? (
              about.map((paragraph: string, idx: number) => (
                <div key={idx} className={shared.markdownContainer}>
                  <ReactMarkdown
                    components={{
                      strong: ({ ...props }) => <strong className={shared.highlight} {...props} />,
                    }}
                  >
                    {paragraph}
                  </ReactMarkdown>
                </div>
              ))
            ) : (
              <p>Hello! Welcome to my portfolio.</p>
            )}
          </div>
          <div className={styles.skills}>
            {skills.length > 0 && (
              <>
                <h3 className={shared.sectionSubHeading}>Skills</h3>
                <SkillFilters
                  categories={allCategories}
                  selectedCategories={selectedCategories}
                  onCategoryToggle={handleCategoryToggle}
                />
                <div className={styles.skillsDivider}></div>
              </>
            )}
            <div className={`${shared.grid} ${styles.skillsGrid}`}>
              {filteredSkills.length > 0 ? (
                filteredSkills.map((skill: Skill, index: number) => (
                  <div key={`${skill.name}-${index}`} className={styles.skillTag}>
                    {skill.icon.startsWith('svg') ? (
                      <Icon icon={skill.icon} className={styles.skillIcon} />
                    ) : (
                      <i className={skill.icon} />
                    )}
                    {skill.name}
                  </div>
                ))
              ) : (
                <p className={styles.noSkills}>No skills match the selected filters.</p>
              )}
            </div>
          </div>

          {/* Certifications Section */}
          <Certifications certifications={portfolioData.certifications} />
        </div>
      </div>
    </section>
  );
};

export default About;
