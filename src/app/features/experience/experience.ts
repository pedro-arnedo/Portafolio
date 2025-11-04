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

    // Items come from your data file
    items: TimelineItem[] = timeline;
    currentIndex = 0;

    // Filters left in place (you said keep filters, but viewport shows one card at a time)
    selectedFilter: 'work' | 'education' | 'cert' | 'all' = 'all';

    get filteredItems(): TimelineItem[] {
        if (this.selectedFilter === 'all') return this.items;
        return this.items.filter(i => i.type === this.selectedFilter);
    }

    ngAfterViewInit() {
        // initial visual setup
        this.syncView();
        // little entrance animation
        gsap.from(this.cardContainer.nativeElement.querySelectorAll('.card'), {
            duration: 0.6,
            y: 20,
            opacity: 0,
            stagger: 0.05,
            ease: 'power3.out'
        });
        this.animatePointPulse();
    }

    // NAV
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
        // reset index safely
        this.currentIndex = 0;
        this.syncView(true);
    }

    // Keyboard left/right
    @HostListener('window:keydown', ['$event'])
    handleKey(e: KeyboardEvent) {
        if (e.key === 'ArrowLeft') this.previous();
        if (e.key === 'ArrowRight') this.next();
    }

    private syncView(skipAnimation = false) {
        const container = this.cardContainer.nativeElement;
        const items = Array.from(container.querySelectorAll('.card')) as HTMLElement[];

        // compute center transform so single card is visible centered
        const viewportWidth = container.clientWidth;
        const card = items[this.currentIndex];
        if (!card) return;

        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const translate = Math.max(0, cardCenter - viewportWidth / 2);

        // move container
        if (skipAnimation) {
            container.style.transform = `translateX(${-translate}px)`;
        } else {
            gsap.to(container, { x: -translate, duration: 0.6, ease: 'power3.out' });
        }

        // visual states
        items.forEach((el, idx) => {
            if (idx === this.currentIndex) {
                el.classList.add('active');
                gsap.to(el, { scale: 1, opacity: 1, duration: 0.45, ease: 'power3.out' });
                // highlight point
                gsap.to(el.querySelector('.point-circle'), { scale: 1.06, boxShadow: '0 0 24px rgba(0,195,255,0.55)', duration: 0.45 });
            } else {
                el.classList.remove('active');
                gsap.to(el, { scale: 0.92, opacity: 0.55, duration: 0.35, ease: 'power3.out' });
                gsap.to(el.querySelector('.point-circle'), { scale: 0.86, boxShadow: '0 0 8px rgba(0,195,255,0.12)', duration: 0.35 });
            }
        });

        // animate dots
        this.updateDots();
        // small point pulse
        this.animatePointPulse();
    }

    private updateDots() {
        const dots = this.dotsContainer?.nativeElement?.querySelectorAll('.dot') ?? [];
        dots.forEach((d: Element, idx: number) => {
            d.classList.toggle('selected', idx === this.currentIndex);
        });
    }

    private animatePointPulse() {
        // subtle loop on the active point circle
        const container = this.cardContainer.nativeElement;
        const active = container.querySelector('.card.active .point-circle') as HTMLElement | null;
        gsap.killTweensOf('.pulse-tween');
        if (active) {
            gsap.fromTo(active, { scale: 0.98 }, { scale: 1.08, duration: 1.4, yoyo: true, repeat: -1, ease: 'sine.inOut', overwrite: true, onRepeat: () => { /* nothing */ } });
        }
    }
}