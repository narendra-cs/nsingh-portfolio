import React from 'react';
import styles from '../../styles/About.module.css';

interface SkillFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
}

const SkillFilters: React.FC<SkillFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryToggle,
}) => {
  return (
    <div className={styles.skillFilters}>
      <div className={styles.filterCheckboxes}>
        <label
          className={`${styles.filterCheckbox} ${selectedCategories.length === 0 ? styles.active : ''}`}
        >
          <input
            type='checkbox'
            checked={selectedCategories.length === 0}
            onChange={() => onCategoryToggle('all')}
            className={styles.hiddenCheckbox}
          />
          <span className={styles.checkboxLabel}>All Skills</span>
        </label>

        {categories.map((category) => (
          <label
            key={category}
            className={`${styles.filterCheckbox} ${selectedCategories.includes(category) ? styles.active : ''}`}
          >
            <input
              type='checkbox'
              checked={selectedCategories.includes(category)}
              onChange={() => onCategoryToggle(category)}
              className={styles.hiddenCheckbox}
            />
            <span className={styles.checkboxLabel}>{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SkillFilters;
