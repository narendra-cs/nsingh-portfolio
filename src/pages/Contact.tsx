import React, { useState } from 'react';
import { usePortfolioData } from '../contexts';
import ContactForm from '../components/ContactForm';
import styles from '../styles/Contact.module.css';
import sharedStyles from '../styles/Shared.module.css';

const Contact: React.FC = () => {
  const portfolioStore = usePortfolioData();
  const [status, setStatus] = useState('');

  if (portfolioStore.isLoading) {
    return <div>Loading...</div>;
  }

  if (portfolioStore.error) {
    return <div>Error: {portfolioStore.error}</div>;
  }

  if (!portfolioStore.portfolioData) {
    return <div>No portfolio data available</div>;
  }

  const { contactDetails } = portfolioStore.portfolioData;
  const socialLinks = contactDetails.socialLinks;

  const handleFormSubmit = (formData: { name: string; email: string; message: string }) => {
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setStatus('Message sent successfully!');
    // Clear status message after 3 seconds
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <section id='contact' className={styles.contactSection}>
      <div className='container'>
        <h2 className={sharedStyles.sectionHeading}>Get In Touch</h2>
        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <p className={styles.contactMessage}>{contactDetails.message}</p>

            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.socialLink}
                  aria-label={social.name}
                >
                  <i className={`${social.icon} ${styles.socialIcon}`}></i>
                  {/* <span className={styles.socialName}>{social.name}</span> */}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.contactFormContainer}>
            <ContactForm onSubmit={handleFormSubmit} status={status} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
