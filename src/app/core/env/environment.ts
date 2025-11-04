import { Environment } from "../models/environment.model";

export const environment: Environment = {
    production: false,
    titleBase: 'Pedro Arnedo',
    introText: 'BIENVENIDOS A MI PORTAFOLIO',
    profile: {
        name: 'PEDRO DAVID ARNEDO ROMERO',
        role: [
            'Full Stack Developer',
            'Software Engineer',
            'Frontend & Backend Developer',
            'Rest API Architect',
            'SQL Database Administrator'
        ],
        photo: 'assets/foto.png',
        images: [
            'assets/img1.jpeg',
            'assets/foto1.png',
        ],
        links: {
            linkedin: 'https://www.linkedin.com/in/pedro-arnedo',
            github: 'https://github.com/pedro-arnedo',
            cv: 'https://docs.google.com/document/d/1L89BTuDOXz9rT158ONChy7zvl-07KrcW/edit?usp=sharing',
            email: 'pedrodavidarnedoromero@gmail.com'
        }
    },
    navLinks: [
        { label: 'Inicio', targetId: 'home' },
        { label: 'Perfil', targetId: 'about' },
        { label: 'Trayectoria', targetId: 'experience' },
        { label: 'Proyectos', targetId: 'projects' },
        { label: 'Servicios', targetId: 'service' },
        { label: 'Tecnologías', targetId: 'stack' },
        { label: 'Contacto', targetId: 'contact' }
    ],
};