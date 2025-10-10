import { Component } from '@angular/core';
import { Intro } from '../../features/intro/intro';
import { Hero } from '../../features/hero/hero';

@Component({
    selector: 'app-header',
    imports: [Intro, Hero],
    templateUrl: './header.html',
    styleUrl: './header.scss'
})
export class Header {

}