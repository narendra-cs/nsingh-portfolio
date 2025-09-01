import React from 'react';
import { usePortfolioData } from '../../contexts';
import shared from '../../styles/Shared.module.css';
import { navbarLinks } from './Constants';

const Footer: React.FC = () => {
  const portfolioStore = usePortfolioData();

  if (portfolioStore.isLoading || portfolioStore.error || !portfolioStore.portfolioData) {
    return null;
  }

  const { socialLinks } = portfolioStore.portfolioData.contactDetails;
  const currentYear = new Date().getFullYear();

  return (
    <footer className={shared.footer}>
      <div className={shared.footerContainer}>
        <div className={shared.footerSections}>
          {/* Left Section - Quick Links */}
          <div className={shared.footerSection}>
            <h3 className={shared.footerHeading}>Quick Links</h3>
            <ul className={shared.footerLinks}>
              {navbarLinks.navbar_links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className={shared.footerLink}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle Section - Empty */}
          <div className={shared.footerSection}>{/* Empty section as per requirement */}</div>

          {/* Right Section - Social Links */}
          <div className={shared.footerSection}>
            <h3 className={shared.footerHeading}>Connect With Me</h3>
            <div className={shared.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={shared.socialLink}
                  aria-label={social.name}
                >
                  <i className={`${social.icon} ${shared.socialIcon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={shared.copyright}>
          &copy; {currentYear} Narendra Singh. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
