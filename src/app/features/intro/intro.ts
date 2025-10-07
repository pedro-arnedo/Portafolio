import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-intro',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './intro.html',
    styleUrl: './intro.scss',
})
export class IntroComponent {
    fullText = 'BIENVENIDO A MI PORTAFOLIO';
    displayedText = '';
    hideIntro = false;

    constructor() {
        this.animateIntro();
    }

    private async animateIntro(): Promise<void> {
        await this.typeText();
        await this.wait(1000);
        this.hideIntro = true;
    }

    private async typeText(): Promise<void> {
        for (let i = 0; i < this.fullText.length; i++) {
            this.displayedText = this.fullText.slice(0, i + 1);
            await this.wait(80);
        }
    }

    private wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
