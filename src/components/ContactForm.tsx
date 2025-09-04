import React, { useState } from 'react';
import styles from '../styles/ContactForm.module.css';

interface ContactFormProps {
  onSubmit: (formData: { name: string; email: string; message: string }) => void;
  status: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, status }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        onSubmit(formData);
        console.log('Form submitted:', formData);
        setFormData({ name: '', email: '', message: '' });
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <div className={styles.inputWrapper}>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className={`${styles.formControl} ${errors.name ? styles.error : ''}`}
            disabled={isSubmitting}
            placeholder='Enter your name'
          />
          <label htmlFor='name' className={styles.floatingLabel}>
            Name
          </label>
        </div>
        {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
      </div>

      <div className={styles.formGroup}>
        <div className={styles.inputWrapper}>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className={`${styles.formControl} ${errors.email ? styles.error : ''}`}
            disabled={isSubmitting}
            placeholder='your.email@example.com'
          />
          <label htmlFor='email' className={styles.floatingLabel}>
            Email
          </label>
        </div>
        {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
      </div>

      <div className={styles.formGroup}>
        <div className={styles.inputWrapper}>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`${styles.formControl} ${styles.textarea} ${errors.message ? styles.error : ''}`}
            disabled={isSubmitting}
            placeholder='Type your message here...'
          ></textarea>
          <label htmlFor='message' className={styles.floatingLabel}>
            Message
          </label>
        </div>
        {errors.message && <span className={styles.errorMessage}>{errors.message}</span>}
      </div>

      <div className={styles.buttonContainer}>
        <button type='submit' className={styles.submitBtn} disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>

      {status && <div className={styles.statusMessage}>{status}</div>}
    </form>
  );
};

export default ContactForm;
