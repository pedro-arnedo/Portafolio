import { Component } from '@angular/core';
import { Contact } from '../../features/contact/contact';
import { Chatbot } from '../../features/chatbot/chatbot';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [Contact, Chatbot],
    templateUrl: './footer.html',
    styleUrl: './footer.scss'
})
export class Footer { }