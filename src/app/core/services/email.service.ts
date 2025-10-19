import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from '../environment';
import emailjs from 'emailjs-com';

@Injectable({ providedIn: 'root' })
export class EmailService {
    private serviceId = environment.emailService.serviceID;
    private templateId = environment.emailService.templateID;
    private publicKey = environment.emailService.publicKey;

    sendMail(templateParams: Record<string, unknown>): Promise<any> {
        return emailjs.send(this.serviceId, this.templateId, templateParams, this.publicKey);
    }

    sendMail$(templateParams: Record<string, unknown>): Observable<any> {
        return from(this.sendMail(templateParams));
    }
}
