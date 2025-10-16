import { Component, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../core/environment';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar.html',
    styleUrl: './navbar.scss'
})
export class Navbar implements AfterViewInit {
    menuOpen = false;
    scrolled = false;
    navLinks = environment.navLinks;
    activeSection = 'home';
    activeIndicatorTransform = 'translateX(0px) scaleX(1)';
    private linkPositions: DOMRect[] = [];

    constructor(private el: ElementRef, private location: Location, private title: Title) { }

    ngAfterViewInit() {
        this.storeLinkPositions();
        window.addEventListener('resize', () => this.storeLinkPositions());
        setTimeout(() => this.moveActivePill(0), 0);
    }

    @HostListener('window:scroll', [])
    onScroll() {
        this.scrolled = window.scrollY > 50;
        this.detectActiveSection();
    }

    private storeLinkPositions() {
        const linkElements = this.el.nativeElement.querySelectorAll('.navbar-links li a');
        this.linkPositions = Array.from(linkElements as NodeListOf<HTMLElement>).map(
            (el) => el.getBoundingClientRect()
        );
    }

    detectActiveSection() {
        for (let i = 0; i < this.navLinks.length; i++) {
            const link = this.navLinks[i];
            const el = document.getElementById(link.targetId);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    this.activeSection = link.targetId;
                    this.location.replaceState(`#${link.targetId}`);
                    this.moveActivePill(i);
                    break;
                }
            }
        }
    }

    scrollTo(event: Event, targetId: string, index: number) {
        event.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // window.history.replaceState(null, '', `#${targetId}`);
        }
        this.activeSection = targetId;
        this.moveActivePill(index);
    }

    private moveActivePill(index: number) {
        const linkEls = Array.from(
            this.el.nativeElement.querySelectorAll('.navbar-links li a')
        ) as HTMLElement[];

        const targetEl = linkEls[index];
        const pillEl = this.el.nativeElement.querySelector('.active-pill') as HTMLElement;

        if (targetEl && pillEl) {
            const rect = targetEl.getBoundingClientRect();
            const containerRect = targetEl.closest('.navbar-links')!.getBoundingClientRect();

            const offsetX = rect.left - containerRect.left;
            pillEl.style.transform = `translateX(${offsetX}px)`;
            pillEl.style.width = `${rect.width}px`;
        }
        const sectionLabel = this.navLinks[index]?.label || 'Inicio';
        this.title.setTitle(`Pedro Arnedo | ${sectionLabel}`);
    }
}