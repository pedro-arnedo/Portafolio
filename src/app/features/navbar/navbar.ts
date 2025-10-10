import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar.html',
    styleUrls: ['./navbar.scss']
})
export class Navbar {
    menuOpen = false;
    scrolled = false;

    navLinks = [
        { label: 'Intro', targetId: 'intro' },
        { label: 'About', targetId: 'about' },
        { label: 'Projects', targetId: 'projects' },
        { label: 'Experience', targetId: 'experience' },
        { label: 'Contact', targetId: 'contact' },
        
    ];

    scrollTo(event: Event, targetId: string) {
        event.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        this.menuOpen = false;
    }
}