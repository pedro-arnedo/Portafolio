import { TimelineItem } from '../models/timeline.model';

export const timeline: TimelineItem[] = [
    // === EXPERIENCIA PROFESIONAL ===
    {
        type: 'work',
        title: 'Full Stack Developer Junior',
        entity: 'SBX Technologies · Canadá (Remoto)',
        date: 'Dic 2023 – Jun 2025',
        description:
            'Desarrollo y mantenimiento de una aplicación interna integrada con Salesforce, bajo arquitectura Clean. Implementación de módulos en Angular, APIs con Node.js y PostgreSQL, optimizando procesos internos de gestión técnica y flujo de datos.',
        stack: ['Angular', 'Node.js', 'PostgreSQL', 'Salesforce', 'Clean Architecture', 'REST APIs'],
        icon: 'fa fa-briefcase',
    },
    {
        type: 'work',
        title: 'Full Stack Developer (Proyecto colaborativo freelance)',
        entity: 'Kingdom Grace · Autónomo · Remoto',
        date: 'Ago 2024 – Sept 2024',
        description:
            'Contribución al desarrollo full stack de la página institucional de Kingdom Grace, enfocándome en la arquitectura, la integración del frontend con APIs y la optimización del diseño visual. Despliegue y mantenimiento del entorno productivo.',
        stack: ['Angular', 'Node.js', 'TypeScript', 'SCSS', 'Firebase', 'Diseño responsivo'],
        icon: 'fa fa-briefcase',
    },
    {
        type: 'work',
        title: 'Desarrollador de Contenido Educativo Digital',
        entity: 'UPARSISTEM · Valledupar, Colombia',
        date: 'Oct 2023 – Dic 2023',
        description:
            'Diseño y desarrollo de módulos interactivos y material digital para Moodle, mejorando la experiencia de aprendizaje y la presentación de contenidos educativos mediante recursos visuales y multimedia.',
        stack: ['Moodle', 'Canva Pro', 'Diseño instruccional', 'E-learning'],
        icon: 'fa fa-briefcase',
    },
    {
        type: 'work',
        title: 'Full Stack Developer Trainee',
        entity: 'Universidad Popular del Cesar · Valledupar, Colombia',
        date: 'Sept 2022 – Abr 2023',
        description:
            'Construcción de un sistema de información institucional con autenticación por roles, siguiendo la arquitectura MVC N-Layer. Desarrollo del frontend en Angular y backend en .NET Core con base de datos MySQL.',
        stack: ['Angular', '.NET Core', 'MySQL', 'MVC', 'Repository Pattern', 'Autenticación'],
        icon: 'fa fa-briefcase',
    },

    // === CERTIFICACIONES ===
    {
        type: 'cert',
        title: 'Python Essentials',
        entity: 'Cisco Networking Academy',
        date: 'Mayo 2023',
        description:
            'Certificación en fundamentos de programación, control de flujo, estructuras de datos y manipulación de archivos con Python.',
        stack: ['Python', 'Cisco', 'Programación básica'],
        icon: 'fa fa-trophy',
    },
    {
        type: 'cert',
        title: 'Introduction to Data Science',
        entity: 'Cisco Networking Academy',
        date: 'Sept 2023',
        description:
            'Introducción a la ciencia de datos, análisis estadístico y visualización de datos utilizando Python y librerías de análisis.',
        stack: ['Data Science', 'Python', 'Análisis', 'Visualización'],
        icon: 'fa fa-trophy',
    },
    {
        type: 'cert',
        title: 'Cloud Computing Foundations',
        entity: 'Google Cloud / AWS Academy',
        date: 'Oct 2022',
        description:
            'Certificación en fundamentos de infraestructura cloud, despliegue de servicios, redes y seguridad en entornos AWS y Google Cloud.',
        stack: ['Cloud', 'AWS', 'Google Cloud', 'Infraestructura'],
        icon: 'fa fa-trophy',
    },
    {
        type: 'cert',
        title: 'Inteligencia Artificial',
        entity: 'Talento Tech Colombia',
        date: 'Nov 2025',
        description:
            'Formación intensiva en fundamentos de IA, machine learning y aplicaciones prácticas de modelos de predicción y análisis de datos.',
        stack: ['IA', 'Machine Learning', 'Data', 'Automatización'],
        icon: 'fa fa-trophy',
    },

    // === FORMACIÓN ACADÉMICA ===
    {
        type: 'education',
        title: 'Ingeniería de Sistemas',
        entity: 'Universidad Popular del Cesar',
        date: 'Feb 2017 – Jun 2023',
        description:
            'Formación integral en desarrollo de software, arquitectura de sistemas, bases de datos, redes y gestión de proyectos. Proyecto de grado enfocado en sistemas web institucionales.',
        stack: ['Desarrollo de software', 'Arquitectura', 'Bases de datos', 'Gestión de proyectos'],
        icon: 'fa fa-graduation-cap',
    },
    {
        type: 'education',
        title: 'Bachiller Técnico',
        entity: 'Institución Educativa Técnica Secundaria',
        date: 'Dic 2016',
        description:
            'Educación secundaria bachillerato',
        stack: ['Educación media', 'Bachillerato técnico'],
        icon: 'fa fa-graduation-cap',
    },
];