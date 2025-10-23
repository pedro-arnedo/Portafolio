import { Component } from '@angular/core';
import { Contact } from '../../features/contact/contact';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [Contact],
    templateUrl: './footer.html',
    styleUrl: './footer.scss'
})
export class Footer {}