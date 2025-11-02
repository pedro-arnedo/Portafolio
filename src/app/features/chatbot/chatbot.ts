import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-chatbot',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './chatbot.html',
    styleUrl: './chatbot.scss'
})
export class Chatbot {
    isChatOpen = false;
    isAtTop = true;

    toggleChat() {
        this.isChatOpen = !this.isChatOpen;
    }

    toggleScroll() {
        if (this.isAtTop) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isAtTop = window.scrollY < 100;
    }
}