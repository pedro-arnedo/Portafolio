import { Component } from '@angular/core';
import { Contact } from '../../features/contact/contact';
import { Credits } from '../../features/credits/credits';

@Component({
    selector: 'app-footer',
    imports: [Contact, Credits],
    templateUrl: './footer.html',
    styleUrl: './footer.scss'
})
export class Footer {

}
