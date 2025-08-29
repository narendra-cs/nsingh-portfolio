import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import styles from '../../styles/Navbar.module.css';
import { navbarLinks } from './Constants';

interface NavLink {
  name: string;
  href: string;
  icon?: string;
  isActive?: boolean;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if navigation links fit in the container
  const checkNavFit = useCallback(() => {
    if (!containerRef.current || !navLinksRef.current) return;
    
    const container = containerRef.current;
    const navLinks = navLinksRef.current;
    
    // Check if nav links overflow the container
    const containerWidth = container.offsetWidth;
    const navLinksWidth = Array.from(navLinks.children).reduce((width, child) => {
      return width + (child as HTMLElement).offsetWidth;
    }, 0);
    
    // Add some padding for the menu button
    const menuButtonWidth = 60; // Approximate width of menu button + margin
    const shouldShowMobileMenu = navLinksWidth > (containerWidth - menuButtonWidth);
    
    setIsMobileView(shouldShowMobileMenu || window.innerWidth <= 768);
  }, []);

  const handleScroll = useCallback(() => {
    // Update scroll state
    setIsScrolled(window.scrollY > 10);

    // Find which section is currently in view
    const sections = document.querySelectorAll('section[id]');
    let currentSection = 'home';
    
    sections.forEach(section => {
      const sectionElement = section as HTMLElement;
      const sectionTop = sectionElement.offsetTop - 100;
      const sectionHeight = sectionElement.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.id || 'home';
      }
    });
    
    setActiveSection(currentSection);
  }, []);

  // Handle scroll and update active section
  useEffect(() => {
    // Initial checks
    handleScroll();
    checkNavFit();

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkNavFit);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkNavFit);
    };
  }, [handleScroll, checkNavFit]);

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback((): void => {
    setIsMenuOpen(prev => {
      document.body.style.overflow = !prev ? 'hidden' : '';
      return !prev;
    });
  }, []);

  const closeMenu = useCallback((): void => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      // Close mobile menu if open
      if (isMenuOpen) {
        closeMenu();
      }

      // Smooth scroll to section with offset for fixed header
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: 'smooth',
      });

      // Update URL without page reload
      window.history.pushState({}, '', `${window.location.pathname}${href}`);
    }
  }, [isMenuOpen, closeMenu]);

  // Filter out the Home link since it's already in the logo
  const navLinks: NavLink[] = navbarLinks.navbar_links
    .filter((link) => link.name !== 'Home')
    .map(link => ({
      ...link,
      isActive: activeSection === link.href.substring(1) // Remove '#' for comparison
    }));

  return (
    <nav
      ref={navRef}
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${isMenuOpen ? styles.menuOpen : ''}`}
      style={{
        '--scroll-position': isScrolled ? 1 : 0,
      } as React.CSSProperties}
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

        <div className={styles.navRight} ref={containerRef}>
          <div
            ref={navLinksRef}
            className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''} ${
              isMobileView && !isMenuOpen ? styles.hidden : ''
            }`}
            aria-hidden={isMobileView && !isMenuOpen}
            role="menu"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${link.isActive ? styles.active : ''}`}
                onClick={(e) => {
                  scrollToSection(e, link.href);
                  setIsMenuOpen(false);
                }}
              >
                {link.icon && <i className={`${link.icon} ${styles.navIcon}`}></i>}
                <span>{link.name}</span>
              </a>
            ))}
            {/* <a
              href='/resume.pdf'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.resumeButton}
            >
              <i className='fa-solid fa-file-pdf'></i>
              <span>Resume</span>
            </a> */}
            <div className={styles.themeToggleContainer}>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          {(isMobileView || window.innerWidth <= 768) && (
            <button
              type='button'
              className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls='main-navigation'
            >
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
