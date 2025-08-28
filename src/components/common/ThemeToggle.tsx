import React from 'react';
import { useTheme } from '../../contexts/';
import styles from '../../styles/ThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type='button'
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className={`${styles.icon} ${theme === 'dark' ? styles.moon : styles.sun}`}>
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
      <span className={styles.tooltip}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
    </button>
  );
};

export default ThemeToggle;
