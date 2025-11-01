import { Component, AfterViewInit } from '@angular/core';
import { Header } from '../layout/header/header';
import { Body } from '../layout/body/body';
import { Footer } from '../layout/footer/footer';
import { environment } from '../core/env/environment';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [Header, Body, Footer],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App implements AfterViewInit {
    private readonly titleBase = environment.titleBase || 'Portafolio';

    constructor(private titleService: Title) {
        this.titleService.setTitle(`${this.titleBase} | Inicio`);
    }

    ngAfterViewInit(): void {
        // Si entra sin hash (por ejemplo http://localhost:4200/), agrega #home
        if (!window.location.hash) {
            history.replaceState(null, '', '#home');
        }

        // Limpia rutas antiguas del tipo /#/home → #home
        if (window.location.hash.startsWith('#/')) {
            const cleanHash = '#' + window.location.hash.substring(2);
            history.replaceState(null, '', cleanHash);
        }

        // Si hay hash (por ejemplo #about), hace scroll
        const hash = window.location.hash;
        if (hash) {
            const sectionId = hash.replace('#', '');
            const section = document.getElementById(sectionId);
            if (section) {
                setTimeout(() => {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        }

        // Escucha cambios del hash y actualiza el título dinámicamente
        window.addEventListener('hashchange', () => {
            const current = window.location.hash.replace('#', '') || 'home';
            const labelMap: Record<string, string> = {
                home: 'Inicio',
                about: 'Perfil',
                experience: 'Experiencia',
                project: 'Proyectos',
                service: 'Servicios',
                stack: 'Stack',
                contact: 'Contacto'
            };

            const title = labelMap[current] || 'Portafolio';
            this.titleService.setTitle(`${this.titleBase} | ${title}`);
        });
    }

}