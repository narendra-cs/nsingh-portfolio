import React, { useRef, useState, useCallback, useMemo } from 'react';
import { Testimonial } from '../types/interfaces';
import styles from '../styles/Testimonials.module.css';
import shared from '../styles/Shared.module.css';
import { FaQuoteLeft, FaLinkedin } from 'react-icons/fa';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const EMPTY_TESTIMONIALS: Testimonial[] = [];

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials = EMPTY_TESTIMONIALS }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Event handlers
  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  // Calculate the scroll duration based on content length
  const getScrollDuration = useCallback(() => {
    if (!testimonials.length) return 40; // Default duration if no testimonials
    const itemWidth = 320; // Width of each testimonial card
    const gap = 32; // Gap between cards (2rem = 32px)
    const totalWidth = (testimonials.length * (itemWidth + gap)) / 2; // Half the total width for smoother loop
    return Math.max(30, Math.floor(totalWidth / 50)); // Adjust the divisor to control speed
  }, [testimonials.length]);

  const scrollDuration = useMemo(() => getScrollDuration(), [getScrollDuration]);

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = useMemo(() => [...testimonials, ...testimonials], [testimonials]);

  const hasTestimonials = testimonials && testimonials.length > 0;

  if (!hasTestimonials) {
    return null;
  }

  return (
    <div className={styles.testimonials}>
      <div className={styles.testimonialsWrapper}>
        <h3 className={shared.sectionHeading}>What People Say</h3>
        <div
          className={styles.testimonialsContainer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={trackRef}
            className={`${styles.testimonialsTrack} ${isPaused ? styles.paused : ''}`}
            style={{ '--scroll-duration': `${scrollDuration}s` } as React.CSSProperties}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={`${testimonial.name}-${index}`} className={styles.testimonialCard}>
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
      </div>
    </div>
  );
};

export default Testimonials;
