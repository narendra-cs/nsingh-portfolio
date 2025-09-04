import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { navbarLinks } from './components/common/Constants';
import { usePortfolioData } from './contexts/';
import { PortfolioDataProvider } from './contexts/PortfolioDataContext';
import './styles/App.css';

const AppContent: React.FC = observer(() => {
  const portfolioStore = usePortfolioData();

  useEffect(() => {
    const loadData = async () => {
      try {
        await portfolioStore.loadPortfolioData('narendra_singh');
      } catch (error) {
        console.error('Failed to load portfolio data:', error);
      }
    };

    void loadData();
  }, [portfolioStore]);

  if (portfolioStore.loading) {
    return (
      <div className='loader-container'>
        <div className='loader'></div>
        <p>Loading portfolio...</p>
      </div>
    );
  }

  if (portfolioStore.error) {
    return (
      <div className='error-container'>
        <p>Error: {portfolioStore.error}</p>
      </div>
    );
  }

  return (
    <div className='app' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main className='main-content' style={{ flex: 1 }}>
        {navbarLinks.navbar_links.map((link) => (
          <link.component key={link.name} />
        ))}
      </main>
      <Footer />
    </div>
  );
});

function App() {
  return (
    <Router>
      <PortfolioDataProvider>
        <AppContent />
      </PortfolioDataProvider>
    </Router>
  );
}

export default App;
