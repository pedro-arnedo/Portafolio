import { Component } from '@angular/core';
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
export class App {
    private readonly titleBase = environment.titleBase || 'Portafolio';

    constructor(private titleService: Title) {
        this.titleService.setTitle(`${this.titleBase} | Inicio`);
    }
}