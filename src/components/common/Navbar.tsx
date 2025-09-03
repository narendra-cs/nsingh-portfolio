import React, { useState, useEffect, useRef, useCallback } from 'react';
import { scrollToSection } from '../../utils/scrollUtils';
import { FaTimes, FaBars } from 'react-icons/fa';
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
  const navRef = useRef<HTMLElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if navigation links fit in the container
  const checkNavFit = useCallback(() => {
    if (!containerRef.current || !navLinksRef.current) return;
  }, []);

  const handleScroll = useCallback(() => {
    // Update scroll state
    setIsScrolled(window.scrollY > 10);

    // Find which section is currently in view
    const sections = document.querySelectorAll('section[id]');
    let currentSection = 'home';

    sections.forEach((section) => {
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
    setIsMenuOpen((prev) => {
      document.body.style.overflow = !prev ? 'hidden' : '';
      return !prev;
    });
  }, []);

  const closeMenu = useCallback((): void => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  const handleScrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
      // Close mobile menu if open
      if (isMenuOpen) {
        closeMenu();
        // Small delay to ensure menu is closed before scrolling
        setTimeout(() => {
          scrollToSection(e, href);
        }, 50);
      } else {
        scrollToSection(e, href);
      }
    },
    [isMenuOpen, closeMenu]
  );

  // Filter out the Home link since it's already in the logo
  const navLinks: NavLink[] = navbarLinks.navbar_links
    .filter((link) => link.name !== 'Home')
    .map((link) => ({
      ...link,
      isActive: activeSection === link.href.substring(1), // Remove '#' for comparison
    }));

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${
          isMenuOpen ? styles.menuOpen : ''
        }`}
      >
        <div className={styles.container} ref={containerRef}>
          <a
            href='#home'
            className={styles.logo}
            onClick={(e) => {
              handleScrollToSection(e, '#home');
              setIsMenuOpen(false);
            }}
            aria-label='Home'
          >
            NS
          </a>

          <div
            ref={navLinksRef}
            className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}
            id='main-navigation'
            aria-hidden={!isMenuOpen}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`${styles.navLink} ${
                  activeSection === link.href.substring(1) ? styles.active : ''
                }`}
                onClick={(e) => {
                  handleScrollToSection(e, link.href);
                  setIsMenuOpen(false);
                }}
                tabIndex={isMenuOpen ? 0 : -1}
              >
                {link.icon && <i className={`${link.icon} ${styles.navIcon}`}></i>}
                <span>{link.name}</span>
              </a>
            ))}
            <div className={styles.themeToggleContainer}>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type='button'
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls='main-navigation'
          >
            {isMenuOpen ? (
              <FaTimes className={styles.closeIcon} />
            ) : (
              <FaBars className={styles.hamburgerIcon} />
            )}
          </button>
        </div>
      </nav>
      {isMenuOpen && <div className={styles.menuOverlay} onClick={toggleMenu} />}
    </>
  );
};

export default Navbar;
