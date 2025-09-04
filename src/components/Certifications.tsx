import { observer } from 'mobx-react-lite';
import { useState, useRef } from 'react';
import { Certification } from '../types/interfaces';
import shared from '../styles/Shared.module.css';
import styles from '../styles/Certifications.module.css';
import Icon from './common/Icon';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
};

interface Props {
  certifications: Certification[];
}

const Certifications: React.FC<Props> = observer(({ certifications }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate the certifications to create a seamless loop
  const duplicatedCertifications = [...certifications, ...certifications];

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <div className={styles.certifications}>
      <h3 className={shared.sectionSubHeading}>Certifications</h3>
      <div className={styles.certificationsContainer}>
        <div
          className={`${styles.certificationsTrack} ${isPaused ? styles.paused : ''}`}
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {duplicatedCertifications.map((cert: Certification, index: number) => (
            <div key={`${cert.name}-${index}`} className={styles.certificationCard}>
              <div className={styles.certificationIcon}>
                {cert.icon.startsWith('svg') ? (
                  <Icon icon={cert.icon} className={styles.certIcon} />
                ) : (
                  <i className={`${cert.icon} ${styles.certIcon}`} />
                )}
              </div>
              <div className={styles.certificationDetails}>
                <h4 className={styles.certificationName}>{cert.name}</h4>
                <div className={styles.dateRange}>
                  {formatDate(cert.issuedOn)}{' '}
                  {cert.expiresOn ? ` - ${formatDate(cert.expiresOn)}` : ''}
                </div>
                {cert.credentialUrl.replace('#', '') !== '' && (
                  <a
                    href={cert.credentialUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.viewCertificate}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Credential
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Certifications;
