import { Component, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '../../core/environment';
import { ParticleService } from '../../core/particles.service';

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

    constructor(
        private sanitizer: DomSanitizer,
        private particles: ParticleService
    ) {}

    async ngAfterViewInit() {
        await this.particles.loadParticles();

        (window as any).particlesJS('particles-js', {
            particles: {
                number: { value: 120 },
                size: { value: 3 },
                color: { value: '#ffffff' },
                line_linked: { enable: true, color: '#ffffff', opacity: 0.4 },
                move: { speed: 1.3 }
            }
        });
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