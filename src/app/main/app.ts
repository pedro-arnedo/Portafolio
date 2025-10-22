import { Component, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Header } from '../layout/header/header';
import { Body } from '../layout/body/body';
import { Footer } from '../layout/footer/footer';
import { environment } from '../core/config/environment';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [Header, Body, Footer],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {

    protected readonly titleBase = environment.titleBase || 'Portafolio';
    protected readonly title = signal(`${this.titleBase} | Inicio`);

    private readonly titles: Record<string, string> = {
        '/': `${this.titleBase} | Inicio`,
        '/about': `${this.titleBase} | Habilidades`,
        '/contact': `${this.titleBase} | Contacto`,
        '/experience': `${this.titleBase} | Experiencia`,
        '/project': `${this.titleBase} | Proyectos`,
        '/stack': `${this.titleBase} | Stack`,
        '/intro': `${this.titleBase} | Introducción`,
        '/services': `${this.titleBase} | Servicios`,
        '/credits': `${this.titleBase} | Créditos`,
        '/**': `${this.titleBase} | No Encontrado`
    };

    constructor(private router: Router) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this.updateTitle(event.urlAfterRedirects));
    }

    private updateTitle(url: string) {
        const newTitle = this.titles[url] || this.titleBase;
        this.title.set(newTitle);
        document.title = newTitle;
    }
}