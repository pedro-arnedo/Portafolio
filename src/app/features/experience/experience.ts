import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface TLItem {
    type: 'work' | 'education' | 'cert';
    title: string;
    entity: string;
    date: string;
    description: string;
    tags: string[];
    icon: string;
    order: number;
}

@Component({
    selector: 'app-experience',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './experience.html',
    styleUrl: './experience.scss'
})
export class Experience {
    timeline: TLItem[] = [
        {
            type: 'work',
            title: 'Full Stack Developer Junior',
            entity: 'SBX Technologies · Canadá (Remoto)',
            date: 'Dic 2023 – Jun 2025',
            description: 'Desarrollé una aplicación interna integrada con Salesforce (Angular / Node.js / PostgreSQL) bajo arquitectura Clean, optimizando procesos y acceso a datos.',
            tags: ['Angular', 'Node.js', 'PostgreSQL', 'Salesforce', 'REST APIs'],
            icon: 'fa fa-briefcase',
            order: 1
        },
        {
            type: 'work',
            title: 'Desarrollador de Contenido Educativo Digital',
            entity: 'UPARSISTEM · Valledupar, Colombia',
            date: 'Oct 2023 – Dic 2023',
            description: 'Diseñé y desarrollé módulos interactivos para Moodle, mejorando la presentación y usabilidad del material educativo.',
            tags: ['Moodle', 'Canva Pro', 'Diseño instruccional'],
            icon: 'fa fa-briefcase',
            order: 2
        },
        {
            type: 'work',
            title: 'Full Stack Developer Trainee',
            entity: 'Universidad Popular del Cesar',
            date: 'Sept 2022 – Abr 2023',
            description: 'Construí un sistema de información web institucional con autenticación y roles bajo arquitectura MVC N-Layer.',
            tags: ['Angular', '.NET Core', 'MySQL', 'MVC'],
            icon: 'fa fa-briefcase',
            order: 3
        },
        {
            type: 'cert',
            title: 'Python Essentials',
            entity: 'Cisco Networking Academy',
            date: 'Mayo 2023',
            description: 'Certificación en fundamentos de programación y manipulación de datos en Python.',
            tags: ['Python', 'Cisco'],
            icon: 'fa fa-certificate',
            order: 4
        },
        {
            type: 'cert',
            title: 'Introduction to Data Science',
            entity: 'Cisco Networking Academy',
            date: 'Sept 2023',
            description: 'Fundamentos de ciencia de datos, análisis y visualización con Python.',
            tags: ['Data Science', 'Python', 'Análisis'],
            icon: 'fa fa-certificate',
            order: 5
        },
        {
            type: 'education',
            title: 'Ingeniería de Sistemas',
            entity: 'Universidad Popular del Cesar',
            date: '2018 – 2024',
            description: 'Formación profesional en ingeniería de software, bases de datos, redes y gestión de proyectos.',
            tags: ['Software', 'Arquitectura', 'Gestión'],
            icon: 'fa fa-graduation-cap',
            order: 6
        },
        {
            type: 'education',
            title: 'Bachiller Académico',
            entity: 'Institución Educativa Tecnica la Esperanza',
            date: '2017',
            description: 'Educación secundaria con énfasis en tecnología e informática.',
            tags: ['Educación media', 'Tecnología', 'Informática'],
            icon: 'fa fa-graduation-cap',
            order: 7
        }
    ];

    get orderedItems() {
        return this.timeline.sort((a, b) => a.order - b.order);
    }
}