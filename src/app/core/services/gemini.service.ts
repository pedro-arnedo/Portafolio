import { Injectable } from '@angular/core';
import { personalChatbotConfig } from '../env/data-chatbot';

@Injectable({ providedIn: 'root' })
export class GeminiService {
    private readonly apiUrl =
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
    private readonly apiKey = personalChatbotConfig.apiKey;

    async sendChat(message: string): Promise<string> {
        try {
            const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `${personalChatbotConfig.systemPrompt}\nUsuario: ${message}`
                                }
                            ]
                        }
                    ]
                })
            });

            if (!response.ok)
                throw new Error(`Error ${response.status}: ${response.statusText}`);

            const data = await response.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta.';
        } catch (err) {
            return '⚠️ No se pudo conectar con el modelo Gemini.';
        }
    }
}