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
    // Set initial scroll state
    const handleInitialScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Call once on mount
    handleInitialScroll();

    // Throttle scroll event for better performance
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      // Update state only if scroll position changed significantly
      if (Math.abs(currentScrollY - lastScrollY) > 1) {
        setIsScrolled(currentScrollY > 10);
        lastScrollY = currentScrollY;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    // Use both scroll and wheel events for better cross-browser support
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
    };
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
      // Close mobile menu if open
      if (isMenuOpen) {
        closeMenu();
      }

      // Smooth scroll to section with offset for fixed header
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - 80, // 80px offset for header height
        behavior: 'smooth',
      });

      // Update URL without page reload
      window.history.pushState({}, '', `${window.location.pathname}${href}`);
    }
  };

  // Filter out the Home link since it's already in the logo
  const navLinks = navbarLinks.navbar_links.filter((link) => link.name !== 'Home');

  return (
    <nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${isMenuOpen ? styles.menuOpen : ''}`}
      style={
        {
          '--scroll-position': isScrolled ? 1 : 0,
        } as React.CSSProperties
      }
    >
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
          <div
            className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}
            aria-hidden={!isMenuOpen && window.innerWidth < 768}
          >
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
