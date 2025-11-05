import { Component, HostListener, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../core/env/environment';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar.html',
    styleUrls: ['./navbar.scss']
})
export class Navbar implements AfterViewInit, OnDestroy {

    menuOpen = false;
    scrolled = false;
    navLinks = environment.navLinks;
    activeSection = 'home';
    activeIndicatorTransform = 'translateX(0px) scaleX(1)';
    private currentIndex = 0;
    private observer?: IntersectionObserver;

    constructor(private el: ElementRef, private title: Title) { }

    ngAfterViewInit(): void {
        this.observeSections();
        this.moveActivePill(0);

        const initialHash = window.location.hash.replace('#', '');
        if (initialHash) {
            const element = document.getElementById(initialHash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    this.activeSection = initialHash;
                    const idx = this.navLinks.findIndex(l => l.targetId === initialHash);
                    if (idx !== -1) this.moveActivePill(idx);
                }, 50);
            }
        }
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }

    @HostListener('window:scroll')
    onScroll(): void {
        this.scrolled = window.scrollY > 50;
    }

    private observeSections(): void {
        this.observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        const index = this.navLinks.findIndex(l => l.targetId === id);
                        if (index !== -1 && this.currentIndex !== index) {
                            this.currentIndex = index;
                            this.activeSection = id;
                            this.moveActivePill(index);
                            window.history.replaceState(null, '', `#${id}`);
                        }
                    }
                }
            },
            { threshold: 0.3 }
        );

        for (const link of this.navLinks) {
            const section = document.getElementById(link.targetId);
            if (section) this.observer.observe(section);
        }
    }

    scrollTo(event: Event, targetId: string, index: number): void {
        event.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        this.activeSection = targetId;
        this.currentIndex = index;
        this.moveActivePill(index);
        window.history.replaceState(null, '', `#${targetId}`);
    }

    private moveActivePill(index: number): void {
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