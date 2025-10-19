import { Profile } from './profile.model';
import { NavLink } from './navlink.model';
import { EmailJs } from './emailjs.model';

export interface Environment {
    production: boolean;
    titleBase: string;
    introText: string;
    profile: Profile;
    navLinks: NavLink[];
    emailService: EmailJs;
}