import { Component, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '../../core/environment';

@Component({
    selector: 'app-hero',
    standalone: true,
    templateUrl: './hero.html',
    styleUrl: './hero.scss'
})
export class Hero implements AfterViewInit {

    name = environment.profile.name;
    role = environment.profile.role;
    links = environment.profile.links;

    constructor(private sanitizer: DomSanitizer) { }

    ngAfterViewInit() {
        this.loadParticles();
    }

    private loadParticles() {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = () => {
            (window as any).particlesJS('particles-js', {
                particles: {
                    number: { value: 120 },
                    size: { value: 3 },
                    color: { value: '#ffffff' },
                    line_linked: { enable: true, color: '#ffffff', opacity: 0.4 },
                    move: { speed: 1.2 }
                }
            });
        };
        document.body.appendChild(script);
    }

    safeLink(url: string): SafeUrl {
        if (!url) return '#';

        if (url.includes('@') && !url.startsWith('mailto:')) {
            const subject = encodeURIComponent('Contacto desde tu portafolio web');
            const body = encodeURIComponent('Hola Pedro, vi tu portafolio y me gustaría hablar contigo sobre una oportunidad.');
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${url}&su=${subject}&body=${body}`;
            return this.sanitizer.bypassSecurityTrustUrl(gmailUrl);
        }

        return this.sanitizer.bypassSecurityTrustUrl(url);
    }
}