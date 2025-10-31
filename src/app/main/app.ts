import { Component, signal, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { Header } from '../layout/header/header';
import { Body } from '../layout/body/body';
import { Footer } from '../layout/footer/footer';
import { environment } from '../core/env/environment';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [Header, Body, Footer],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App implements AfterViewInit {
    protected readonly titleBase = environment.titleBase || 'Portafolio';
    protected readonly title = signal(`${this.titleBase} | Inicio`);

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title
    ) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => this.updateTitle());
    }

    ngAfterViewInit(): void {
        const hash = window.location.hash;
        if (hash.startsWith('#')) {
            const sectionId = hash.substring(2);
            const section = document.getElementById(sectionId);
            if (section) {
                setTimeout(() => {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        }
    }

    private updateTitle() {
        let child = this.route.firstChild;
        while (child?.firstChild) {
            child = child.firstChild;
        }

        const pageTitle = child?.snapshot.data?.['title'] || '';
        const newTitle = pageTitle
            ? `${this.titleBase} | ${pageTitle}`
            : this.titleBase;

        this.title.set(newTitle);
        this.titleService.setTitle(newTitle);
    }
}