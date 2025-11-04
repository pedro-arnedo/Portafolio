import { TimelineItem } from '../models/timeline.model';

export const timeline: TimelineItem[] = [
    // === EXPERIENCIA PROFESIONAL ===
    {
        type: 'work',
        title: 'Full Stack Developer Junior',
        entity: 'SBX Technologies · Canadá (Remoto)',
        date: 'Dic 2023 – Jun 2025',
        description:
            'Desarrollo y mantenimiento de una aplicación interna integrada con Salesforce, optimizando la gestión de datos y procesos técnicos internos. Aplicación de arquitectura limpia (Clean Architecture) y desarrollo modular en Angular y Node.js.',
        icon: 'fa fa-briefcase',
        stack: ['Angular', 'Node.js', 'PostgreSQL', 'Salesforce', 'REST APIs', 'Clean Architecture'],
        modules: [
            'Dashboard de consultas Salesforce: visualización de registros, filtros dinámicos y métricas.',
            'Gestión de usuarios y roles con control de acceso granular.',
            'Integración bidireccional de datos mediante APIs REST/SOAP con Salesforce.',
            'Reportes automatizados (PDF/Excel) con programación de envíos internos.'
        ],
        responsibilities: [
            'Implementación de componentes frontend reutilizables en Angular.',
            'Desarrollo de servicios backend desacoplados en Node.js con PostgreSQL.',
            'Integración y pruebas de APIs Salesforce.',
            'Gestión del versionamiento en Bitbucket y automatización con Jira.'
        ],
        architecture:
            'Clean Architecture basada en capas desacopladas (presentación, dominio y datos) con autenticación SSO y control de acceso por roles.',
        results: [
            'Centralización de datos internos.',
            'Reducción de tiempos de consulta en más del 40%.',
            'Automatización de procesos de reportes internos.'
        ]
    },
    {
        type: 'work',
        title: 'Full Stack Developer (Proyecto colaborativo freelance)',
        entity: 'Kingdom Grace Foundation · Colombia (Remoto)',
        date: 'Ago 2024 – Oct 2024',
        description:
            'Desarrollo del portal institucional con enfoque en escalabilidad, modularidad y accesibilidad, bajo arquitectura N-Layer. Integración full stack con Node.js y Angular.',
        icon: 'fa fa-briefcase',
        stack: ['Angular', 'Node.js', 'TypeScript', 'MySQL', 'SCSS', 'Firebase'],
        modules: [
            'Gestión de programas y actividades institucionales (CRUD completo).',
            'Módulo de donaciones y pasarela de pagos con validaciones.',
            'Panel administrativo de contenido con control de roles.',
            'Despliegue y monitoreo en entorno cloud.'
        ],
        responsibilities: [
            'Planificación ágil y levantamiento de requerimientos.',
            'Desarrollo frontend y backend modular.',
            'Documentación técnica y despliegue continuo en Firebase.',
            'Diseño visual responsivo y optimización de carga.'
        ],
        architecture:
            'Arquitectura N-Layer con separación por capas, autenticación institucional y control de permisos en endpoints.',
        results: [
            'Portal escalable y administrable en tiempo real.',
            'Incremento en la visibilidad digital de la institución.',
            'Gestión autónoma del contenido por parte del cliente.'
        ]
    },
    {
        type: 'work',
        title: 'Desarrollador de Contenido Educativo Digital',
        entity: 'UPARSISTEM · Valledupar, Colombia',
        date: 'Oct 2023 – Dic 2023',
        description:
            'Diseño y desarrollo de módulos educativos multimedia para la plataforma Moodle, priorizando interactividad y accesibilidad visual.',
        icon: 'fa fa-briefcase',
        stack: ['Moodle', 'Canva Pro', 'Diseño instruccional', 'E-learning', 'UX'],
        modules: [
            'Lecciones interactivas con videos, quizzes y recursos multimedia.',
            'Evaluaciones dinámicas con feedback instantáneo.',
            'Material gráfico y animaciones pedagógicas.'
        ],
        responsibilities: [
            'Desarrollo de contenido digital interactivo para Moodle.',
            'Optimización visual y accesibilidad educativa.',
            'Pruebas de usabilidad y retroalimentación con instructores.'
        ],
        architecture:
            'Estructura modular basada en recursos SCORM integrados en Moodle con capas de presentación y evaluación adaptativa.',
        results: [
            'Mayor interacción estudiante-plataforma.',
            'Reducción del abandono en módulos formativos.',
            'Alineación con las guías de diseño instruccional.'
        ]
    },
    {
        type: 'work',
        title: 'Full Stack Developer Trainee',
        entity: 'Universidad Popular del Cesar · Valledupar, Colombia',
        date: 'Sep 2022 – Abr 2023',
        description:
            'Desarrollo de un sistema web institucional para la digitalización de procesos administrativos de la sección de cultura, bajo arquitectura MVC N-Layer.',
        icon: 'fa fa-briefcase',
        stack: ['Angular', '.NET Core', 'MySQL', 'MVC', 'Repository Pattern', 'Autenticación'],
        modules: [
            'Gestión de usuarios y roles institucionales.',
            'Formularios digitales de solicitud de actividades culturales.',
            'Dashboard administrativo para seguimiento y métricas.'
        ],
        responsibilities: [
            'Desarrollo frontend en Angular y backend en .NET Core.',
            'Implementación de autenticación por roles y middleware de seguridad.',
            'Pruebas funcionales y documentación del sistema.'
        ],
        architecture:
            'Arquitectura N-Layer con patrón Repository, desacople de servicios y capa de autenticación basada en JWT.',
        results: [
            'Digitalización total de procesos administrativos.',
            'Reducción de tiempos de gestión en un 50%.',
            'Sistema estable con control de roles y reportes dinámicos.'
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
        stack: ['Python', 'Cisco', 'Lógica de programación']
    },
    {
        type: 'cert',
        title: 'Introduction to Data Science',
        entity: 'Cisco Networking Academy',
        date: 'Sept 2023',
        description:
            'Introducción a la ciencia de datos, estadística descriptiva y visualización con librerías de análisis en Python.',
        icon: 'fa fa-trophy',
        stack: ['Python', 'Data Science', 'Visualización', 'Análisis estadístico']
    },
    {
        type: 'cert',
        title: 'Cloud Computing Foundations',
        entity: 'Google Cloud / AWS Academy',
        date: 'Oct 2022',
        description:
            'Fundamentos de infraestructura cloud, redes, despliegue de servicios y seguridad en entornos AWS y Google Cloud.',
        icon: 'fa fa-trophy',
        stack: ['Cloud', 'AWS', 'Google Cloud', 'Infraestructura']
    },
    {
        type: 'cert',
        title: 'Inteligencia Artificial',
        entity: 'Talento Tech Colombia',
        date: 'Nov 2025',
        description:
            'Formación intensiva en fundamentos de IA, machine learning y aplicaciones prácticas de modelos predictivos.',
        icon: 'fa fa-trophy',
        stack: ['IA', 'Machine Learning', 'Data', 'Automatización']
    },

    // === EDUCACIÓN ===
    {
        type: 'education',
        title: 'Ingeniería de Sistemas',
        entity: 'Universidad Popular del Cesar',
        date: 'Feb 2017 – Jun 2023',
        description:
            'Formación en desarrollo de software, arquitectura de sistemas, bases de datos y gestión de proyectos. Proyecto de grado basado en digitalización de procesos institucionales.',
        icon: 'fa fa-graduation-cap',
        stack: ['Desarrollo de software', 'Arquitectura', 'Bases de datos', 'Gestión de proyectos']
    },
    {
        type: 'education',
        title: 'Bachiller Técnico',
        entity: 'Institución Educativa Técnica Secundaria',
        date: 'Dic 2016',
        description: 'Educación secundaria con formación técnica en fundamentos informáticos.',
        icon: 'fa fa-graduation-cap',
        stack: ['Educación media', 'Bachillerato técnico']
    }
];