import { NavLink } from '../../types/interfaces';
import { Home } from '../../pages';

export const navbarLinks = {
  navbar_links: [
    { name: 'Home', href: '#home', icon: 'fa-solid fa-house', component: Home },
  ] as NavLink[],
};
