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
            title: 'Desarrollo Web',
            description: 'Creación de sitios y aplicaciones web modernas, optimizadas y adaptadas a cualquier dispositivo.',
            icon: 'fa fa-code'
        },
        {
            title: 'Diseño Responsivo',
            description: 'Interfaces adaptativas con experiencia fluida en todos los tamaños de pantalla.',
            icon: 'fa fa-desktop'
        },
        {
            title: 'Aplicaciones Móviles',
            description: 'Aplicaciones híbridas y progresivas que integran rendimiento y diseño.',
            icon: 'fa fa-mobile'
        },
        {
            title: 'Integración de APIs',
            description: 'Diseño e implementación de APIs REST seguras y eficientes para conectar sistemas.',
            icon: 'fa fa-exchange'
        },
        {
            title: 'Consultoría Técnica',
            description: 'Asesoría en arquitectura de software, rendimiento y buenas prácticas.',
            icon: 'fa fa-lightbulb-o'
        },
        {
            title: 'Automatización de Procesos',
            description: 'Implementación de flujos automatizados con scripts, bots y herramientas DevOps.',
            icon: 'fa fa-cogs'
        }
    ];
}