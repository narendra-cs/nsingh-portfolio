export interface NavLink {
  name: string;
  href: string;
  icon?: string;
  component: React.FC;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface PortfolioData {
  name: string;
  title: string;
  imageUrl: string;
  about: string[];
  skills: Skill[];
  projects: Project[];
  contactDetails: ContactDetails;
  professionalExperience: Experience[];
  certifications: Certification[];
  testimonials: Testimonial[];
}

export interface Skill {
  name: string;
  category: string[];
  icon: string;
}

export interface Project {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactDetails {
  message: string;
  socialLinks: SocialLink[];
}

export interface Experience {
  title: string;
  company: string;
  companyUrl: string;
  companyLogo: string;
  startDate: string;
  endDate: string | null;
  location: string;
  description: string;
  technologies: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  issuedOn: string;
  expiresOn: string;
  credentialUrl: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  position: string;
  company: string;
  quote: string;
  linkedinUrl: string;
}
