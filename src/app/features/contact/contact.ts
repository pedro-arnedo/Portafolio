import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../core/config/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { EmailService } from '../../core/services/email.service';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './contact.html',
    styleUrl: './contact.scss'
})
export class Contact implements OnInit, OnDestroy {

    readonly links = environment.profile.links;
    readonly navLinks = environment.navLinks;
    readonly currentYear = new Date().getFullYear();

    showEmailModal = false;
    emailData = { name: '', email: '', message: '' };
    loading = false;

    private cooldownSeconds$ = new BehaviorSubject<number>(0);
    cooldown$ = this.cooldownSeconds$.asObservable();
    private cooldownSub?: Subscription;
    private readonly COOLDOWN_SECONDS = 180;
    private readonly LOCAL_KEY = 'cooldownEnd';

    constructor(private emailService: EmailService) { }

    ngOnInit() {
        const saved = localStorage.getItem(this.LOCAL_KEY);
        if (saved) {
            const remaining = Math.floor((+saved - Date.now()) / 1000);
            if (remaining > 0) {
                this.startCooldown(remaining);
            } else {
                localStorage.removeItem(this.LOCAL_KEY);
            }
        }
    }

    ngOnDestroy() {
        this.clearCooldownSub();
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

    private clearCooldownSub() {
        if (this.cooldownSub) {
            this.cooldownSub.unsubscribe();
            this.cooldownSub = undefined;
        }
        this.cooldownSeconds$.next(0);
        localStorage.removeItem(this.LOCAL_KEY);
    }

    private startCooldown(seconds = this.COOLDOWN_SECONDS) {
        const end = Date.now() + seconds * 1000;
        localStorage.setItem(this.LOCAL_KEY, end.toString());
        this.cooldownSeconds$.next(seconds);

        this.clearCooldownSub();

        this.cooldownSub = interval(1000)
            .pipe(
                map(i => seconds - i - 1),
                takeWhile(val => val >= 0)
            )
            .subscribe({
                next: val => this.cooldownSeconds$.next(val),
                complete: () => {
                    this.clearCooldownSub();
                }
            });
    }

    isValidEmail(email: string): boolean {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email.trim());
    }

    async sendEmail() {
        const { name, email, message } = this.emailData;
        if (this.cooldownSeconds$.value > 0) {
            const t = this.cooldownSeconds$.value;
            alert(`Debes esperar ${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')} antes de enviar otro mensaje.`);
            return;
        }
        if (!name.trim() || !email.trim() || !message.trim()) {
            alert('Por favor completa todos los campos.');
            return;
        }
        if (!this.isValidEmail(email)) {
            alert('Por favor ingresa un correo electrónico válido.');
            return;
        }
        if (!confirm('¿Estás seguro de que deseas enviar este mensaje?')) return;

        this.loading = true;
        const templateParams = {
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            reply_to: email.trim()
        };

        try {
            await this.emailService.sendMail(templateParams);
            alert(`Gracias ${name}, tu mensaje ha sido enviado con éxito.`);
            this.emailData = { name: '', email: '', message: '' };
            this.closeEmailModal();
            this.startCooldown();
        } catch (err) {
            console.error('Error al enviar el correo:', err);
            alert('Hubo un problema al enviar el mensaje. Intenta más tarde.');
        } finally {
            this.loading = false;
        }
    }

    get cooldown() {
        return this.cooldownSeconds$.value;
    }

    scrollTo(event: Event, targetId: string) {
        event.preventDefault();
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}