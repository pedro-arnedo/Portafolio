import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '../../core/environment';

@Component({
    selector: 'app-contact',
    standalone: true,
    templateUrl: './contact.html',
    styleUrl: './contact.scss'
})
export class Contact {
    links = environment.profile.links;

    constructor(private sanitizer: DomSanitizer) {}

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