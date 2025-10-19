import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ParticleService {
    private loaded = false;

    loadParticles(): Promise<void> {
        if (this.loaded) return Promise.resolve();

        return new Promise(resolve => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
            script.onload = () => {
                this.loaded = true;
                resolve();
            };
            document.body.appendChild(script);
        });
    }
}