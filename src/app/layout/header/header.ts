import { Component } from '@angular/core';
import { Navbar } from './../../features/navbar/navbar';
import { Hero } from '../../features/hero/hero';

@Component({
    selector: 'app-header',
    imports: [Navbar, Hero],
    templateUrl: './header.html',
    styleUrl: './header.scss'
})
export class Header {}