import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-service',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './service.html',
    styleUrl: './service.scss'
})
export class Service {
    services = [
        {
            title: 'Desarrollo Web Full Stack',
            description: 'Construcción de aplicaciones web robustas y escalables, integrando frontend moderno (Angular) y backend estructurado (Node.js, .NET Core).',
            icon: 'fa fa-code'
        },
        {
            title: 'Integración de APIs y Plataformas',
            description: 'Diseño e implementación de APIs REST y servicios conectados a Salesforce, AWS o sistemas empresariales, garantizando seguridad y eficiencia.',
            icon: 'fa fa-plug'
        },
        {
            title: 'Arquitectura y Optimización',
            description: 'Diseño de estructuras limpias (Clean Architecture, MVC) y optimización de rendimiento, escalabilidad y mantenimiento del código.',
            icon: 'fa fa-sitemap'
        },
        {
            title: 'Automatización y Herramientas DevOps',
            description: 'Configuración de pipelines, scripts y despliegues automatizados con Git, Bitbucket y entornos en la nube para flujos CI/CD eficientes.',
            icon: 'fa fa-cogs'
        }
    ];
}