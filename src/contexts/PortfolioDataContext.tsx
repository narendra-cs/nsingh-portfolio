import { PortfolioDataContext } from './Context';
import { portfolioDataStore } from '../store/PortfolioDataStore';

export const PortfolioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <PortfolioDataContext value={portfolioDataStore}>{children}</PortfolioDataContext>;
};
