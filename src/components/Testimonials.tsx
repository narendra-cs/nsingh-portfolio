import React from 'react';
import { Testimonial } from '../types/interfaces';
import styles from '../styles/Testimonials.module.css';
import shared from '../styles/Shared.module.css';
import { FaQuoteLeft, FaLinkedin } from 'react-icons/fa';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className={styles.testimonials}>
      <h3 className={shared.sectionHeading}>What People Say</h3>
      <div className={styles.testimonialsGrid}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={styles.testimonialCard}>
            <div className={styles.quoteIcon}>
              <FaQuoteLeft />
            </div>
            <blockquote className={styles.quote}>{testimonial.quote}</blockquote>
            <div className={styles.author}>
              <div className={styles.authorInfo}>
                <h4 className={styles.authorName}>{testimonial.name}</h4>
                <p className={styles.authorTitle}>
                  {testimonial.position}
                  {testimonial.company && `, ${testimonial.company}`}
                </p>
              </div>
              {testimonial.linkedinUrl && (
                <a
                  href={testimonial.linkedinUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.linkedinIcon}
                  aria-label={`${testimonial.name}'s LinkedIn Profile`}
                >
                  <FaLinkedin />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
