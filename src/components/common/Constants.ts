import { NavLink } from '../../types/interfaces';
import { Home, About, Projects } from '../../pages';

export const navbarLinks = {
  navbar_links: [
    { name: 'Home', href: '#home', icon: 'fa-solid fa-house', component: Home },
    { name: 'About', href: '#about', icon: 'fa-solid fa-user', component: About },
    { name: 'Projects', href: '#projects', icon: 'fa-solid fa-briefcase', component: Projects },
  ] as NavLink[],
};
