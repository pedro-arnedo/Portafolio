import { Component, OnInit } from '@angular/core';
import { environment } from '../../core/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './contact.html',
    styleUrl: './contact.scss'
})
export class Contact implements OnInit {

    links = environment.profile.links;
    navLinks = environment.navLinks;
    currentYear = new Date().getFullYear();

    showEmailModal = false;
    emailData = { name: '', email: '', message: '' };
    loading = false;
    cooldown = 0;
    cooldownInterval: any;

    ngOnInit() {
        const savedCooldownEnd = localStorage.getItem('cooldownEnd');
        if (savedCooldownEnd) {
            const remaining = Math.floor((+savedCooldownEnd - Date.now()) / 1000);
            if (remaining > 0) {
                this.cooldown = remaining;
                this.startCooldownTimer();
            } else {
                localStorage.removeItem('cooldownEnd');
            }
        }
    }

    openCV() {
        const cvUrl = this.links.cv;
        if (cvUrl) window.open(cvUrl, '_blank');
    }

    openEmailModal() {
        this.showEmailModal = true;
        document.body.style.overflow = 'hidden';
    }

    closeEmailModal() {
        this.showEmailModal = false;
        document.body.style.overflow = '';
    }

    startCooldownTimer() {
        this.cooldownInterval = setInterval(() => {
            this.cooldown--;
            if (this.cooldown <= 0) {
                clearInterval(this.cooldownInterval);
                localStorage.removeItem('cooldownEnd');
            }
        }, 1000);
    }

    startCooldown() {
        const cooldownEnd = Date.now() + 180000; // 3 min
        localStorage.setItem('cooldownEnd', cooldownEnd.toString());
        this.cooldown = 180;
        this.startCooldownTimer();
    }

    isValidEmail(email: string): boolean {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email.trim());
    }

    async sendEmail() {
        if (this.cooldown > 0) {
            const minutes = Math.floor(this.cooldown / 60);
            const seconds = this.cooldown % 60;
            alert(`Debes esperar ${minutes}:${seconds.toString().padStart(2, '0')} antes de enviar otro mensaje.`);
            return;
        }

        const { name, email, message } = this.emailData;
        if (!name.trim() || !email.trim() || !message.trim()) {
            alert('Por favor completa todos los campos.');
            return;
        }

        if (!this.isValidEmail(email)) {
            alert('Por favor ingresa un correo electrónico válido.');
            return;
        }

        const confirmSend = confirm('¿Estás seguro de que deseas enviar este mensaje?');
        if (!confirmSend) return;

        this.loading = true;

        const templateParams = {
            name: name.trim(),
            email: email.trim(),
            message: message.trim()
        };

        try {
            await emailjs.send(
                environment.emailService.serviceID,
                environment.emailService.templateID,
                templateParams,
                environment.emailService.publicKey
            );

            alert(`Gracias ${name}, tu mensaje ha sido enviado con éxito.`);
            this.emailData = { name: '', email: '', message: '' };
            this.closeEmailModal();
            this.startCooldown();
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            alert('Hubo un problema al enviar el mensaje. Intenta más tarde.');
        } finally {
            this.loading = false;
        }
    }

    scrollTo(event: Event, targetId: string) {
        event.preventDefault();
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}