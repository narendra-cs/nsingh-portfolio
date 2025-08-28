import { createContext } from 'react';
import { portfolioDataStore } from '../store/PortfolioDataStore';
import { ThemeContextType } from '../types/interfaces';

export const PortfolioDataContext = createContext(portfolioDataStore);

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
