import { TimelineItem } from '../models/timeline.model';

export const timeline: TimelineItem[] = [
    {
        type: 'work',
        title: 'Full Stack Developer Junior',
        entity: 'SBX Technologies · Canadá (Remoto)',
        date: 'Dic 2023 – Jun 2025',
        description: 'Desarrollé una aplicación web interna integrada con Salesforce (Angular / Node.js / PostgreSQL) bajo arquitectura Clean, optimizando procesos y acceso a datos para el equipo técnico.',
        tags: ['Angular', 'Node.js', 'PostgreSQL', 'Salesforce', 'REST APIs', 'Clean Architecture'],
        icon: 'fa fa-briefcase'
    },
    {
        type: 'work',
        title: 'Desarrollador de Contenido Educativo Digital',
        entity: 'UPARSISTEM · Valledupar, Colombia',
        date: 'Oct 2023 – Dic 2023',
        description: 'Diseñé y desarrollé módulos interactivos para Moodle, mejorando la usabilidad y presentación de materiales educativos digitales.',
        tags: ['Moodle', 'Canva Pro', 'Diseño instruccional'],
        icon: 'fa fa-briefcase'
    },
    {
        type: 'work',
        title: 'Full Stack Developer Trainee',
        entity: 'Universidad Popular del Cesar · Valledupar, Colombia',
        date: 'Sept 2022 – Abr 2023',
        description: 'Desarrollé un sistema de información web para digitalizar procesos administrativos. Implementé autenticación institucional y roles bajo arquitectura MVC N-Layer.',
        tags: ['Angular', '.NET Core', 'MySQL', 'MVC', 'Repository Pattern'],
        icon: 'fa fa-briefcase'
    },
    {
        type: 'education',
        title: 'Ingeniería de Sistemas',
        entity: 'Universidad Popular del Cesar',
        date: 'Febrero 2017 – Junio 2023',
        description: 'Formación profesional en ingeniería de software, arquitectura, bases de datos, redes y gestión de proyectos. Trabajo de grado orientado al desarrollo de sistemas web institucionales.',
        tags: ['Software', 'Arquitectura', 'Gestión de proyectos', 'Desarrollo Web'],
        icon: 'fa fa-graduation-cap'
    },
    {
        type: 'cert',
        title: 'Python Essentials',
        entity: 'Cisco Networking Academy',
        date: 'Mayo 2023',
        description: 'Certificación en fundamentos de programación en Python y manipulación de datos.',
        tags: ['Python', 'Cisco'],
        icon: 'fa fa-trophy'
    },
    {
        type: 'cert',
        title: 'Introduction to Data Science',
        entity: 'Cisco Networking Academy',
        date: 'Sept 2023',
        description: 'Fundamentos de ciencia de datos, análisis y visualización.',
        tags: ['Data Science', 'Python', 'Análisis'],
        icon: 'fa fa-trophy'
    },
    {
        type: 'cert',
        title: 'Cloud Computing Foundations',
        entity: 'Google Cloud / AWS Academy',
        date: 'Oct 2022',
        description: 'Conceptos de infraestructura en la nube, redes y despliegue de servicios.',
        tags: ['Cloud', 'AWS', 'Google Cloud'],
        icon: 'fa fa-trophy'
    },
    {
        type: 'cert',
        title: 'Inteligencia Artificial',
        entity: 'Talento Tech Colombia',
        date: 'NOV 2025',
        description: 'Curso intensivo en fundamentos y aplicaciones de inteligencia artificial.',
        tags: ['IA', 'Machine Learning', 'Data'],
        icon: 'fa fa-trophy'
    },
    {
        type: 'education',
        title: 'Bachiller Técnico',
        entity: 'Institución Educativa Educación Media',
        date: 'Diciembre 2016',
        description: 'Educación secundaria con énfasis en tecnología e informática.',
        tags: ['Educación media', 'Tecnología', 'Informática'],
        icon: 'fa fa-graduation-cap'
    },
];