import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import emailjs from 'emailjs-com';
import { emailConfig } from '../env/data-email';

@Injectable({ providedIn: 'root' })
export class EmailService {
    private serviceId = emailConfig.serviceID;
    private templateId = emailConfig.templateID;
    private publicKey = emailConfig.publicKey;

    async sendMail(templateParams: Record<string, unknown>): Promise<any> {
        try {
            return await emailjs.send(this.serviceId, this.templateId, templateParams, this.publicKey);
        } catch (err) {
            console.error('Error en envío EmailJS:', err);
            throw err;
        }
    }

    sendMail$(templateParams: Record<string, unknown>): Observable<any> {
        return from(this.sendMail(templateParams));
    }
}