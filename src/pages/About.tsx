import React, { useState, useMemo } from 'react';
import { usePortfolioData } from '../contexts';
import styles from '../styles/About.module.css';
import sharedStyles from '../styles/Shared.module.css';
import SkillFilters from '../components/skills/SkillFilters';
import SkillIcon from '../components/skills/SkillIcon'; // Updated import path

const About: React.FC = () => {
  const portfolioStore = usePortfolioData();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Get all unique categories from skills
  const allCategories = useMemo(() => {
    if (!portfolioStore.portfolioData) return [];
    const categories = new Set<string>();
    portfolioStore.portfolioData.skills.forEach((skill) => {
      skill.category.forEach((cat) => {
        if (cat) categories.add(cat);
      });
    });
    return Array.from(categories).sort();
  }, [portfolioStore.portfolioData]);

  // Filter skills based on selected categories
  const filteredSkills = useMemo(() => {
    if (!portfolioStore.portfolioData) return [];
    if (selectedCategories.length === 0) {
      return portfolioStore.portfolioData.skills;
    }
    return portfolioStore.portfolioData.skills.filter((skill) =>
      skill.category.some((cat) => selectedCategories.includes(cat))
    );
  }, [portfolioStore.portfolioData, selectedCategories]);

  if (portfolioStore.isLoading) {
    return <div>Loading...</div>;
  }

  if (portfolioStore.error) {
    return <div>Error: {portfolioStore.error}</div>;
  }

  if (!portfolioStore.portfolioData) {
    return <div>No portfolio data available</div>;
  }

  const handleCategoryToggle = (category: string) => {
    if (category === 'all') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) => {
        if (prev.includes(category)) {
          return prev.filter((c) => c !== category);
        } else {
          return [...prev, category];
        }
      });
    }
  };

  return (
    <section id='about' className={sharedStyles.section}>
      <div className={sharedStyles.sectionContent}>
        <h2 className={sharedStyles.sectionHeading}>About Me</h2>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            {portfolioStore.portfolioData.about.length > 0 ? (
              portfolioStore.portfolioData.about.map((about, index) => (
                <p key={index}>
                  {index === 0 ? 'Hello! ' : ''} {about}
                </p>
              ))
            ) : (
              <p>Hello! Welcome to my portfolio.</p>
            )}
          </div>
          <div className={styles.skills}>
            <h3>Skills</h3>
            <SkillFilters
              categories={allCategories}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
            />
            <div className={styles.skillsDivider}></div>
            <div className={styles.skillsGrid}>
              {filteredSkills.length > 0 ? (
                filteredSkills.map((skill, index) => (
                  <div key={`${skill.name}-${index}`} className={styles.skillTag}>
                    {skill.icon.startsWith('svg') ? (
                      <SkillIcon
                        icon={skill.icon}
                        className={styles.skillIcon}
                        title={skill.name}
                      />
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
        </div>
      </div>
    </section>
  );
};

export default About;
