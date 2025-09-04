import { use } from 'react';
import { PortfolioDataContext, ThemeContext } from './Context';

export const usePortfolioData = () => {
  return use(PortfolioDataContext);
};

export const useTheme = () => {
  const context = use(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
