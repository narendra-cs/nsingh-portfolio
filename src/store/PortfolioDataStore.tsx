import { makeAutoObservable, runInAction } from 'mobx';
import { PortfolioData } from '../types/interfaces';

// Add this type for the dynamic import
interface PortfolioDataModule {
  default: PortfolioData;
}

class PortfolioDataStore {
  portfolioData: PortfolioData | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadPortfolioData = async (fileName: string) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      // Dynamic import of the JSON file
      const data: PortfolioDataModule = (await import(
        `../assets/data/${fileName}.json`
      )) as PortfolioDataModule;
      runInAction(() => {
        this.portfolioData = data.default;
      });
    } catch (err) {
      console.error('Failed to load portfolio data:', err);
      runInAction(() => {
        this.error = 'Failed to load portfolio data';
        this.portfolioData = null;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  // Getter for portfolio data
  get data() {
    return this.portfolioData;
  }

  // Getter for loading state
  get loading() {
    return this.isLoading;
  }

  // Getter for error state
  get hasError() {
    return this.error;
  }
}

// Create a singleton instance
export const portfolioDataStore = new PortfolioDataStore();
