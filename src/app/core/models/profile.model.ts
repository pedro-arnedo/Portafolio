import { ProfileLinks } from './link.model';

export interface Profile {
    name: string;
    role: string[];
    photo: string;
    images?: string[]
    links: ProfileLinks;
}