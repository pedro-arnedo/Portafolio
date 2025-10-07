import { Component, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IntroComponent } from '../features/intro/intro';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [IntroComponent],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    protected readonly title = signal('Portafolio | Inicio');

    private readonly titles: Record<string, string> = {
        '/': 'Portafolio | Inicio',
        '/home': 'Portafolio | Inicio',
        '/skills': 'Portafolio | Habilidades',
        '/projects': 'Portafolio | Proyectos',
        '/contact': 'Portafolio | Contacto',
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