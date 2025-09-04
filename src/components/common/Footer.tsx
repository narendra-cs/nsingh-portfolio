import React from 'react';
import ReactMarkdown from 'react-markdown';
import { usePortfolioData } from '../../contexts';
import shared from '../../styles/Shared.module.css';
import { navbarLinks } from './Constants';

const Footer: React.FC = () => {
  const portfolioStore = usePortfolioData();

  if (portfolioStore.isLoading || portfolioStore.error || !portfolioStore.portfolioData) {
    return null;
  }

  const { socialLinks } = portfolioStore.portfolioData.contactDetails;
  const { quotes = [] } = portfolioStore.portfolioData;
  const currentYear = new Date().getFullYear();

  // Get a quote based on the current date
  const getDailyQuote = () => {
    if (!quotes || quotes.length === 0) return null;
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
    );
    const quoteIndex = dayOfYear % quotes.length;
    return quotes[quoteIndex];
  };

  const dailyQuote = getDailyQuote();

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

          {/* Middle Section - Daily Quote */}
          <div className={`${shared.footerSection} ${shared.quoteSection}`}>
            {dailyQuote ? (
              <div className={shared.quoteContainer}>
                <blockquote className={shared.quoteBlock}>
                  <div className={shared.quoteIcon}>
                    <span className={shared.quoteMark}>&ldquo;</span>
                  </div>
                  <p className={shared.quoteText}>{dailyQuote.quote}</p>
                  {dailyQuote.author && (
                    <footer className={shared.quoteFooter}>
                      <cite className={shared.quoteAuthor}>
                        <ReactMarkdown components={{ p: 'span' }}>
                          {`— ${dailyQuote.author}`}
                        </ReactMarkdown>
                      </cite>
                    </footer>
                  )}
                </blockquote>
              </div>
            ) : (
              <div className={shared.quoteContainer}></div>
            )}
          </div>

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
