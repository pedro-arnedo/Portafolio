import { Component, HostListener, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../core/config/environment';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar.html',
    styleUrl: './navbar.scss'
})
export class Navbar implements AfterViewInit, OnDestroy {

    menuOpen = false;
    scrolled = false;
    navLinks = environment.navLinks;
    activeSection = 'home';
    activeIndicatorTransform = 'translateX(0px) scaleX(1)';
    private currentIndex = 0;

    private observer?: IntersectionObserver;

    constructor(private el: ElementRef, private location: Location, private title: Title) { }

    ngAfterViewInit() {
        this.observeSections();
        this.moveActivePill(0);
    }

    ngOnDestroy() {
        this.observer?.disconnect();
    }

    @HostListener('window:scroll')
    onScroll() {
        this.scrolled = window.scrollY > 50;
    }

    private observeSections() {
        this.observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        const index = this.navLinks.findIndex(l => l.targetId === id);
                        if (index !== -1 && this.currentIndex !== index) {
                            this.currentIndex = index;
                            this.activeSection = id;
                            this.location.replaceState(`#${id}`);
                            this.moveActivePill(index);
                        }
                    }
                }
            },
            { threshold: 0.6 }
        );

        for (const link of this.navLinks) {
            const section = document.getElementById(link.targetId);
            if (section) this.observer.observe(section);
        }
    }

    scrollTo(event: Event, targetId: string, index: number) {
        event.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        this.activeSection = targetId;
        this.currentIndex = index;
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