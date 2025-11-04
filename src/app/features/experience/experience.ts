import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineItem } from '../../core/models/timeline.model';
import { timeline } from '../../core/env/data-experience';
import { gsap } from 'gsap';

@Component({
    selector: 'app-experience',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './experience.html',
    styleUrl: './experience.scss'
})
export class Experience implements AfterViewInit {
    @ViewChild('cardContainer', { static: true }) cardContainer!: ElementRef<HTMLDivElement>;
    @ViewChild('dotsContainer', { static: true }) dotsContainer!: ElementRef<HTMLDivElement>;

    items: TimelineItem[] = timeline;
    currentIndex = 0;
    selectedFilter: 'work' | 'education' | 'cert' | 'all' = 'all';

    get filteredItems(): TimelineItem[] {
        if (this.selectedFilter === 'all') return this.items;
        return this.items.filter(i => i.type === this.selectedFilter);
    }

    ngAfterViewInit() {
        // initial setup & small entrance animation
        this.syncView(true);
        gsap.from(this.cardContainer.nativeElement.querySelectorAll('.card'), {
            duration: 0.6,
            y: 18,
            opacity: 0,
            stagger: 0.04,
            ease: 'power3.out'
        });
        this.animatePulse();
        // ensure dots exist
        setTimeout(() => this.updateDots(), 120);
    }

    previous() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.syncView();
        }
    }

    next() {
        if (this.currentIndex < this.filteredItems.length - 1) {
            this.currentIndex++;
            this.syncView();
        }
    }

    goTo(i: number) {
        if (i >= 0 && i < this.filteredItems.length) {
            this.currentIndex = i;
            this.syncView();
        }
    }

    setFilter(type: 'work' | 'education' | 'cert' | 'all') {
        this.selectedFilter = type;
        this.currentIndex = 0;
        // small timeout to ensure DOM updated
        setTimeout(() => this.syncView(true), 80);
    }

    @HostListener('window:keydown', ['$event'])
    handleKey(e: KeyboardEvent) {
        if (e.key === 'ArrowLeft') this.previous();
        if (e.key === 'ArrowRight') this.next();
    }

    private syncView(skipAnim = false) {
        const container = this.cardContainer.nativeElement;
        const cards = Array.from(container.querySelectorAll('.card')) as HTMLElement[];
        if (!cards.length) return;

        // center the active card in the viewport area
        const active = cards[this.currentIndex];
        const vpWidth = container.parentElement?.clientWidth ?? container.clientWidth;
        const cardCenter = active.offsetLeft + active.offsetWidth / 2;
        const translateX = Math.max(0, cardCenter - vpWidth / 2);

        if (skipAnim) {
            container.style.transform = `translateX(${-translateX}px)`;
        } else {
            gsap.to(container, { x: -translateX, duration: 0.55, ease: 'power3.out' });
        }

        // state visual classes + subtle scaling
        cards.forEach((c, idx) => {
            if (idx === this.currentIndex) {
                c.classList.add('active');
                gsap.to(c, { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' });
                gsap.to(c.querySelector('.point-circle'), { scale: 1.02, boxShadow: '0 0 30px rgba(0,195,255,0.38)', duration: 0.35 });
            } else {
                c.classList.remove('active');
                gsap.to(c, { scale: 0.94, opacity: 0.58, duration: 0.28, ease: 'power3.out' });
                gsap.to(c.querySelector('.point-circle'), { scale: 0.86, boxShadow: '0 0 8px rgba(0,195,255,0.10)', duration: 0.28 });
            }
        });

        this.updateDots();
        this.animatePulse();
    }

    private updateDots() {
        const dots = this.dotsContainer?.nativeElement?.querySelectorAll('.dot') ?? [];
        dots.forEach((d: Element, i: number) => {
            d.classList.toggle('selected', i === this.currentIndex);
        });
    }

    private animatePulse() {
        // pulse only on the active card point
        const container = this.cardContainer.nativeElement;
        const activePoint: HTMLElement | null = container.querySelector('.card.active .point-circle');
        // clear previous tweens
        gsap.killTweensOf('.pulse-loop');
        if (activePoint) {
            gsap.fromTo(activePoint, { scale: 0.98 }, { scale: 1.08, duration: 1.4, yoyo: true, repeat: -1, ease: 'sine.inOut', overwrite: true, repeatDelay: 0.05 });
        }
    }
}