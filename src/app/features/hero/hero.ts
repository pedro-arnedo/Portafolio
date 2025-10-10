import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../core/environment';
import { ParticleService } from '../../core/particles.service';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero.html',
    styleUrls: ['./hero.scss']
})
export class Hero implements AfterViewInit {
    readonly name = environment.profile.name ?? '';
    readonly roles: string[] = Array.isArray(environment.profile.role)
        ? environment.profile.role
        : [String(environment.profile.role ?? '')];

    displayedIntro = '';
    displayedName = '';
    displayedRole = '';
    typingField: 'intro' | 'name' | 'role' | null = null;

    private readonly introText = 'Bienvenidos a mi portafolio';
    private readonly typingSpeed = 80;
    private running = false;

    constructor(private particles: ParticleService) { }

    ngAfterViewInit() {
        this.typingField = 'intro';
        this.startTypingSequence();
        this.particles.loadParticles().then(() => {
            if ((window as any).particlesJS) {
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
        }).catch(() => { });
    }

    private async startTypingSequence(): Promise<void> {
        if (this.running) return;
        this.running = true;

        this.typingField = 'intro';
        await this.typeText(this.introText, 'intro');

        await this.wait(300);
        this.typingField = 'name';
        await this.typeText(this.name, 'name');

        await this.wait(500);
        this.typingField = 'role';
        this.loopRoles();
    }

    private async loopRoles(): Promise<void> {
        let idx = 0;
        while (true) {
            const role = this.roles[idx % this.roles.length] ?? '';
            this.typingField = 'role';
            await this.typeText(role, 'role');
            await this.wait(1200);
            await this.deleteText('role');
            await this.wait(300);
            idx++;
        }
    }

    private async typeText(text: string, field: 'intro' | 'name' | 'role'): Promise<void> {
        this.updateField(field, '');
        for (let i = 0; i < text.length; i++) {
            this.updateField(field, text.slice(0, i + 1));
            await this.wait(this.typingSpeed);
        }
    }

    private async deleteText(field: 'role'): Promise<void> {
        const current = this.displayedRole;
        for (let i = current.length; i >= 0; i--) {
            this.displayedRole = current.slice(0, i);
            await this.wait(45);
        }
    }

    private updateField(field: 'intro' | 'name' | 'role', value: string) {
        if (field === 'intro') this.displayedIntro = value;
        if (field === 'name') this.displayedName = value;
        if (field === 'role') this.displayedRole = value;
    }

    private wait(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}