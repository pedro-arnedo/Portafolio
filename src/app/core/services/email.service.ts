import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import emailjs from 'emailjs-com';
import { emailConfig } from '../env/data-email';

@Injectable({ providedIn: 'root' })
export class EmailService {
    private serviceId = emailConfig.serviceID;
    private templateId = emailConfig.templateID;
    private publicKey = emailConfig.publicKey;

    sendMail(templateParams: Record<string, unknown>): Promise<any> {
        return emailjs.send(this.serviceId, this.templateId, templateParams, this.publicKey);
    }

    sendMail$(templateParams: Record<string, unknown>): Observable<any> {
        return from(this.sendMail(templateParams));
    }
}