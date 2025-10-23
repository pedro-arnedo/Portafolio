export const projects = [
    {
        title: 'Sistema de Gestión Salesforce — SBX Technologies',
        image: '../../../assets/sbx.png',
        description:
            'Aplicación web interna desarrollada para centralizar la gestión de datos e integraciones con Salesforce. Implementada con arquitectura Clean/Layers, integración bidireccional por APIs REST/SOAP y autenticación SSO.',
        technologies: [
            { name: 'Angular', icon: 'fa fa-code' },
            { name: 'Node.js', icon: 'fa fa-server' },
            { name: 'NestJS', icon: 'fa fa-cube' },
            { name: 'PostgreSQL', icon: 'fa fa-database' },
            { name: 'Salesforce API', icon: 'fa fa-cloud' },
            { name: 'TypeScript', icon: 'fa fa-code' },
            { name: 'Git / Bitbucket', icon: 'fa fa-git' },
            { name: 'Jira', icon: 'fa fa-tasks' },
        ],
        repo: 'https://bitbucket.org/sbxtech/salesforce-internal-app',
        demo: 'https://',
    },
    {
        title: 'Sistema Cultural UPC — Universidad Popular del Cesar',
        image: '../../../assets/unicesar.png',
        description:
            'Sistema de información web para la gestión administrativa y cultural de la universidad. Implementado en Angular y .NET Core con arquitectura MVC, control de roles, autenticación institucional y despliegue en servidor institucional.',
        technologies: [
            { name: 'Angular', icon: 'fa fa-code' },
            { name: '.NET Core', icon: 'fa fa-microchip' },
            { name: 'MySQL', icon: 'fa fa-database' },
            { name: 'Bootstrap', icon: 'fa fa-css3' },
            { name: 'Repository Pattern', icon: 'fa fa-layer-group' },
            { name: 'GitHub', icon: 'fa fa-github' },
            { name: 'Jira', icon: 'fa fa-tasks' },
        ],
        repo: 'https://github.com/pedro-arnedo/upc-cultura',
        demo: 'https://cultura.unicesar.edu.co/',
    },
];