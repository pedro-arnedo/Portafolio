import { Component, HostListener } from '@angular/core';
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

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    scrollTo(event: Event, id: string) {
        event.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        this.menuOpen = false;
    }

    @HostListener('window:scroll')
    onScroll() {
        this.scrolled = window.scrollY > 30;
    }
}