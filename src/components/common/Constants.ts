import { NavLink } from '../../types/interfaces';
import { Home, About, Projects, Contact } from '../../pages';
import Experiences from '../experience/Experiences';

export const navbarLinks = {
  navbar_links: [
    { name: 'Home', href: '#home', icon: 'fa-solid fa-house', component: Home },
    { name: 'About', href: '#about', icon: 'fa-solid fa-user', component: About },
    { name: 'Experience', href: '#experience', icon: 'fa-solid fa-briefcase', component: Experiences },
    { name: 'Projects', href: '#projects', icon: 'fa-solid fa-code', component: Projects },
    { name: 'Contact', href: '#contact', icon: 'fa-solid fa-envelope', component: Contact },
  ] as NavLink[],
};
