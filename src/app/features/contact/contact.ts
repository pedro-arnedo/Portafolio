import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '../../core/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './contact.html',
    styleUrl: './contact.scss'
})
export class Contact {

    links = environment.profile.links;
    navLinks = environment.navLinks;
    subscriberEmail = '';
    currentYear = new Date().getFullYear();

    constructor(private sanitizer: DomSanitizer) { }

    openCV(): void {
        const cvUrl = this.links.cv;
        if (cvUrl) {
            window.open(cvUrl, '_blank');
        }
    }

    safeLink(email: string): SafeUrl {
        if (!email) return '#';
        const subject = encodeURIComponent('Posible colaboración profesional');
        const body = encodeURIComponent(
            `Estimado Pedro,\n\nHe revisado tu portafolio y considero que tu experiencia puede aportar mucho a nuestros proyectos. Me gustaría coordinar una breve reunión para conversar sobre posibles oportunidades de colaboración.\n\nQuedo atento a tu respuesta.\n\nCordialmente,\n[Datos de Contacto]`
        );
        const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
        return this.sanitizer.bypassSecurityTrustUrl(gmail);
    }

    subscribe(): void {
        const email = this.subscriberEmail.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert('Por favor ingresa un correo válido.');
            return;
        }

        alert(`Gracias por suscribirte, ${email}!`);
        this.subscriberEmail = '';
    }

    scrollTo(event: Event, targetId: string): void {
        event.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    scrollToTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}