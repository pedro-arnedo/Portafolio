import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../core/services/gemini.service';

@Component({
    selector: 'app-chatbot',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chatbot.html',
    styleUrl: './chatbot.scss'
})
export class Chatbot {
    isChatOpen = false;
    isAtTop = true;
    userMessage = '';
    messages: { text: string; from: 'user' | 'bot' }[] = [];
    loading = false;

    constructor(private gemini: GeminiService) { }

    toggleChat() {
        this.isChatOpen = !this.isChatOpen;
    }

    toggleScroll() {
        if (this.isAtTop)
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async sendMessage() {
        const msg = this.userMessage.trim();
        if (!msg) return;

        this.messages.push({ text: msg, from: 'user' });
        this.userMessage = '';
        this.loading = true;

        try {
            const reply = await this.gemini.sendChat(msg);
            this.messages.push({ text: reply, from: 'bot' });
        } catch (err) {
            this.messages.push({
                text: '⚠️ Error al conectar con el agente. Verifica tu API key.',
                from: 'bot'
            });
        } finally {
            this.loading = false;
        }
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isAtTop = window.scrollY < 100;
    }
}