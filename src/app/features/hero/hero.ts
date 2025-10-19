import { Component, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '../../core/environment';
import { ParticleService } from '../../core/services/particles.service';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero.html',
    styleUrls: ['./hero.scss']
})
export class Hero implements AfterViewInit, OnDestroy {

    private destroyed = false;
    private running = false;

    readonly fullName = environment.profile.name ?? '';
    readonly roles: string[] = (
        Array.isArray(environment.profile.role)
            ? environment.profile.role
            : [String(environment.profile.role ?? '')]
    ).filter(r => !!r && r.trim().length > 0);

    readonly photo = environment.profile.photo ?? '';
    safePhoto: SafeUrl = '';

    displayedIntro = '';
    displayedName = '';
    displayedLastName = '';
    displayedRole = '';
    typingField: 'intro' | 'name' | 'lastname' | 'role' | null = null;

    private readonly introText = environment.introText ?? 'Bienvenidos a mi portafolio';
    private readonly typingSpeedBase = 50;
    private readonly typingSpeedStart = 80;

    private nameParts: string[] = [];

    constructor(
        private particles: ParticleService,
        private sanitizer: DomSanitizer,
        private cd: ChangeDetectorRef
    ) { }

    ngAfterViewInit() {
        if (typeof window === 'undefined') return;

        this.safePhoto = this.sanitizer.bypassSecurityTrustUrl(this.photo);

        const parts = this.fullName.trim().split(/\s+/);
        const mid = Math.ceil(parts.length / 2);
        this.nameParts = [
            parts.slice(0, mid).join(' '),
            parts.slice(mid).join(' ')
        ];

        this.startTypingSequence();

        this.particles.loadParticles().then(() => {
            (window as any).particlesJS?.('particles-js', {
                particles: {
                    number: { value: 120 },
                    size: { value: 3 },
                    color: { value: '#ffffff' },
                    line_linked: { enable: true, color: '#ffffff', opacity: 0.4 },
                    move: { speed: 1.3 }
                }
            });
        });

        this.cd.detectChanges();
    }

    ngOnDestroy() {
        this.destroyed = true;
    }

    private async startTypingSequence(): Promise<void> {
        if (this.running) return;
        this.running = true;

        this.typingField = 'intro';
        await this.typeText(this.introText, 'intro');
        if (this.destroyed) return;

        await this.wait(300);
        this.typingField = 'name';
        await this.typeText(this.nameParts[0] ?? '', 'name');
        if (this.destroyed) return;

        await this.wait(300);
        this.typingField = 'lastname';
        await this.typeText(this.nameParts[1] ?? '', 'lastname');
        if (this.destroyed) return;

        await this.wait(500);
        this.typingField = 'role';
        this.loopRoles();
    }

    private async loopRoles(): Promise<void> {
        let idx = 0;
        while (!this.destroyed) {
            const role = this.roles?.[idx % this.roles.length] || '';
            this.typingField = 'role';
            await this.typeText(role, 'role');
            if (this.destroyed) break;
            await this.wait(1200);
            if (this.destroyed) break;
            await this.deleteText();
            if (this.destroyed) break;
            await this.wait(300);
            idx++;
        }
    }

    private async typeText(text: string | undefined, field: 'intro' | 'name' | 'lastname' | 'role'): Promise<void> {
        const safeText = text ?? '';
        this.updateField(field, '');
        for (let i = 0; i < safeText.length; i++) {
            if (this.destroyed) return;
            this.updateField(field, safeText.slice(0, i + 1));
            const speed = this.typingSpeedStart - ((this.typingSpeedStart - this.typingSpeedBase) * (i / safeText.length));
            await this.wait(speed);
        }
    }

    private async deleteText(): Promise<void> {
        const current = this.displayedRole;
        for (let i = current.length; i >= 0; i--) {
            if (this.destroyed) return;
            this.displayedRole = current.slice(0, i);
            await this.wait(45);
        }
    }

    private updateField(field: 'intro' | 'name' | 'lastname' | 'role', value: string) {
        switch (field) {
            case 'intro': this.displayedIntro = value; break;
            case 'name': this.displayedName = value; break;
            case 'lastname': this.displayedLastName = value; break;
            case 'role': this.displayedRole = value; break;
        }
    }

    private wait(ms: number) {
        return new Promise<void>(resolve => {
            const id = setTimeout(() => {
                clearTimeout(id);
                resolve();
            }, ms);
        });
    }
}