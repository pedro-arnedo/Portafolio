import { Component, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Header } from '../layout/header/header';
import { Body } from '../layout/body/body';
import { Footer } from '../layout/footer/footer';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [Header, Body, Footer],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    protected readonly title = signal('Portafolio | Inicio');

    private readonly titles: Record<string, string> = {
        '/': 'Portafolio | Inicio',
        '/home': 'Portafolio | Inicio',
        '/about': 'Portafolio | Habilidades',
        '/contact': 'Portafolio | Contacto',
        '/credits': 'Portafolio | Créditos',
        '/experience': 'Portafolio | Experiencia',
        '/hero': 'Portafolio | Héroe',
        '/intro': 'Portafolio | Introducción',
        '/project': 'Portafolio | Proyectos',
        '/services': 'Portafolio | Servicios',
        '/stack': 'Portafolio | Stack',
        '/**': 'Portafolio | No Encontrado',
    };

    constructor(private router: Router) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this.updateTitle(event.urlAfterRedirects));
    }

    private updateTitle(url: string) {
        const newTitle =
            this.titles[url] || 'Portafolio';
        this.title.set(newTitle);
        document.title = newTitle;
    }
}