import { TimelineItem } from '../models/timeline.model';

export const timeline: TimelineItem[] = [
    // === EXPERIENCIA PROFESIONAL ===
    {
        type: 'work',
        title: 'Full Stack Developer Junior',
        entity: 'SBX TECHNOLOGIES [Salesforce CPG Expert Solutions] · (Remoto) Canadá, Quebec',
        date: 'Diciembre 2023 – Junio 2025',
        description:
            'Desarrollo full stack de una aplicación web interna para centralizar consultas y gestión de datos de Salesforce, reduciendo la dependencia del CRM y mejorando el acceso a la información. Implementación de módulos Angular, APIs Node.js y base de datos PostgreSQL bajo Layered Architecture, con integración bidireccional a Salesforce mediante Connected Apps y REST/SOAP. Gestión de metadata, autenticación SSO, control de acceso por roles y despliegue con Bitbucket y Jira.',
        icon: 'fa fa-briefcase',
        stack: [
            'Angular', 'Node.js', 'PostgreSQL', 'Salesforce', 'REST/SOAP', 'Layered Architecture', 'Bitbucket', 'Jira'
        ],
        modules: [
            'Dashboard de consultas Salesforce: visualización de registros, filtros dinámicos y métricas.',
            'Gestión de usuarios, roles y permisos con autenticación SSO.',
            'Integración bidireccional de datos mediante APIs REST/SOAP con Salesforce.',
            'Módulo de reportes automáticos (PDF/Excel) y envío programado de resultados.'
        ],
        responsibilities: [
            'Implementación de componentes modulares reutilizables en Angular.',
            'Desarrollo de servicios backend desacoplados en Node.js con PostgreSQL.',
            'Integración y pruebas unitarias de APIs Salesforce.',
            'Gestión de versionamiento y despliegue en Bitbucket con seguimiento en Jira.'
        ],
        architecture:
            'Arquitectura en capas desacopladas (presentación, dominio y datos) basada en Clean/Layered Architecture, con integración Salesforce y autenticación SSO.',
        results: [
            'Centralización total de consultas internas.',
            'Automatización de procesos técnicos internos.'
        ]
    },
    {
        type: 'work',
        title: 'Full Stack Developer (Proyecto colaborativo freelance)',
        entity: 'Kingdom Grace Foundation · Guayaquil, Ecuador (Remoto)',
        date: 'Agosto 2024 – Octubre 2024',
        description:
            'Contribuí al desarrollo full stack del portal institucional de Kingdom Grace, mejorando la velocidad de carga y la gestión de contenidos. Implementación de arquitectura modular, autenticación, formularios dinámicos y panel administrativo en Angular y Node.js.',
        icon: 'fa fa-briefcase',
        stack: ['Angular', 'Node.js', 'TypeScript', 'SCSS', 'Firebase', 'Diseño responsivo'],
        modules: [
            'Gestión de programas, eventos y actividades institucionales.',
            'Panel administrativo con control de roles.',
            'Integración de pasarela de donaciones y validaciones dinámicas.',
            'Despliegue continuo y monitoreo de rendimiento en Firebase.'
        ],
        responsibilities: [
            'Planificación ágil del proyecto y levantamiento de requerimientos.',
            'Desarrollo modular frontend y backend.',
            'Optimización de rendimiento y carga visual responsiva.',
        ],
        architecture:
            'Arquitectura modular con separación por capas (presentación, negocio y datos), autenticación por roles y servicios asincrónicos REST.',
        results: [
            'Portal institucional estable y escalable.',
            'Reducción de tiempos de carga y mayor accesibilidad.',
            'Gestión autónoma de contenido por parte del cliente.'
        ]
    },
    {
        type: 'work',
        title: 'Desarrollador de Contenido Educativo Digital',
        entity: 'UPARSISTEM · Valledupar, Colombia',
        date: 'Octubre 2023 – Diciembre 2023',
        description:
            'Diseño y desarrollo de módulos educativos multimedia para Moodle, priorizando interactividad y accesibilidad visual. Creación de contenidos audiovisuales, cuestionarios dinámicos y material gráfico con enfoque pedagógico.',
        icon: 'fa fa-briefcase',
        stack: ['Moodle', 'Canva Pro', 'Diseño instruccional', 'E-learning', 'UX/UI'],
        modules: [
            'Diseño de lecciones interactivas con videos, quizzes y recursos visuales.',
            'Evaluaciones automáticas con retroalimentación inmediata.',
            'Diseño de material gráfico y animaciones educativas.'
        ],
        responsibilities: [
            'Desarrollo y adaptación de contenido multimedia interactivo.',
            'Optimización de la usabilidad en entornos Moodle.',
            'Pruebas de accesibilidad y colaboración con el equipo pedagógico.'
        ],
        architecture:
            'Estructura modular basada en recursos SCORM integrados en Moodle, con capas de presentación y evaluación adaptativa.',
        results: [
            'Mayor participación estudiantil en los módulos.',
            'Reducción del abandono académico.',
            'Experiencia de aprendizaje más inmersiva y accesible.'
        ]
    },
    {
        type: 'work',
        title: 'Full Stack Developer Trainee',
        entity: 'Universidad Popular del Cesar · Valledupar, Colombia',
        date: 'Septiembre 2022 – Abril 2023',
        description:
            'Construcción de un sistema de información institucional con autenticación por roles, siguiendo arquitectura MVC N-Layer. Desarrollo frontend en Angular y backend en .NET Core con base de datos MySQL.',
        icon: 'fa fa-briefcase',
        stack: ['Angular', '.NET Core', 'MySQL', 'MVC', 'Repository Pattern', 'JWT'],
        modules: [
            'Gestión de usuarios y roles institucionales.',
            'Formularios digitales de registro y solicitud de eventos culturales.',
            'Dashboard administrativo con estadísticas y reportes.'
        ],
        responsibilities: [
            'Desarrollo del frontend en Angular con diseño modular.',
            'Implementación de API REST segura en .NET Core.',
            'Pruebas unitarias e integración continua.',
            'Documentación técnica y despliegue del sistema.'
        ],
        architecture:
            'Arquitectura N-Layer con patrón Repository y autenticación JWT, implementando principios SOLID para modularidad y mantenibilidad.',
        results: [
            'Digitalización total de procesos institucionales.',
            'Reducción de tiempos administrativos en un 50%.',
            'Optimización en la trazabilidad de actividades culturales.'
        ]
    },

    // === CERTIFICACIONES ===
    {
        type: 'cert',
        title: 'Python Essentials',
        entity: 'Cisco Networking Academy',
        date: 'Mayo 2023',
        description:
            'Certificación en fundamentos de programación, estructuras de control y manipulación de datos con Python.',
        icon: 'fa fa-trophy',
        stack: ['Python', 'Cisco', 'Programación estructurada']
    },
    {
        type: 'cert',
        title: 'Introduction to Data Science',
        entity: 'Cisco Networking Academy',
        date: 'Septiembre 2023',
        description:
            'Certificación en fundamentos de ciencia de datos, estadística y visualización de información con Python.',
        icon: 'fa fa-trophy',
        stack: ['Python', 'Data Science', 'Visualización', 'Análisis de datos']
    },
    {
        type: 'cert',
        title: 'Cloud Computing Foundations',
        entity: 'Google Cloud / AWS Academy',
        date: 'Octubre 2022',
        description:
            'Certificación en fundamentos de infraestructura cloud, redes, despliegue de servicios y seguridad en entornos AWS y Google Cloud.',
        icon: 'fa fa-trophy',
        stack: ['Cloud', 'AWS', 'Google Cloud', 'Infraestructura']
    },
    {
        type: 'cert',
        title: 'Inteligencia Artificial',
        entity: 'Talento Tech Colombia',
        date: 'Noviembre 2025',
        description:
            'Formación intensiva en fundamentos de IA, machine learning y aplicaciones prácticas de modelos predictivos y automatización.',
        icon: 'fa fa-trophy',
        stack: ['IA', 'Machine Learning', 'Data', 'Automatización']
    },

    // === EDUCACIÓN ===
    {
        type: 'education',
        title: 'Ingeniería de Sistemas',
        entity: 'Universidad Popular del Cesar · Valledupar, Colombia',
        date: 'Febrero 2017 – Junio 2023',
        description:
            'Formación en desarrollo de software, arquitectura de sistemas, bases de datos y gestión de proyectos. Proyecto de grado enfocado en la digitalización de procesos institucionales y gestión documental.',
        icon: 'fa fa-graduation-cap',
        stack: ['Desarrollo de software', 'Arquitectura', 'Bases de datos', 'Gestión de proyectos']
    },
    {
        type: 'education',
        title: 'Bachiller Técnico',
        entity: 'Institución Educativa Técnica Secundaria · Valledupar, Colombia',
        date: 'Diciembre 2016',
        description:
            'Educación secundaria con formación técnica',
        icon: 'fa fa-graduation-cap',
        stack: ['Educación secundaria', 'Bachillerato técnico']
    }
];