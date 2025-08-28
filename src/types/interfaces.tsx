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
  about: string[];
  skills: string[];
  projects: Project[];
  contactDetails: ContactDetails;
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
