import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
    text: string;
    from: 'user' | 'bot';
    timestamp: Date;
}

@Component({
    selector: 'app-chatbot',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chatbot.html',
    styleUrl: './chatbot.scss'
})
export class Chatbot {

    // Estados principales del chatbot
    isOpen = false;
    userMessage = '';
    messages: Message[] = [];
    loading = false;

    @ViewChild('chatContainer') chatContainer!: ElementRef;

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) setTimeout(() => this.scrollToBottom(), 150);
    }

    sendMessage() {
        const msg = this.userMessage.trim();
        if (!msg) return;

        this.messages.push({ text: msg, from: 'user', timestamp: new Date() });
        this.userMessage = '';
        this.scrollToBottom();

        this.loading = true;

        setTimeout(() => {
            this.receiveBotReply(msg);
            this.loading = false;
        }, 1000);
    }

    receiveBotReply(userInput: string) {
        let reply = 'No entendí eso 😅, intenta de nuevo.';

        const normalized = userInput.toLowerCase();

        if (normalized.includes('hola') || normalized.includes('buenas')) {
            reply = '¡Hola! 👋 Soy el asistente virtual de Pedro Arnedo. ¿En qué puedo ayudarte hoy?';
        } else if (normalized.includes('proyecto') || normalized.includes('trabajo')) {
            reply = 'Pedro ha trabajado en proyectos web con Angular, Tailwind y APIs REST. ¿Quieres ver su portafolio?';
        } else if (normalized.includes('contacto') || normalized.includes('email')) {
            reply = 'Puedes escribirle a: pedro.arnedo.dev@gmail.com 📧';
        } else if (normalized.includes('cv') || normalized.includes('currículum')) {
            reply = 'Puedes descargar su CV actualizado desde la sección de contacto.';
        } else if (normalized.includes('gracias')) {
            reply = '¡Con gusto! 😊 ¿Hay algo más que pueda hacer por ti?';
        }

        this.messages.push({ text: reply, from: 'bot', timestamp: new Date() });
        this.scrollToBottom();
    }

    scrollToBottom() {
        setTimeout(() => {
            if (this.chatContainer) {
                const container = this.chatContainer.nativeElement;
                container.scrollTop = container.scrollHeight;
            }
        }, 50);
    }

    // Control del scroll flotante
    isAtTop = true;

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