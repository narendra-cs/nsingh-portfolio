import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import styles from '../../styles/Navbar.module.css';
import { navbarLinks } from './Constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState({}, '', `${window.location.pathname}${href}`);
    }
    closeMenu();
  };

  // Filter out the Home link since it's already in the logo
  const navLinks = navbarLinks.navbar_links.filter((link) => link.name !== 'Home');

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a
          href='#home'
          className={styles.logo}
          onClick={(e) => scrollToSection(e, '#home')}
          aria-label='Home'
        >
          Narendra Singh
        </a>

        <div className={styles.navRight}>
          <div className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${location.hash === link.href ? styles.active : ''}`}
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.icon && <i className={`${link.icon} ${styles.navIcon}`}></i>}
                <span>{link.name}</span>
              </a>
            ))}
            <a
              href='/resume.pdf'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.resumeButton}
            >
              <i className='fa-solid fa-file-pdf'></i>
              <span>Resume</span>
            </a>
            <div className={styles.themeToggleContainer}>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type='button'
            className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}
            onClick={toggleMenu}
            aria-label='Toggle menu'
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
