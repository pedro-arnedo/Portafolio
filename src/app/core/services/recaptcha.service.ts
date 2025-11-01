import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecaptchaService {
    private siteKey = '6LfHHP4rAAAAANw8xk_Ceu_xkQvycXL00_cA-J3M';

    private waitForRecaptcha(): Promise<void> {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const interval = setInterval(() => {
                if ((window as any).grecaptcha) {
                    clearInterval(interval);
                    resolve();
                } else if (++attempts > 50) {
                    clearInterval(interval);
                    reject('reCAPTCHA no se cargó a tiempo.');
                }
            }, 100);
        });
    }

    async execute(action: string): Promise<string> {
        await this.waitForRecaptcha();
        const grecaptcha = (window as any).grecaptcha;

        return new Promise((resolve, reject) => {
            grecaptcha.ready(() => {
                grecaptcha.execute(this.siteKey, { action })
                    .then((token: string) => resolve(token))
                    .catch((err: any) => reject(err));
            });
        });
    }
}