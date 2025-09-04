import { useState, useMemo } from 'react';
import { Skill } from '../types/interfaces';
import styles from '../styles/Skills.module.css';
import shared from '../styles/Shared.module.css';
import SkillFilters from './SkillFilters';
import Icon from './common/Icon';

interface SkillProps {
  skills: Skill[];
}

const Skills: React.FC<SkillProps> = ({ skills }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const allCategories = useMemo(() => {
    if (!skills || skills.length === 0) return [];
    return Array.from(new Set(skills.flatMap((skill: Skill) => skill.category).filter(Boolean)));
  }, [skills]);

  const filteredSkills = useMemo(() => {
    if (!skills || skills.length === 0) return [];
    if (selectedCategories.length === 0) {
      return skills;
    }
    return skills.filter((skill: Skill) =>
      skill.category.some((category: string) => selectedCategories.includes(category))
    );
  }, [skills, selectedCategories]);

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

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
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
                <Icon icon={skill.icon} />
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
  );
};

export default Skills;
