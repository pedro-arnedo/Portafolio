import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import emailjs from 'emailjs-com';
import { emailService } from '../../core/config/emailjs';

@Injectable({ providedIn: 'root' })
export class EmailService {
    private serviceId = emailService.serviceID;
    private templateId = emailService.templateID;
    private publicKey = emailService.publicKey;

    sendMail(templateParams: Record<string, unknown>): Promise<any> {
        return emailjs.send(this.serviceId, this.templateId, templateParams, this.publicKey);
    }

    sendMail$(templateParams: Record<string, unknown>): Observable<any> {
        return from(this.sendMail(templateParams));
    }
}
